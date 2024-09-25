import React, { useState } from "react";

const CustHelpByUs = () => {
  // <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
  //   <h2 className="text-xl font-semibold text-primary mb-4">Help by Us</h2>
  //   <p className="text-gray-700 mb-4">
  //     Contact our support team for personalized assistance.
  //   </p>
  //   <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  //     Contact Us
  //   </button>
  // </div>

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-secondary font-semibold text-tertiary mb-4">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-primary"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-tertiary text-white font-secondary border-secondary rounded-3xl focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-primary"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-tertiary text-white font-secondary border-secondary rounded-3xl focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-primary"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border bg-tertiary text-white font-secondary border-secondary rounded-3xl focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-tertiary font-secondary bg-opacity-50 border border-secondary text-white px-6 py-2 rounded-md hover:bg-yellow-400 hover:text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustHelpByUs;
