import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="main-body-container text-primary">
      {/* Hero Section with Background Image and Black Overlay */}
      <div
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('../src/assets/images/contact us.webp')`, // Replace with your contact image path
          height: "500px",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
        {/* Black overlay with 50% opacity */}
        {/* Content on top of the overlay */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
      </div>
      {/* welcome contant  */}
      <div>
        <h1 className="text-center mt-10 text-xl font-primary text-primary">
          We're here to help! <br /> Feel free to reach out to us with any
          questions, feedback, or inquiries
        </h1>
      </div>

      {/* Contact Us Content */}
      <div className="flex flex-row px-20 text-black py-10">
        {/* Left Column */}
        <div className="flex-1 p-4" style={{ width: "25%" }}>
          <div className="contact-rich space-y-4 border-1 border-secondary border p-5 bg-tertiary  rounded-2xl">
            <h4 className="text-lg font-semibold text-primary font-primary">
              Store Information
            </h4>{" "}
            {/* Primary Font for Heading */}
            <div className="flex items-start space-x-3 border-b border-gray-300 pb-4">
              <div className="text-gray-600">
                <i className="material-icons text-2xl">&#xE0CD;</i>
              </div>
              <div className="font-secondary">
                {" "}
                {/* Secondary Font for Paragraph */}
                <p>Call us:</p>
                <p>
                  <Link
                    To="tel:0123456789"
                    className="text-secondary hover:underline hover:text-blue-600"
                  >
                    9586894892
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border-b border-gray-300 pb-4">
              <div className="text-gray-600">
                <i className="material-icons text-2xl">&#xE0DF;</i>
              </div>
              <div className="font-secondary">
                <p>Fax:</p>
                <p className="text-secondary hover:underline hover:text-blue-600">
                  0123456789
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 pb-4">
              <div className="text-gray-600">
                <i className="material-icons text-2xl">&#xE158;</i>
              </div>
              <div className="font-secondary">
                <p>Email us:</p>
                <p>
                  <Link
                    to="mailto:taskmate@gmail.com"
                    className="text-secondary hover:underline hover:text-blue-600"
                  >
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
            <div className="text-xl font-semibold mb-4 font-primary text-secondary">
              Contact Us
            </div>{" "}
            {/* Primary Font for Heading */}
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold font-primary">Subject</td>{" "}
                  {/* Primary Font for Heading */}
                  <td>
                    <input
                      className="form-input block w-full mt-1 bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="subject"
                      placeholder="Enter your subject here"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold pr-4 py-2 font-primary">
                    Email Address
                  </td>{" "}
                  {/* Primary Font for Heading */}
                  <td>
                    <input
                      className="form-input block w-full mt-1 bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold pr-4 py-2 font-primary">
                    Attachment
                  </td>{" "}
                  {/* Primary Font for Heading */}
                  <td>
                    <input
                      type="file"
                      name="fileUpload"
                      className=" p-2  mb-3"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold pr-4 py-2 align-top font-primary">
                    Message
                  </td>{" "}
                  {/* Primary Font for Heading */}
                  <td>
                    <textarea
                      className="form-textarea block w-full mt-1 border border-gray-300 p-2 mb-3 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="message"
                      placeholder="How can we help?"
                      rows="3"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col items-end mt-4">
              <button className="bg-tertiary bg-opacity-50 border border-secondary text-white font-primary py-2 px-4 rounded-xl hover:bg-secondary">
                Send Message
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
