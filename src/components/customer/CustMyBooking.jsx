import React, { useEffect, useState } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import userImage from "/src/assets/images/user.png";
import UpdateCustomerBookingModal from "./UpdateCustomerBookingModal";

const CustMyBooking = () => {
  const [customerId, setCustomerId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("confirmed");
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch Booking Details
  const fetchBookingDetails = async (cust_id) => {
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/customer/${cust_id}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch booking data: ${response.status} ${errorText}`
        );
      }
      const bookingData = await response.json();
      console.log("Fetched booking data:", bookingData);

      if (bookingData && Array.isArray(bookingData)) {
        const bookingsWithAddJobDetails = await Promise.all(
          bookingData.map(async (booking) => {
            // Check if addJobModel_id is defined
            if (booking.addJobModel_id && booking.addJobModel_id._id) {
              const addJobDetailsResponse = await fetch(
                `https://backend-taskmate.onrender.com/newJob/${booking.addJobModel_id._id}`
              );
              const addJobDetails = await addJobDetailsResponse.json();
              console.log("Add Job Details:", addJobDetails);

              return {
                ...booking,
                addJobDetails,
              };
            }
            return booking;
          })
        );

        setBookingDetails(bookingsWithAddJobDetails);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    const getCustId = async () => {
      const cust_id = await getCustomerIdFromToken();
      if (cust_id) {
        setCustomerId(cust_id);
        fetchBookingDetails(cust_id);
      }
      console.log("customer id", customerId);
    };
    getCustId();
  }, []);

  // Format time function
  function formatTime(timeString) {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Convert ISO date to dd/mm/YYYY format
  function convertIsoToddmmYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  // Function to determine button color based on status
  const getStatusButtonColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get color for tabs based on status
  const getTabColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Create functions to open and close the modal
  const openModal = (bookingDetails) => {
    setSelectedBooking(bookingDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // Add a function to handle the submission of updated booking details
  const handleBookingUpdate = async (updatedBookingData) => {
    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/${selectedBooking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBookingData),
        }
      );

      if (!response.ok) throw new Error("Failed to update booking");

      setAlertMessage("Booking updated successfully!");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);

      // Refresh booking details after successful update
      await fetchBookingDetails(customerId);
      closeModal();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const isPastDate = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(dateString);
    return bookingDate < today;
  };

  const handleTabChange = (status) => {
    setActiveTab(status);
  };

  // Filter bookings based on status and sort by date
  const filteredBookings = bookingDetails
    .filter((booking) => booking.status.toLowerCase() === activeTab)
    .filter(
      (booking) =>
        activeTab === "cancelled" || !isPastDate(booking.addJobDetails?.date)
    )
    .sort(
      (a, b) =>
        new Date(a.addJobDetails?.date) - new Date(b.addJobDetails?.date)
    );

  console.log("filtered booking", filteredBookings);

  return (
    <>
      <div>
        {/* Alert Message */}
        {alertMessage && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded z-50">
            {alertMessage}
          </div>
        )}
        <h2 className="text-2xl mb-8 font-primary text-primary">
          Manage Bookings
        </h2>
      </div>
      {/* Booking status Tabs */}
      <div className="flex justify-center mb-6">
        {["confirmed", "pending", "cancelled"].map((status) => (
          <button
            key={status}
            className={`px-4 font-semibold font-primary ${
              activeTab === status
                ? getTabColor(status)
                : "bg-white text-gray-600"
            } ${
              status === "pending"
                ? "border-collapse border-l border-r border-primary"
                : ""
            } mx-1 capitalize`}
            onClick={() => handleTabChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map((bookingDetail) => (
          <div
            key={bookingDetail._id}
            className="flex flex-col justify-between bg-primary rounded-xl"
          >
            <div className="items-center pb-4 text-center bg-tertiary rounded-xl">
              <img
                src={bookingDetail.prof_id?.profileImage || userImage}
                alt={bookingDetail.prof_id?.firstName || "No Name"}
                className="w-40 h-40 m-auto rounded-full text-center mt-4 p-1 border-2 border-secondary"
              />
            </div>

            <div className="items-center pb-4 bg-primary rounded-b-xl">
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Professional Name: </span>
                {bookingDetail.prof_id?.firstName}{" "}
                {bookingDetail.prof_id?.lastName}
              </p>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Service: </span>
                  {bookingDetail.service_id.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Appointment Date: </span>
                  {convertIsoToddmmYYYY(bookingDetail.addJobDetails?.date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Schedule: </span>
                  {formatTime(bookingDetail.startTime)} to{" "}
                  {formatTime(bookingDetail.endTime)}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Booking Hours: </span>
                  {bookingDetail.bookHr} hours
                </p>
              </div>
              <div className="float-end mr-4 mt-3">
                {bookingDetail.status.toLowerCase() !== "confirmed" &&
                  bookingDetail.status.toLowerCase() !== "cancelled" && (
                    <button
                      onClick={() => openModal(bookingDetail)}
                      className="bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-xl font-primary text-sm :text-white"
                    >
                      Modify Booking
                    </button>
                  )}
              </div>
              <div className="float-end mr-4 mt-3">
                <button
                  className={`${getStatusButtonColor(
                    bookingDetail.status
                  )} text-white px-4 py-2 rounded-xl font-primary text-sm hover:bg-opacity-80`}
                >
                  {bookingDetail.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedBooking && (
        <UpdateCustomerBookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleBookingUpdate}
          professional={selectedBooking.prof_id._id}
          serviceId={selectedBooking.service_id._id}
          customerId={customerId}
          bookingId={selectedBooking._id}
          jobId={selectedBooking.addJobModel_id._id}
          chargesPerHour={selectedBooking.addJobModel_id.chargesPerHour}
          formattedDate={selectedBooking.appointmentDateTime}
        />
      )}
    </>
  );
};

export default CustMyBooking;
