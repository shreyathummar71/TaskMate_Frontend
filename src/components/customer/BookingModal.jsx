import React, { useState } from "react";

const BookingModal = ({
  isOpen,
  onClose,
  onSubmit,
  professional,
  serviceId,
  customerId,
}) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState(
    new Date().toISOString().substring(0, 16)
  );
  const [bookHr, setBookHr] = useState(new Date().getHours());
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields for booking for others
    if (!name && isBookingForOthers) {
      console.error("Name is required for booking for others");
      return;
    }

    const bookingData = {
      cust_id: customerId,
      prof_id: professional._id,
      service_id: serviceId,
      appointmentDateTime: new Date(appointmentDateTime),
      bookHr: new Date(appointmentDateTime).getHours(),
      status: "pending",
      startTime: new Date(startTime),
      endTime: new Date(endTime),
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
        onSubmit(data);
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
      <div className="bg-primary rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-primary text-secondary text-center mb-4">
          Book Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="datetime-local"
              name="appointmentDateTime"
              value={appointmentDateTime}
              onChange={(e) => setAppointmentDateTime(e.target.value)}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            />
          </div>
          <div className="mb-4">
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

          {/* Start Time Field */}
          <div className="mb-4">
            <input
              type="datetime-local"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            />
          </div>

          {/* End Time Field */}
          <div className="mb-4">
            <input
              type="datetime-local"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
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
              Book for someone else
            </label>
          </div>

          {isBookingForOthers && (
            <>
              <div className="mb-4">
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
