import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white px-20 text-black">
      {/* Left Column */}
      <div className="flex-1 p-4" style={{ width: "25%" }}>
        <div className="contact-rich space-y-4 border-1 border p-5">
          <h4 className="text-lg font-semibold">Store Information</h4>
          <div className="flex items-start space-x-3 border-b border-gray-300 pb-4">
            <div className="text-gray-600">
              <i className="material-icons text-2xl">&#xE0CD;</i>
            </div>
            <div>
              <p>Call us:</p>
              <p>
                <Link
                  To="tel:0123456789"
                  className="text-blue-500 hover:underline"
                >
                  0123456789
                </Link>
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 border-b border-gray-300 pb-4">
            <div className="text-gray-600">
              <i className="material-icons text-2xl">&#xE0DF;</i>
            </div>
            <div>
              <p>Fax:</p>
              <p>0123456789</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 pb-4">
            <div className="text-gray-600">
              <i className="material-icons text-2xl">&#xE158;</i>
            </div>
            <div>
              <p>Email us:</p>
              <p>
                <Link
                  to="mailto:demo@gmail.com"
                  className="text-blue-500 hover:underline"
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
        <section className="form-fields space-y-6">
          <div className="text-xl font-semibold mb-4">Contact Us</div>

          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 py-2">Subject</td>
                <td>
                  <input
                    className="form-input block w-full mt-1 bg-white border p-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="subject"
                    placeholder="Enter your subject here"
                  />
                </td>
              </tr>

              <tr>
                <td className="font-semibold pr-4 py-2">Email Address</td>
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
                <td className="font-semibold pr-4 py-2">Attachment</td>
                <td>
                  <input type="file" name="fileUpload" className=" p-2  mb-3" />
                </td>
              </tr>

              <tr>
                <td className="font-semibold pr-4 py-2 align-top">Message</td>
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

          <div className="flex flex-col items-start mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Send Message
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
