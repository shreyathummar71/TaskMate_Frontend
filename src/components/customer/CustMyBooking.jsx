import React, { useEffect, useState } from "react";
import axios from "axios";
import getCustomerIdFromToken from "../../utils/tokenUtils";

const CustMyBooking = () => {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const id = await getCustomerIdFromToken();
      setCustomerId(id);
      try {
        const response = await axios.get(
          `https://backend-taskmate.onrender.com/booking/customer/${customerId}`
        );
        setBooking(response.data[0]); // Assuming the API returns an array of bookings
      } catch (error) {
        console.error("Error fetching booking:", error);
        setError(error.message);
      }
    };
    fetchBooking();
    console.log("Customer ID : ", customerId);
    console.log("booking : ", booking);
  }, [customerId]);

  // useEffect(() => {
  //   // Fetch Professional ID first
  //   const getProfId = async () => {
  //     const prof_id = await getProfessionalIdFromToken(); // Fetch prof_id
  //     if (prof_id) {
  //       setProfessionalId(prof_id); // Set professionalId to state
  //       fetchBookingDetails(prof_id); // Fetch bookings after prof_id is available
  //     }
  //   };

  //   getProfId();
  // }, []);

  if (error) return <div>Error: {error}</div>;
  if (!booking) return <div>Loading...</div>;

  const {
    prof_id,
    service_id,
    appointmentDateTime,
    startTime,
    endTime,
    bookHr,
    status,
  } = booking;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src="/path/to/default-avatar.jpg"
          alt="Avatar"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{prof_id.name}</p>
          <p className="text-gray-600">{service_id.name}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>
          Appointment Date: {new Date(appointmentDateTime).toLocaleDateString()}
        </p>
        <p>
          Schedule: {new Date(startTime).toLocaleTimeString()} -{" "}
          {new Date(endTime).toLocaleTimeString()}
        </p>
        <p>Booking Hours: {bookHr} hours</p>
      </div>
      <div className="mt-4">
        <button
          className={`px-4 py-2 rounded ${
            status === "confirmed"
              ? "bg-green-500"
              : status === "cancelled"
              ? "bg-red-500"
              : "bg-yellow-500"
          } text-white`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      </div>
    </div>
  );
};

export default CustMyBooking;
