import React, { useEffect, useState } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import userImage from "/src/assets/images/user.png";
import UpdateCustomerBookingModal from "./UpdateCustomerBookingModal";

const CustMyBooking = () => {
  const [customerId, setCustomerId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state variables to manage the modal
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  function formatTime(timeString) {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  //To convert the ISO date string  for example "2024-10-24T12:19:53.000Z" to the dd/mm/YYYY format
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
      // case "confirmed":
      //   return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "";
    }
  };

  // Create functions to open and close the modal
  const openModal = (bookingDetails) => {
    setSelectedBooking(bookingDetails);
    setIsModalOpen(true);
    console.log("In open modal function 3");
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

      // Refresh booking details after successful update
      fetchBookingDetails(customerId);
      closeModal();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingDetails.map((bookingDetail) => (
          <div
            key={bookingDetail._id}
            className="flex flex-col justify-between bg-primary rounded-xl"
          >
            {/* Professional Profile Image */}

            <div className="items-center pb-4 text-center bg-tertiary rounded-xl">
              {/* <span className="text-red-600">{bookingDetail.professionalId}</span> */}
              <img
                src={bookingDetail.prof_id.profileImage || userImage}
                alt={bookingDetail.prof_id.firstName}
                className="w-40 h-40 m-auto rounded-full text-center mt-4 p-1 border-2 border-secondary"
              />
            </div>

            <div className="items-center pb-4 bg-primary rounded-b-xl">
              <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                <span className="text-secondary">Professional Name : </span>
                {bookingDetail.prof_id.firstName}{" "}
                {bookingDetail.prof_id.lastName}
              </p>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Service Name : </span>
                  {bookingDetail.service_id.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Appointment Date : </span>
                  {convertIsoToddmmYYYY(bookingDetail.addJobModel_id.date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Schedule : </span>
                  {formatTime(bookingDetail.startTime)} to{" "}
                  {formatTime(bookingDetail.endTime)}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Booking Hours : </span>
                  {bookingDetail.bookHr} hours
                </p>
              </div>
              <div className="float-end mr-4 mt-3">
                <button
                  onClick={() => {
                    console.log("Button clicked");
                    openModal(bookingDetail);
                  }}
                  className="bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
                >
                  Modify Booking
                </button>
              </div>
              <div className="float-end mr-4 mt-3">
                {bookingDetail.status.toLowerCase() !== "confirmed" && (
                  <button
                    className={`${getStatusButtonColor(
                      bookingDetail.status
                    )}  text-white px-4 py-2 rounded-xl font-primary text-sm hover:bg-opacity-80`}
                  >
                    {bookingDetail.status}
                  </button>
                )}
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
          formattedDate={selectedBooking.addJobModel_id.date}
        />
      )}
    </>
  );
};

export default CustMyBooking;
