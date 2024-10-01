import React, { useState } from "react";

const BookingModal = ({
  isOpen,
  onClose,
  onSubmit,
  professional,
  service,
  customerId,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    phoneNumber: "",
    email: "",
    appointmentDateTime: new Date().toISOString().substring(0, 16),
    bookHr: new Date().getHours(),
    isBookingForOthers: false,
    startTime: "", // New field
    endTime: "", // New field
    description: "", // New field
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      isBookingForOthers: !prev.isBookingForOthers,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(service_id);
    e.preventDefault();

    // Validate required fields
    if (!formData.name && formData.isBookingForOthers) {
      console.error("Name is required for booking for others");
      return;
    }

    const bookingData = {
      cust_id: customerId, // Replace with actual customer ID
      prof_id: professional._id,
      service_id: service, // Replace with actual service ID
      appointmentDateTime: new Date(formData.appointmentDateTime),
      bookHr: new Date(formData.appointmentDateTime).getHours(),
      status: "pending",
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
      description: formData.description,
      bookingForOthers: formData.isBookingForOthers
        ? {
            name: formData.name,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
          }
        : undefined,
    };

    try {
      const response = await fetch("http://localhost:8081/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Booking confirmed:", data);
        onSubmit(data);
      } else {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Display customerId */}
      <div className="bg-primary rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-primary text-secondary text-center mb-4">
          Book Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="datetime-local"
              name="appointmentDateTime"
              value={formData.appointmentDateTime}
              onChange={handleChange}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="bookHr"
              placeholder="Book Hour"
              value={formData.bookHr}
              onChange={handleChange}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            />
          </div>

          {/* Start Time Field */}
          <div className="mb-4">
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              placeholder="Start Time"
              required
            />
          </div>

          {/* End Time Field */}
          <div className="mb-4">
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              placeholder="End Time"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                checked={formData.isBookingForOthers}
                onChange={handleCheckboxChange}
              />
              Book for someone else
            </label>
          </div>

          {formData.isBookingForOthers && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="address.street"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="address.state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="address.zipcode"
                  placeholder="Zipcode"
                  value={formData.address.zipcode}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
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
