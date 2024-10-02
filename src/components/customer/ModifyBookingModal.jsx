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
    <dialog ref={modalRef} className="w-full">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-primary rounded-lg p-6 w-1/3 max-h-full overflow-y-auto">
          <h2 className="text-xl font-primary text-secondary text-center mb-4">
            Modify Booking
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white mb-1">
                Professional Name:
              </label>
              <input
                type="text"
                name="professionalName"
                value={formData.professionalName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border text-secondary rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-1">
                Service Name:
              </label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border text-secondary rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-1">
                Appointment Date:
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border text-secondaryrounded"
              />
            </div>

            <div>
              <label className="block text-sm text-white  mb-1">
                Schedule:
              </label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border text-secondary rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-white  mb-1">
                Booking Hours:
              </label>
              <input
                type="number"
                name="bookingHours"
                value={formData.bookingHours}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border text-secondary rounded"
              />
            </div>
            <div className="float-end mr-4 mt-3">
              <button
                type="submit"
                className="bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
          <div className="float-end mr-4 mt-4">
            <button
              onClick={onClose}
              className="bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModifyBookingModal;
