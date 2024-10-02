// ModifyBookingModal.js
import React, { useRef } from "react";

const ModifyBookingModal = ({ isOpen, onClose, booking, onSave }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = React.useState(booking);

  React.useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primary rounded-lg p-6 w-1/3 max-h-full overflow-y-auto">
        <h2 className="text-xl font-primary text-secondary text-center mb-4">
          Modify Booking
        </h2>
        <dialog ref={modalRef} className="modal">
          <form onSubmit={handleSubmit}>
            <label>Professional Name:</label>
            <input
              type="text"
              name="professionalName"
              value={formData.professionalName}
              onChange={handleChange}
            />
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">
                Service Name:
              </label>
              <div className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"></div>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
              />
            </div>

            <label>Appointment Date:</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />

            <label>Schedule:</label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
            />

            <label>Booking Hours:</label>
            <input
              type="number"
              name="bookingHours"
              value={formData.bookingHours}
              onChange={handleChange}
            />

            <button type="submit">Save Changes</button>
          </form>
          <button onClick={onClose}>Close</button>
        </dialog>
      </div>
    </div>
  );
};

export default ModifyBookingModal;
