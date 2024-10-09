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
      const addJobModelIds = bookingData
        .map((booking) => booking.addJobModel_id?._id)
        .filter((id) => id);

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
          if (!response.ok) {
            console.error(
              `Error fetching job data for ${jobId}`,
              response.statusText
            );
            throw new Error(`Failed to fetch job data for ${jobId}`);
          }
          const jobData = await response.json();
          console.log("Job Data for ID", jobId, ":", jobData); // Log the job data for debugging
          return { jobId, chargesPerHour: jobData?.chargesPerHour };
        })
      );

      // Create a mapping of jobId to chargesPerHour
      const chargesMap = {};
      chargesData.forEach((data) => {
        chargesMap[data.jobId] = data.chargesPerHour;
      });
      setChargesPerHourData(chargesMap); // Step 3: Store in state
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
    const today = new Date(); // Ensure `today` is initialized within the function
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    return confirmedBookings
      .filter((booking) => {
        const appointmentDate = booking.addJobModel_id?.date
          ? new Date(booking.addJobModel_id.date)
          : null;

        if (!appointmentDate) {
          return false; // If there's no valid date, exclude the booking
        }

        const diffInTime = today.getTime() - appointmentDate.getTime(); // Difference in milliseconds
        const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days

        switch (type) {
          case "today":
            // Check if the appointment date matches today's date
            return (
              appointmentDate.getFullYear() === todayYear &&
              appointmentDate.getMonth() === todayMonth &&
              appointmentDate.getDate() === todayDate
            );
          case "upcoming":
            // Check if the appointment date is after today (future dates)
            return appointmentDate > today;
          case "past":
            // Check if the appointment date is within the last 2 days
            return appointmentDate < today && diffInDays <= 2;
          default:
            return false; // Fallback
        }
      })
      .sort((a, b) => {
        if (type === "upcoming") {
          const dateA = new Date(a.addJobModel_id?.date);
          const dateB = new Date(b.addJobModel_id?.date);
          return dateA - dateB; // Sort in ascending order by date
        }
        return 0; // No sorting for other types
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
      <h1 className="text-2xl text-primary font-primary">Schedule</h1>
      {/* Buttons to switch between today, upcoming, and past bookings */}
      <div className="flex justify-center gap-5 mb-5">
        <button
          className={`text-xl mt-6 font-primary ${
            view === "Today" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("Today")}
        >
          Today |
        </button>
        <button
          className={`text-xl  mt-6 font-primary ${
            view === "Upcoming" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("Upcoming")}
        >
          Upcoming |
        </button>
        <button
          className={`text-xl mt-6 font-primary ${
            view === "Past" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("Past")}
        >
          Completed
        </button>
      </div>
      <div className="flex flex-col space-y-4 mt-6">
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
                        className="w-52 h-52 p-2  rounded-full border-2 border-secondary"
                      />
                    ) : (
                      <img
                        src={userimg} // dummy image
                        alt="Default profile"
                        className="w-52 h-52 p-2 rounded-full border-2 border-secondary"
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
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-secondary">
                              Name :{" "}
                            </span>
                            {`${bookingForOthers.name}`}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-secondary">
                              Address :{" "}
                            </span>
                            {booking?.bookingForOthers?.address?.street
                              ? `${booking.bookingForOthers.address.street}, ${
                                  booking.bookingForOthers.address.zipcode ||
                                  "N/A"
                                }`
                              : "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-secondary ">
                              City :{" "}
                            </span>
                            {bookingForOthers.address?.city || "N/A"}
                          </p>
                          <p className="text-sm mb-1  text-tertiary">
                            <span className="text-white font-secondary ">
                              Phone No :{" "}
                            </span>
                            {bookingForOthers.phoneNumber || "N/A"}
                          </p>

                          <p className="text-sm mb-1  text-tertiary">
                            <span className="text-white font-secondary ">
                              Email :{" "}
                            </span>
                            {bookingForOthers.email || "N/A"}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm mb-1  text-tertiary">
                            <span className="text-white font-secondary ">
                              Name :{" "}
                            </span>
                            {customer
                              ? `${customer.firstName} ${customer.lastName}`
                              : "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-secondary">
                              Address :{" "}
                            </span>
                            {customer?.address?.street
                              ? `${customer.address.street}${
                                  customer.address.zipCode
                                    ? `, ${customer.address.zipCode}`
                                    : ""
                                }`
                              : "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-secondary ">
                              City :{" "}
                            </span>
                            {customer?.address?.city || "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-secondary">
                              Phone Number :{" "}
                            </span>
                            {customer?.phoneNumber || "N/A"}
                          </p>
                          <p className="text-sm mb-1 text-tertiary">
                            <span className="text-white font-secondary">
                              Email :{" "}
                            </span>
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
                        <span className="text-white font-secondary">
                          Service :{" "}
                        </span>
                        {booking?.service_id?.name || "N/A"}
                      </p>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white font-secondary">
                          Appointment Date :{" "}
                        </span>
                        {new Date(
                          booking.addJobModel_id.date
                        ).toLocaleDateString("en-GB")}
                      </p>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white font-secondary">
                          Appointment Time :{" "}
                        </span>
                        {`${startTimeFormatted} to ${endTimeFormatted}`}
                      </p>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white font-secondary">
                          Total Working hours :{" "}
                        </span>
                        {booking?.bookHr}
                      </p>
                      <p className="text-sm mb-1 text-tertiary">
                        <span className="text-white font-secondary">
                          Charges Per Hour:{" "}
                        </span>
                        {chargesPerHourData[booking?.addJobModel_id?._id] !==
                        undefined
                          ? `${
                              chargesPerHourData[booking?.addJobModel_id?._id]
                            }€`
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Service Description */}
                  <div className="mt-2 w-full">
                    <h1 className="text-secondary font-primary mb-4">
                      Service Description
                    </h1>
                    <p className="text-sm text-tertiary">
                      <span className="text-white"></span>
                      {booking.description || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-5">No bookings found for this time period.</p>
        )}
      </div>
    </div>
  );
};

export default ProfSchedule;
