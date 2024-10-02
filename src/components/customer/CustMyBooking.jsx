import React, { useEffect, useState } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import userImage from "/src/assets/images/user.png";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookingDetails.map((bookingDetail) => (
        <div
          key={bookingDetail._id}
          className="flex flex-col justify-between bg-primary rounded-xl"
        >
          <p className="text-red-500">{bookingDetail.cust_id}</p>

          {/* Professional Profile Image */}
          <div className="items-center pb-4 text-center bg-tertiary rounded-xl">
            {/* <span className="text-red-600">{bookingDetail.professionalId}</span> */}
            <img
              src={bookingDetail.profileImage || userImage}
              alt={bookingDetail.firstName}
              className="w-40 h-40 m-auto rounded-full text-center mt-4 p-1 border-2 border-secondary"
            />
          </div>

          <div className="items-center pb-4 bg-primary rounded-b-xl">
            <p className="text-center font-semibold text-xl text-white font-primary">
              {bookingDetail.professionalName}
            </p>
            <div>
              <p className="text-lg text-center mt-2 text-white font-secondary">
                {bookingDetail.serviceName}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Service Name: </span>
                {bookingDetail.serviceName}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">AppointmentDate: </span>
                {bookingDetail.appointmentDate}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">schedule: </span>€
                {bookingDetail.schedule}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Booking Hours: </span>
                {bookingDetail.bookingHours}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Working Time: </span>
                {professional.workingTime.start} -{" "}
                {professional.workingTime.end}
              </p>
            </div>

            <div className="float-end mr-4 mt-3">
              <button className="text-xs text-white font-primary border-b border-secondary hover:text-secondary hover:border-white">
                Modify Booking
              </button>
            </div>
            <div className="float-end mr-4 mt-3">
              <button className="text-xs text-white font-primary border-b border-secondary hover:text-secondary hover:border-white">
                {bookingDetail.status}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustMyBooking;
