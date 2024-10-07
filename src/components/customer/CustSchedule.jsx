import React, { useState, useEffect } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import userImage from "/src/assets/images/user.png";
import { useLocation } from "react-router-dom";
import CustFeedbackModal from "./CustFeedbackModal"; // Import the CustFeedbackModal component

const CustSchedule = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("today");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const getCustId = async () => {
      const cust_id = await getCustomerIdFromToken();
      if (cust_id) {
        setCustomerId(cust_id);
        fetchBookings(cust_id);
      }
    };

    getCustId();
  }, []);

  const fetchBookings = async (cust_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/customerbooking/${cust_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Add this to check the response
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    console.log("Cancelling booking with ID:", bookingId);
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/${bookingId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }
      fetchBookings(customerId);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleFeedback = (booking) => {
    setSelectedBooking(booking); // Save the selected booking details
    setModalOpen(true); // Open the modal
  };

  const submitFeedback = async (feedback) => {
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedback),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }
      console.log("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const renderBookings = (filterCondition) => {
    if (loading) return <p className="text-gray-500">Loading bookings...</p>;

    const filteredBookings = bookings.filter(filterCondition);
    if (filteredBookings.length === 0)
      return <p className="text-gray-500">No bookings found</p>;

    return filteredBookings.map((booking) => (
      <div
        key={booking.id}
        className="flex flex-col justify-between bg-primary rounded-xl p-4 mb-4"
      >
        <div className="items-center pb-4 text-center bg-tertiary rounded-xl">
          <img
            src={booking.profileImage || userImage}
            alt={booking.professionalName}
            className="w-40 h-40 m-auto rounded-full mt-4 p-1 border-2 border-secondary object-cover"
          />
        </div>

        <div className="items-center bg-primary rounded-b-xl">
          <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
            <span className="text-secondary">Name : </span>
            {booking.professionalName}
          </p>
          <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
            <span className="text-secondary">Service Name : </span>
            {booking.serviceName}
          </p>
          {/* this date is fetch from addjobmodal date field */}
          <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
            <span className="text-secondary"> Appointment Date : </span>
            {booking.date
              ? new Date(booking.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "N/A"}
          </p>
          <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
            <span className="text-secondary">Booking Hours : </span>
            {booking.bookingHours} hours
          </p>
          {/* <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
            <span className="text-secondary">Prof ID : </span>
            {booking.profId || "N/A"}
          </p> */}

          <div className="float-end  mt-3">
            {activeTab !== "completed" ? (
              <button
                onClick={() => handleCancel(booking.id)}
                className="bg-tertiary bg-opacity-60 border border-secondary text-white py-1 px-4 rounded-lg hover:bg-secondary hover:border-white"
              >
                Cancel Booking
              </button>
            ) : (
              <button
                onClick={() => handleFeedback(booking)}
                className="bg-tertiary bg-opacity-60 border border-secondary text-white py-1 px-4 rounded-lg hover:bg-secondary hover:border-white"
              >
                Give Feedback
              </button>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <ul className="flex items-center justify-center mb-7">
        <li>
          <button
            className={`px-4 font-semibold font-primary ${
              activeTab === "today" ? " text-secondary" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
        </li>
        <li className="border-collapse border-l border-r border-primary">
          <button
            className={` px-4 font-semibold ${
              activeTab === "upcoming" ? " text-secondary" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
        </li>
        <li>
          <button
            className={` px-4 font-semibold ${
              activeTab === "completed" ? " text-secondary" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </li>
      </ul>

      <div>
        {activeTab === "today" && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderBookings(
              (booking) =>
                new Date(booking.date).toDateString() ===
                new Date().toDateString()
            )}
          </div>
        )}
        {activeTab === "upcoming" && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderBookings((booking) => new Date(booking.date) > new Date())}
          </div>
        )}
        {activeTab === "completed" && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderBookings((booking) => {
              const date = new Date(booking.date);
              const timeDiff = new Date() - date;
              const hoursDiff = timeDiff / (1000 * 3600); // Convert milliseconds to hours
              return date < new Date() && hoursDiff <= 48; // Completed within the last 48 hours
            })}
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {selectedBooking && (
        <CustFeedbackModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          bookingId={selectedBooking.id}
          custId={customerId}
          onSubmitFeedback={submitFeedback}
          profId={selectedBooking.profId}
        />
      )}
    </div>
  );
};

export default CustSchedule;
