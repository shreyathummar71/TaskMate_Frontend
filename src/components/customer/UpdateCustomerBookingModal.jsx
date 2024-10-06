import React, { useState, useEffect } from "react";

const UpdateCustomerBookingModal = ({
  isOpen,
  onClose,
  onSubmit,
  professional,
  serviceId,
  bookingId,
  customerId,
  jobId,
  chargesPerHour,
  formattedDate,
}) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState(
    new Date().toISOString().substring(0, 10) // Format for 'date'
  );
  const [bookHr, setBookHr] = useState("");
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [serviceName, setServiceName] = useState(""); // New state for service name

  const [customerBookingData, setCustomerBookingData] = useState(""); //New state for Customer booking
  const [isLoading, setIsLoading] = useState(true);

  function formatTime(timeString) {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
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

  useEffect(() => {
    const fetchCustomerBooking = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://backend-taskmate.onrender.com/booking/${bookingId}`
        );
        if (response.ok) {
          const customerBooking = await response.json();
          console.log("Printing response");
          console.log(customerBooking);
          console.log("Done printing response");
          setCustomerBookingData(customerBooking); //The customer booking data in fields
        } else {
          console.error("Failed to fetch customer booking data");
        }
      } catch (error) {
        console.error("Error fetching customerBooking :", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (bookingId) {
      //console.log("CustomerID is  not null", customerId);
      fetchCustomerBooking(); //Fetch Customerbooking deatils if the customerId is available
    }
  }, [bookingId]);

  useEffect(() => {
    if (customerBookingData) {
      setName(customerBookingData.bookingForOthers?.name || "");
      setStreet(customerBookingData.bookingForOthers?.address?.street || "");
      setCity(customerBookingData.bookingForOthers?.address?.city || "");
      setState(customerBookingData.bookingForOthers?.address?.state || "");
      setZipcode(customerBookingData.bookingForOthers?.address?.zipcode || "");
      setPhoneNumber(customerBookingData.bookingForOthers?.phoneNumber || "");
      setEmail(customerBookingData.bookingForOthers?.email || "");
      setAppointmentDateTime(customerBookingData.addJobModel_id?.date || "");
      setBookHr(customerBookingData.bookHr || "");
      setIsBookingForOthers(!!customerBookingData.bookingForOthers);
      setStartTime(customerBookingData.addJobModel_id?.startTime || "");
      setEndTime(customerBookingData.addJobModel_id?.endTime || "");
      setDescription(customerBookingData.description || "");
      setServiceName(customerBookingData.service_id?.name || "");
      setAppointmentDateTime(customerBookingData.addJobModel_id?.date || "");
    }
  }, [customerBookingData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookingData = {
      cust_id: customerId,
      addJobModel_id: jobId, // Use addJobModel_id instead of job_id
      prof_id: professional._id,
      service_id: serviceId,
      appointmentDateTime: new Date(appointmentDateTime),
      bookHr: bookHr,
      status: "pending",
      startTime: new Date(`${appointmentDateTime}T${startTime}`), // Ensure correct format
      endTime: new Date(`${appointmentDateTime}T${endTime}`), // Ensure correct format
      description: description,
      bookingForOthers: isBookingForOthers
        ? {
            name: name,
            address: {
              street: street,
              city: city,
              state: state,
              zipcode: zipcode,
            },
            phoneNumber: phoneNumber,
            email: email,
          }
        : undefined,
    };

    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/booking/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBookingData),
        }
      );

      if (response.ok) {
        const updatedBooking = await response.json();
        console.log("Booking updated successfully:", updatedBooking);
        onSubmit(updatedBooking);
      } else {
        console.error("Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primary rounded-lg p-6 w-1/3 max-h-full overflow-y-auto">
        <h2 className="text-xl font-primary text-secondary text-center mb-4">
          Book Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Appointment Date
            </label>
            <input
              type="datetimne-local"
              name="appointmentDateTime"
              value={convertIsoToddmmYYYY(appointmentDateTime)}
              onChange={(e) => setAppointmentDateTime(e.target.value)}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              disabled
              required
            />
          </div>{" "}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">Book Hour</label>
              <input
                type="text"
                name="bookHr"
                placeholder="Book Hour"
                value={bookHr}
                onChange={(e) => setBookHr(e.target.value)}
                className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">
                Charges per Hour
              </label>
              <div
                className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                disabled
              >
                {isLoading
                  ? "Loading..."
                  : customerBookingData?.addJobModel_id?.chargesPerHour ||
                    "N/A"}
              </div>
            </div>
          </div>
          {/* New Service Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Service</label>
            <div
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              disabled
            >
              {/* Display the service name */}
              {isLoading
                ? "Loading..."
                : customerBookingData?.service_id?.name || "N/A"}
            </div>
          </div>
          {/* Start Time and End Time Side by Side */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={
                  isLoading
                    ? "Loading..."
                    : customerBookingData?.addJobModel_id
                    ? formatTime(customerBookingData.addJobModel_id.startTime)
                    : ""
                }
                onChange={(e) => setStartTime(e.target.value)}
                className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">End Time</label>
              <input
                type="time"
                name="endTime"
                value={
                  customerBookingData && customerBookingData.addJobModel_id
                    ? formatTime(customerBookingData.addJobModel_id.endTime)
                    : "Loading..."
                }
                onChange={(e) => setEndTime(e.target.value)}
                className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                required
              />
            </div>
          </div>
          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              placeholder="Description"
              rows="3"
              required
            />
          </div>
          {/* Checkbox for Booking for Others */}
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={isBookingForOthers}
                onChange={() => setIsBookingForOthers(!isBookingForOthers)}
              />
              <span className="ml-2 text-grey-500">Book for someone else</span>
            </label>
          </div>
          {isBookingForOthers && (
            <>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Street</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 mr-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
            >
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerBookingModal;
