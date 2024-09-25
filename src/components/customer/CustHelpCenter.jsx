import React from "react";

const CustHelpCenter = () => {
  return (
    <div>
      <div className="help-center-container bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Help Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Help by Us */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Help by Us
            </h2>
            <p className="text-gray-700">
              Contact our support team for personalized assistance.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Contact Us
            </button>
          </div>

          {/* Help by AI */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Help by AI
            </h2>
            <p className="text-gray-700">
              Get instant answers with our AI-powered chatbot.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Chat Now
            </button>
          </div>

          {/* FAQ */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-primary mb-4">FAQ</h2>
            <p className="text-gray-700">
              Browse frequently asked questions for quick help.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              View FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustHelpCenter;
