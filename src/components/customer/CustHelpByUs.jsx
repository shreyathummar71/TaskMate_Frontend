import React, { useState } from "react";
import axios from "axios";

const CustHelpByUs = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    uploadImage: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, uploadImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start the submission process

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    if (formData.uploadImage) {
      data.append("uploadImage", formData.uploadImage);
    }

    try {
      const response = await axios.post(
        "https://backend-taskmate.onrender.com/contact",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "", uploadImage: null });
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // End the submission process
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-[90%] max-w-lg h-[80%] max-h-[700px] overflow-auto">
        <h2 className="text-xl font-primary text-secondary text-center mb-4">
          Help By Us
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="block text-sm font-secondary mb-2 text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="block text-sm font-secondary mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-3">
            <label className="block text-sm font-secondary mb-2 text-white">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-secondary mb-2 text-white">
              Attachment
            </label>
            <input
              type="file"
              name="uploadImage"
              onChange={handleFileChange}
              className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary "
              accept="image/*"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              } bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustHelpByUs;
