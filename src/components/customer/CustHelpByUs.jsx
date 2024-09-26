import React, { useState } from "react";
import axios from "axios";

const CustHelpByUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    uploadImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, uploadImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="md:w-3/5 p-4" style={{ width: "65%" }}>
      <section className="form-fields space-y-6 bg-primary rounded-3xl p-5 text-primary">
        <div className="text-xl font-normal mb-4 font-primary text-secondary">
          <h2 className="text-2xl font-bold mb-6 text-center">Help By Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="font-semibold pr-4 py-2 font-primary"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input block w-full mt-1 text-primary bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                name="email"
                className="font-semibold pr-4 py-2 font-primary"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input block w-full mt-1 text-primary bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                name="message"
                placeholder="How can we help?"
                rows="5"
                className="font-semibold pr-4 py-2 font-primary"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="form-input block w-full mt-1  text-primary bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div>
              <label
                name="uploadImage"
                className="font-semibold pr-4 py-2 font-primary"
              >
                Attachment
              </label>
              <input
                type="file"
                id="uploadImage"
                name="uploadImage"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl
              file:text-sm file:font-primary
              file:bg-tertiary file:text-white
              hover:file:bg-secondary file:border file:border-secondary"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-tertiary bg-opacity-50 border border-secondary text-white font-primary py-2 px-4 rounded-xl hover:bg-secondary"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CustHelpByUs;
