import React, { useEffect, useState } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import userimg from "/src/assets/images/user.png";

const CustMyBooking = () => {
  const [customerId, setCustomerId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);

  // Fetch Booking Details
  const fetchBookingDetails = async (cust_id) => {
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/customer/${cust_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch booking data");

      const bookingData = await response.json();
      console.log("Fetched booking data:", bookingData);
      console.log("CustomerID", cust_id);

      if (bookingData && Array.isArray(bookingData)) {
        setBookingDetails(bookingData);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    // Fetch Customer ID first
    const getCustId = async () => {
      const cust_id = await getCustomerIdFromToken(); // Fetch cust_id
      if (cust_id) {
        setCustomerId(cust_id);
        fetchBookingDetails(cust_id);
      }
    };

    getCustId();
  }, []);

  // Format time function
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-5 font-primary">My Bookings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {bookingDetails.length > 0 &&
          bookingDetails.map((booking) => {
            const startTimeFormatted = formatTime(booking.startTime);
            const endTimeFormatted = formatTime(booking.endTime);

            return (
              <div
                key={booking._id}
                className="bg-primary text-white rounded-lg pb-3 shadow-lg max-w-xs relative"
                style={{ height: "400px" }}
              >
                {/* Upper half - Professional Profile Image */}
                <div className="bg-tertiary text-white rounded-lg p-4 text-center shadow-lg">
                  <div className="flex justify-center">
                    {booking.prof_id?.profileImage ? (
                      <img
                        src={booking.prof_id.profileImage}
                        alt={`${booking.prof_id.name}'s profile`}
                        className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                      />
                    ) : (
                      <img
                        src={userimg}
                        alt="Default profile"
                        className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                      />
                    )}
                  </div>
                </div>

                {/* Lower half - Booking Details */}
                <div className="p-4">
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Professional: </span>
                    {booking.prof_id?.name || "N/A"}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Service: </span>
                    {booking.service_id?.name || "N/A"}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Appointment Date: </span>
                    {new Date(booking.appointmentDate).toDateString()}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Time: </span>
                    {`${startTimeFormatted} - ${endTimeFormatted}`}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Booked Hours: </span>
                    {booking.bookHr || "N/A"}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-secondary">Status: </span>
                    {booking.status || "N/A"}
                  </p>
                </div>

                {/* Additional buttons or actions can be added here if needed */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CustMyBooking;
