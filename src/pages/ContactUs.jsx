import React, { useState } from "react";
import { Link } from "react-router-dom";
import contactUsImage from "../assets/images/contact us.webp";

const ContactUs = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState(null); // State for handling the uploaded file
  const [loading, setLoading] = useState(false); // State for button loading
  const [success, setSuccess] = useState(false); // State for success message
  const [error, setError] = useState(""); // State for error message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);

    if (file) {
      formDataToSend.append("referenceImage", file); // Append the uploaded file
    }

    try {
      const response = await fetch("https://backend-taskmate.onrender.com/contectus", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          subject: "",
          email: "",
          message: "",
        });
        setFile(null);
        setError("");
      } else {
        const result = await response.json();
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${contactUsImage})`,
          height: "500px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
      </div>

      {/* Welcome Content */}
      <div>
        <h1 className="text-center mt-10 text-xl font-primary text-primary">
          We're here to help! <br /> Feel free to reach out to us with any questions, feedback, or inquiries.
        </h1>
      </div>

      {/* Contact Us Form */}
      <div className="flex flex-row px-20 text-black py-10">
        {/* Left Column */}
        <div className="flex-1 p-4" style={{ width: "25%" }}>
          <div className="contact-rich space-y-4 border-1 border-secondary border p-5 bg-tertiary rounded-2xl">
            <h4 className="text-lg font-semibold text-primary font-primary">
              Store Information
            </h4>
            <div className="flex items-start space-x-3 border-b border-gray-300 pb-4">
              <div className="text-primary">
                <i className="material-icons text-2xl">&#xE0CD;</i>
              </div>
              <div className="font-secondary">
                <p>Call us:</p>
                <p>
                  <Link to="tel:0123456789" className="text-white hover:underline hover:text-blue-600">
                    9586894892
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border-b border-gray-300 pb-4">
              <div className="text-primary">
                <i className="material-icons text-2xl">&#xE0DF;</i>
              </div>
              <div className="font-secondary">
                <p>Fax:</p>
                <p className="text-white hover:underline hover:text-blue-600">
                  0123456789
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 pb-4">
              <div className="text-primary">
                <i className="material-icons text-2xl">&#xE158;</i>
              </div>
              <div className="font-secondary">
                <p>Email us:</p>
                <p>
                  <Link to="mailto:taskmate@gmail.com" className="text-white hover:underline hover:text-blue-600">
                    taskmate@gmail.com
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-3/5 p-4" style={{ width: "65%" }}>
          <section className="form-fields space-y-6 bg-primary rounded-3xl p-5 text-primary">
            <div className="text-xl font-semibold mb-4 font-primary text-secondary">Contact Us</div>

            {success && <p className="text-green-500">Your message has been sent successfully!</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold text-white font-primary">Subject</td>
                    <td>
                      <input
                        className="form-input block w-full mt-1 bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter your subject here"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold text-white pr-4 py-2 font-primary">Email Address</td>
                    <td>
                      <input
                        className="form-input block w-full mt-1 bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold text-white pr-4 py-2 font-primary">Attachment</td>
                    <td>
                      <input
                        type="file"
                        name="referenceImage"
                        onChange={handleFileChange}
                        className="p-2 mb-3"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold text-white pr-4 py-2 align-top font-primary">Message</td>
                    <td>
                      <textarea
                        className="form-textarea block w-full mt-1 border border-gray-300 p-2 mb-3 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        rows="3"
                        required
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex flex-col items-end mt-4">
                <button
                  type="submit"
                  className="bg-tertiary bg-opacity-50 border border-secondary text-white font-primary py-2 px-4 rounded-xl hover:bg-secondary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
