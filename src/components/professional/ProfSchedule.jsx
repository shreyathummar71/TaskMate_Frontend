import React, { useEffect, useState } from "react";
import getProfessionalIdFromToken from "../../utils/getProfId";
import userimg from "/src/assets/images/user.png";

const ProfSchedule = () => {
  const [professionalId, setProfessionalId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [view, setView] = useState("Today"); // View state to track which filter is active
  const [chargesPerHourData, setChargesPerHourData] = useState({});

  // Fetch Professional ID on mount and fetch bookings
  useEffect(() => {
    const getProfId = async () => {
      const prof_id = await getProfessionalIdFromToken();
      if (prof_id) {
        setProfessionalId(prof_id);
        fetchBookingDetails(prof_id);
      }
      console.log("prof id", prof_id);
    };
    getProfId();
  }, []);

  // Fetch Booking Details
  const fetchBookingDetails = async (prof_id) => {
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/professional/${prof_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch booking data");

      const bookingData = await response.json();
      setBookingDetails(bookingData);
      const custIds = bookingData
        .map((booking) => booking.cust_id?._id)
        .filter((id) => id);
      fetchCustomerDetails(custIds);

      //fetxhing charges from addJobmodelid
      const addJobModelIds = bookingData.map(
        (booking) => booking.addJobModel_id?._id
      );
      fetchChargesPerHour(addJobModelIds);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  // Fetch Customer Details by passing custIds
  const fetchCustomerDetails = async (custIds) => {
    try {
      const customerDataResponses = await Promise.all(
        custIds.map(async (custId) => {
          const response = await fetch(
            `https://backend-taskmate.onrender.com/customer/${custId}`
          );
          if (!response.ok)
            throw new Error(`Failed to fetch customer data for ${custId}`);
          return await response.json();
        })
      );
      setCustomerData(customerDataResponses);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  //function to get charges from addJobmodel
  const fetchChargesPerHour = async (addJobModelIds) => {
    try {
      const chargesData = await Promise.all(
        addJobModelIds.map(async (jobId) => {
          const response = await fetch(
            `https://backend-taskmate.onrender.com/newJob/${jobId}`
          );
          if (!response.ok)
            throw new Error(`Failed to fetch job data for ${jobId}`);
          const jobData = await response.json();
          console.log("Job Data:", jobData); // <-- Add this log
          return { jobId, chargesPerHour: jobData?.chargesPerHour }; // Extract the chargesPerHour
        })
      );

      // Create a mapping of jobId to chargesPerHour
      const chargesMap = {};
      chargesData.forEach((data) => {
        chargesMap[data.jobId] = data.chargesPerHour;
      });
      setChargesPerHourData(chargesMap); // Step 3: Store in state
      console.log("Booking addJobModel_id:", booking.addJobModel_id);
      console.log("Charges Per Hour Data:", chargesPerHourData);
    } catch (error) {
      console.log("Something went wrong while fetching chargesPerHour", error);
    }
  };

  // Filter only confirmed bookings
  const confirmedBookings = bookingDetails.filter(
    (booking) => booking.status === "confirmed"
  );

  console.log("confirmed bookings", confirmedBookings);

  // Get today's date
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // Function to filter bookings based on type
  const filterBookings = (type) => {
    return confirmedBookings.filter((booking) => {
      const appointmentDate = new Date(booking.appointmentDateTime);
      const diffInTime = today.getTime() - appointmentDate.getTime(); // Difference in milliseconds
      const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days

      switch (type) {
        case "today":
          return (
            appointmentDate.getFullYear() === todayYear &&
            appointmentDate.getMonth() === todayMonth &&
            appointmentDate.getDate() === todayDate
          );
        case "upcoming":
          return appointmentDate > today; // Future dates
        case "past":
          return (
            appointmentDate < today && diffInDays <= 2 // Only past bookings within the last 2 days
          );
        default:
          return false; // Fallback
      }
    });
  };
  // Get bookings based on type
  const bookingsForToday = filterBookings("today");
  const upcomingBookings = filterBookings("upcoming");
  const pastBookings = filterBookings("past");

  // Handle view switching based on the clicked button
  const filteredBookings =
    view === "Today"
      ? bookingsForToday
      : view === "Upcoming"
      ? upcomingBookings
      : pastBookings;

  // Helper function to format time
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Buttons to switch between today, upcoming, and past bookings */}
      <div className="flex justify-center gap-5 mb-5">
        <button
          className={`text-xl font-bold font-primary ${
            view === "Today" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("Today")}
        >
          Today |
        </button>
        <button
          className={`text-xl font-bold font-primary ${
            view === "Upcoming" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("Upcoming")}
        >
          Upcoming |
        </button>
        <button
          className={`text-xl font-bold font-primary ${
            view === "Past" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("Past")}
        >
          Completed
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const customer = customerData.find(
              (cust) => cust._id === booking.cust_id?._id
            );

            const startTimeFormatted = formatTime(booking.startTime);
            const endTimeFormatted = formatTime(booking.endTime);

            // Check if the booking is for someone else
            const bookingForOthers = booking.bookingForOthers;

            return (
              <div
                key={booking._id}
                className="flex justify-evenly bg-primary text-white rounded-lg pb-3 min-w-max h-80"
              >
                {/* Customer Image */}
                <div className="flex-shrink-0 w-1/3 flex justify-center items-center">
                  <div className="bg-tertiary mt-3 mx-2 py-6 px-8 border-spacing-6 rounded-2xl ">
                    {customer?.profileImage ? (
                      <img
                        src={customer.profileImage}
                        alt={`${customer.firstName}'s profile`}
                        className="w-52 h-52 rounded-full border-2 border-secondary"
                      />
                    ) : (
                      <img
                        src={userimg} // dummy image
                        alt="Default profile"
                        className="w-52 h-52 rounded-full border-2 border-secondary"
                      />
                    )}
                  </div>
                </div>

                {/* Customer and Service Details */}
                <div className="flex-grow p-4 flex flex-col">
                  {/* Customer Details */}
                  <div className="flex justify-between mb-4">
                    <div className="w-1/2">
                      <h1 className="text-secondary my-4 font-primary">
                        {bookingForOthers
                          ? "Others Booking Information"
                          : "Customer Information"}
                      </h1>
                      {bookingForOthers ? (
                        <>
                          <p className="text-sm mb-1 font-primary text-tertiary">
                            <span className="text-white font-primary">
                              Name:{" "}
                            </span>
                            {`${bookingForOthers.name}`}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-primary">
                              Address:{" "}
                            </span>
                            {booking?.bookingForOthers?.address?.street
                              ? `${booking.bookingForOthers.address.street}, ${
                                  booking.bookingForOthers.address.zipcode ||
                                  "N/A"
                                }`
                              : "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white ">City: </span>
                            {bookingForOthers.address?.city || "N/A"}
                          </p>
                          <p className="text-sm mb-1  text-tertiary">
                            <span className="text-white ">Phone No : </span>
                            {bookingForOthers.phoneNumber || "N/A"}
                          </p>

                          <p className="text-sm mb-1  text-tertiary">
                            <span className="text-white ">Email: </span>
                            {bookingForOthers.email || "N/A"}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm mb-1  text-tertiary">
                            <span className="text-white ">Name: </span>
                            {customer
                              ? `${customer.firstName} ${customer.lastName}`
                              : "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white">Address: </span>
                            {customer?.address?.street
                              ? `${customer.address.street}${
                                  customer.address.zipCode
                                    ? `, ${customer.address.zipCode}`
                                    : ""
                                }`
                              : "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white ">City: </span>
                            {customer?.address?.city || "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white">Phone Number: </span>
                            {customer?.phoneNumber || "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white ">Email: </span>
                            {customer?.email || "N/A"}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Service Details */}
                    <div className="w-1/2">
                      <h1 className="text-secondary my-4 font-primary">
                        Service Information
                      </h1>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white">Service: </span>
                        {booking?.service_id?.name || "N/A"}
                      </p>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white">Appointment Date: </span>
                        {new Date(
                          booking.appointmentDateTime
                        ).toLocaleDateString("en-GB")}
                      </p>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white">Appointment Time: </span>
                        {`${startTimeFormatted} to ${endTimeFormatted}`}
                      </p>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white">
                          Total Working hours:{" "}
                        </span>
                        {booking?.bookHr}
                      </p>
                      <p className="text-sm mb-1 font-primary text-tertiary">
                        <span className="text-white font-primary">
                          Charges Per Hour:{" "}
                        </span>
                        {`${
                          chargesPerHourData[booking?.addJobModel_id?._id]
                        }€` || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Service Description */}
                  <div className="mt-2 w-full">
                    <h1 className="text-secondary font-primary mb-4">
                      Service Description
                    </h1>
                    <p className="text-sm text-tertiary">
                      <span className="text-white">Description: </span>
                      {booking.description || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No bookings found for this time period.</p>
        )}
      </div>
    </div>
  );
};

export default ProfSchedule;
