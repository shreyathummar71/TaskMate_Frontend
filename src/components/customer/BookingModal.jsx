import React, { useState } from "react";

const BookingModal = ({ isOpen, onClose, onSubmit, professional }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      cust_id: "Your_Customer_ID", 
      prof_id: professional._id,
      service_id: "Your_Service_ID", 
      appointmentDateTime: formData.appointmentDateTime,
      bookHr: new Date(formData.appointmentDateTime).getHours(),
      addJobModel_id: "Your_AddJobModel_ID", 
      status: "pending",
      bookingForOthers: formData.isBookingForOthers
        ? {
            name: formData.name,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
          }
        : undefined,
    };

    onSubmit(bookingData);
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
