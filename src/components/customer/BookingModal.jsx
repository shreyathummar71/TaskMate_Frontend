import React, { useState, useEffect } from "react";

const BookingModal = ({
  isOpen,
  onClose,
  onSubmit,
  professional,
  serviceId,
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
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [confirmedJobId, setConfirmedJobId] = useState(null);
  const [serviceName, setServiceName] = useState(""); // New state for service name
  const [timeError, setTimeError] = useState(""); // State to hold time error
  const [alertMessage, setAlertMessage] = useState(""); // New state for alert message

  useEffect(() => {
    const fetchServiceName = async () => {
      try {
        const response = await fetch(
          `https://backend-taskmate.onrender.com/services/${serviceId}`
        );
        if (response.ok) {
          const serviceData = await response.json();
          setServiceName(serviceData.name); // Assuming the service name is in the 'name' field
        } else {
          console.error("Failed to fetch service name");
        }
      } catch (error) {
        console.error("Error fetching service name:", error);
      }
    };

    if (serviceId) {
      fetchServiceName(); // Fetch service name when the serviceId is available
    }
  }, [serviceId]); // Trigger the effect when serviceId changes

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setTimeError("");

    // Validation: Check if startTime and endTime are set
    if (!startTime || !endTime) {
      setTimeError("Start time and end time are required.");
      return;
    }

    // Convert times to Date objects
    const startDateTime = new Date(`${appointmentDateTime}T${startTime}`);
    const endDateTime = new Date(`${appointmentDateTime}T${endTime}`);

    // Check if startTime is less than endTime
    if (startDateTime >= endDateTime) {
      setTimeError("Start time should be earlier than end time.");
      return;
    }

    const bookingData = {
      cust_id: customerId,
      addJobModel_id: jobId,
      prof_id: professional._id,
      service_id: serviceId,
      appointmentDateTime: new Date(appointmentDateTime),
      status: "pending",
      startTime: startDateTime, // Ensure correct format
      endTime: endDateTime, // Ensure correct format
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
        "https://backend-taskmate.onrender.com/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Booking confirmed:", data);
        onSubmit(data); // Call onSubmit with the booking data received from backend

        // Show success alert
        setAlertMessage("Booking confirmed successfully!");

        // Clear alert after 3 seconds
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      } else {
        const errorData = await response.text();
        console.error("Failed to create booking", errorData);
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primary rounded-lg p-6 w-1/3 max-h-full overflow-y-auto relative">
        {/* Alert Message */}
        {alertMessage && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded z-50">
            {alertMessage}
          </div>
        )}

        <h2 className="text-xl font-primary text-secondary text-center mb-4">
          Book Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Date Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Date</label>
            <div className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary">
              {formattedDate || "Loading..."}
            </div>
          </div>

          {/* Charges per Hour Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Charges per Hour
            </label>
            <div className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary">
              {chargesPerHour ? `${chargesPerHour} €` : "Loading..."}
            </div>
          </div>

          {/* Service Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Service</label>
            <div className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary">
              {serviceName || "Loading..."}
            </div>
          </div>

          {/* Start Time and End Time */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-white text-sm mb-2">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={startTime}
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
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                required
              />
            </div>
          </div>

          {/* Display Time Error if exists */}
          {timeError && (
            <div className="mb-4 text-red-500 text-sm">{timeError}</div>
          )}

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
              <span className="ml-2 text-tertiary">Book for someone else</span>
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
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
