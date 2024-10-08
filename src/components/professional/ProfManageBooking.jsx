import React, { useEffect, useState } from "react";
import getProfessionalIdFromToken from "../../utils/getProfId";
import userimg from "/src/assets/images/user.png";

const ProfManageBooking = () => {
  const [professionalId, setProfessionalId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [bookingStatus, setBookingStatus] = useState({});
  const [view, setView] = useState("BookingRequests");
  const [visibleBookings, setVisibleBookings] = useState({});

  // Fetch Booking Details
  const fetchBookingDetails = async (prof_id) => {
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/professional/${prof_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch booking data");

      const bookingData = await response.json();
      console.log("Fetched booking data:", bookingData);

      if (bookingData && Array.isArray(bookingData)) {
        setBookingDetails(bookingData); // Set booking details
        const custIds = bookingData
          .map((booking) => booking.cust_id?._id)
          .filter((id) => id); // Extract cust_ids
        console.log("cust ids", custIds);
        fetchCustomerDetails(custIds); // Fetch customer details using cust_ids
      }
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
          return await response.json(); // Return customer data
        })
      );

      setCustomerData(customerDataResponses); // Set all customer data
      console.log("Fetched customer data:", customerDataResponses);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    // Fetch Professional ID first
    const getProfId = async () => {
      const prof_id = await getProfessionalIdFromToken(); // Fetch prof_id
      if (prof_id) {
        setProfessionalId(prof_id); // Set professionalId to state
        fetchBookingDetails(prof_id); // Fetch bookings after prof_id is available
      }
    };

    getProfId();
  }, []);

  // Format time function
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to accept a booking
  const handleAcceptBooking = async (booking) => {
    try {
      const updatedBooking = { ...booking, status: "confirmed" };
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/${booking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBooking), // Change status to accepted
        }
      );

      if (!response.ok) throw new Error("Failed to accept booking");

      // Update local state after successful acceptance
      setBookingDetails((prevDetails) =>
        prevDetails.map((b) =>
          b._id === booking._id ? { ...updatedBooking } : b
        )
      );

      // Set booking status
      setBookingStatus((prev) => ({ ...prev, [booking._id]: "confirmed" }));

      // Set temporary visibility for 3 seconds
      setVisibleBookings((prev) => ({ ...prev, [booking._id]: true }));

      setTimeout(() => {
        setVisibleBookings((prev) => ({ ...prev, [booking._id]: false }));
      }, 3000);

      console.log("Booking accepted:", updatedBooking);
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  // Function to reject a booking
  const handleRejectBooking = async (booking) => {
    try {
      const updatedBooking = { ...booking, status: "cancelled" };
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/${booking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBooking), // Change status to rejected
        }
      );

      if (!response.ok) throw new Error("Failed to reject booking");

      // Update local state after successful rejection
      setBookingDetails((prevDetails) =>
        prevDetails.map((b) =>
          b._id === booking._id ? { ...updatedBooking } : b
        )
      );

      // Set booking status
      setBookingStatus((prev) => ({ ...prev, [booking._id]: "cancelled" }));

      // Set temporary visibility for 3 seconds
      setVisibleBookings((prev) => ({ ...prev, [booking._id]: true }));

      setTimeout(() => {
        setVisibleBookings((prev) => ({ ...prev, [booking._id]: false }));
      }, 2000);

      console.log("Booking rejected:", updatedBooking);
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter pending bookings where bookingForOthers is falsy (Booking Requests)
  const BookingRequests = bookingDetails.filter(
    (booking) =>
      (booking.status === "pending" || visibleBookings[booking._id]) && // Status is pending or visible temporarily
      !booking.bookingForOthers &&
      new Date(booking.appointmentDateTime) >= today // bookingForOthers is falsy
  );

  // Filter pending bookings where bookingForOthers is truthy (Bookings for Others)
  const bookingsForOthers = bookingDetails.filter(
    (booking) =>
      (booking.status === "pending" || visibleBookings[booking._id]) && // Status is pending or visible temporarily
      booking.bookingForOthers && // bookingForOthers exists (truthy)
      new Date(booking.appointmentDateTime) >= today // Only bookings on or after today
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-primary font-primary">Manage Bookings</h1>
      <div className="flex justify-center gap-5 mb-5">
        <button
          className={`text-xl mt-4 font-primary ${
            view === "BookingRequests" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("BookingRequests")}
        >
          Booking Requests
        </button>
        <button
          className={`text-xl mt-4 font-primary ${
            view === "BookingsForOthers" ? "text-secondary" : "text-primary"
          }`}
          onClick={() => setView("BookingsForOthers")}
        >
          | Others Bookings Requests
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {view === "BookingRequests" &&
          BookingRequests.length > 0 &&
          BookingRequests.sort(
            (a, b) =>
              new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
          ).map((booking) => {
            const customer = customerData.find(
              (cust) => cust._id === booking.cust_id?._id
            );
            const startTimeFormatted = formatTime(booking.startTime);
            const endTimeFormatted = formatTime(booking.endTime);

            return (
              <div
                key={booking._id}
                className="bg-primary text-white rounded-lg pb-3 shadow-lg max-w-xs relative"
                style={{ height: "450px" }}
              >
                {/* Upper half - Customer Profile Image */}
                <div className="bg-tertiary text-white rounded-lg p-4 text-center shadow-lg">
                  <div className="flex justify-center">
                    {customer?.profileImage ? (
                      <img
                        src={customer.profileImage}
                        alt={`${customer.name}'s profile`}
                        className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                      />
                    ) : (
                      <img
                        src={userimg} // dummy image
                        alt="Default profile"
                        className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                      />
                    )}
                  </div>
                </div>

                {/* Lower half - Booking and customer Details */}
                <div className="p-4 flex-grow">
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Name : </span>
                    {customer
                      ? `${customer.firstName} ${customer.lastName}`
                      : "N/A"}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Service : </span>
                    {booking?.service_id?.name || "N/A"}
                  </p>

                  <p className="text-sm mb-1">
                    <span className="text-secondary">Address : </span>
                    {customer?.address?.street
                      ? `${customer.address.street}${
                          customer.address.zipCode
                            ? ` , ${customer.address.zipCode}`
                            : ""
                        }`
                      : "N/A"}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">City : </span>
                    {customer?.address?.city
                      ? `${customer.address.city}${
                          customer.address.country
                            ? ` , ${customer.address.country}`
                            : ""
                        }`
                      : "N/A"}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Appointment Date : </span>
                    {new Date(booking.appointmentDateTime).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>

                  <p className="text-sm mb-1">
                    <span className="text-secondary">Schedule : </span>
                    {`${startTimeFormatted} to ${endTimeFormatted}`}
                  </p>

                  <p className="text-sm mb-1">
                    <span className="text-secondary">
                      Total Working hours :{" "}
                    </span>
                    {booking?.bookHr}
                  </p>
                </div>

                {/* Accept/Reject Buttons */}
                <div className="pr-4 ">
                  <div className="flex justify-end space-x-3">
                    {bookingStatus[booking._id] === "confirmed" && (
                      <p className="text-green-500 font-bold  font-primary">
                        Booking accepted
                      </p>
                    )}
                    {bookingStatus[booking._id] === "cancelled" && (
                      <p className="text-red-500 font-bold font-primary">
                        Booking rejected
                      </p>
                    )}
                    {!bookingStatus[booking._id] && (
                      <>
                        <button
                          className="bg-green-900 text-white font-primary hover:bg-green-500 py-2 px-4 rounded-lg text-sm  "
                          onClick={() => handleAcceptBooking(booking)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-800 text-white font-primary hover:bg-red-500 py-2 px-4 rounded-lg text-sm  "
                          onClick={() => handleRejectBooking(booking)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        {/* Booking Requests for others */}

        {view === "BookingsForOthers" &&
          bookingsForOthers.length > 0 &&
          bookingsForOthers
            .sort(
              (a, b) =>
                new Date(a.appointmentDateTime) -
                new Date(b.appointmentDateTime)
            )
            .map((booking) => {
              const customer = customerData.find(
                (cust) => cust._id === booking.cust_id?._id
              );
              const startTimeFormatted = formatTime(booking.startTime);
              const endTimeFormatted = formatTime(booking.endTime);

              return (
                <div
                  key={booking._id}
                  className="bg-primary text-white rounded-lg pb-3 shadow-lg max-w-xs relative"
                  style={{ height: "450px" }}
                >
                  {/* Upper half - Customer Profile Image */}
                  <div className="bg-tertiary text-white rounded-lg p-4 text-center shadow-lg">
                    <div className="flex justify-center">
                      {customer?.profileImage ? (
                        <img
                          src={customer.profileImage}
                          alt={`${customer.name}'s profile`}
                          className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                        />
                      ) : (
                        <img
                          src={userimg} // dummy image
                          alt="Default profile"
                          className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                        />
                      )}
                    </div>
                  </div>

                  {/* Lower half - Booking and customer Details */}
                  <div className="p-4 flex-grow">
                    <p className="text-sm mb-1">
                      <span className="text-secondary">Name : </span>
                      {booking?.bookingForOthers?.name
                        ? `${booking.bookingForOthers.name}`
                        : "N/A"}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="text-secondary">Service : </span>
                      {booking?.service_id?.name || "N/A"}
                    </p>

                    <p className="text-sm mb-1">
                      <span className="text-secondary">Address : </span>
                      {booking?.bookingForOthers?.address?.street
                        ? `${booking.bookingForOthers.address.street}, ${
                            booking.bookingForOthers.address.zipcode || "N/A"
                          }`
                        : "N/A"}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="text-secondary">City : </span>
                      {booking?.bookingForOthers?.address?.city
                        ? `${booking.bookingForOthers.address.city}${
                            booking.bookingForOthers.address.state
                              ? ` , ${booking.bookingForOthers.address.state}` // Use 'state' as the country
                              : ""
                          }`
                        : "N/A"}
                    </p>

                    <p className="text-sm mb-1">
                      <span className="text-secondary">
                        Appointment Date :{" "}
                      </span>
                      {new Date(booking.appointmentDateTime).toLocaleDateString(
                        "en-Gb"
                      )}
                    </p>

                    <p className="text-sm mb-1">
                      <span className="text-secondary">Schedule : </span>
                      {`${startTimeFormatted} to ${endTimeFormatted}`}
                    </p>

                    <p className="text-sm mb-1">
                      <span className="text-secondary">
                        Total Working hours :{" "}
                      </span>
                      {booking?.bookHr}
                    </p>
                  </div>

                  {/* Accept/Reject Buttons */}
                  <div className="pr-4 ">
                    <div className="flex justify-end space-x-3">
                      {bookingStatus[booking._id] === "confirmed" && (
                        <p className="text-green-500 font-bold">
                          Booking accepted
                        </p>
                      )}
                      {bookingStatus[booking._id] === "cancelled" && (
                        <p className="text-red-500 font-bold">
                          Booking rejected
                        </p>
                      )}
                      {!bookingStatus[booking._id] && (
                        <>
                          <button
                            className="bg-green-900 text-white font-primary hover:bg-green-500 py-2 px-4 rounded-lg text-sm "
                            onClick={() => handleAcceptBooking(booking)}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-800 text-white font-primary hover:bg-red-500 py-2 px-4 rounded-lg text-sm  "
                            onClick={() => handleRejectBooking(booking)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ProfManageBooking;
