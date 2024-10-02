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
        `https://backend-taskmate.onrender.com/booking/customerbooking/${cust_id}`
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

  const openModal = (booking) => {
    setCurrentBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBooking(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update booking details
    closeModal();
  };
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
        return "bg-tertiary bg-opacity-50";
    }
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
            <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
              <span className="text-secondary">Professional Name : </span>
              {bookingDetail.professionalName}
            </p>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Service Name : </span>
                {bookingDetail.serviceName}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Appointment Date : </span>
                {bookingDetail.appointmentDate}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Schedule : </span>
                {bookingDetail.schedule}
              </p>
            </div>
            <div>
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Booking Hours : </span>
                {bookingDetail.bookingHours} hours
              </p>
            </div>
            <div className="float-end mr-4 mt-3">
              <button
                onClick={() => openModal(bookingDetail)}
                className="bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
              >
                Modify Booking
              </button>
            </div>
            <div className="float-end mr-4 mt-3">
              <button
                className={`${getStatusButtonColor(
                  bookingDetail.status
                )}  text-white px-4 py-2 rounded-xl font-primary text-sm hover:bg-opacity-80`}
              >
                {bookingDetail.status}
              </button>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <form onSubmit={handleSubmit}>
            {/* Add form fields for editing */}
            <label>Professional Name:</label>
            <input type="text" defaultValue={currentBooking.professionalName} />
            {/* Add more fields as needed */}
            <button type="submit">Save Changes</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CustMyBooking;
