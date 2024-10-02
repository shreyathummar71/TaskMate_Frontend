import React, { useEffect, useState } from "react";
import axios from "axios";

const CustMyBooking = ({ custId }) => {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Customer ID:", custId);
    if (!custId) {
      setError("Customer ID is missing");
      return;
    }
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `https://backend-taskmate.onrender.com/booking/customer/${custId}`
        );
        setBooking(response.data[0]); // Assuming the API returns an array of bookings
      } catch (error) {
        console.error("Error fetching booking:", error);
        setError(error.message);
      }
    };
    fetchBooking();
  }, [custId]);

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
