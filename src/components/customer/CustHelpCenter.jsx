import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustHelpByUs from "./CustHelpByUs";
import CustHelpByAIInterface from "./CustHelpByAIInterface";

const CustHelpCenter = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const navigate = useNavigate();

  const handleHelpByUSClick = () => {
    setShowContactForm(true);
  };

  const handleHelpByAIClick = () => {
    navigate("/custHelpByAI");
  };

  const handleFAQClick = () => {
    navigate("/FAQCustomer");
  };

  return (
    <div className="flex flex-col">
      {!showContactForm ? (
        <div className="help-center-container bg-tertiary p-8">
          <h1 className="text-3xl font-bold text-primary font-primary mb-6">
            Help Center
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Help by Us */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-primary font-semibold text-primary mb-4">
                Help by Us
              </h2>
              <p className="font-secondary text-primary font-normal">
                Contact our support team for personalized assistance.
              </p>
              <button
                className="mt-2 bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
                onClick={handleHelpByUSClick}
              >
                Help by Us
              </button>
            </div>

            {/* Help by AI */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-primary font-semibold text-primary mb-4">
                Help by AI
              </h2>
              <p className="font-secondary text-primary font-normal">
                Get instant answers with our AI-powered chatbot.
              </p>
              <button
                className="mt-2 bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
                onClick={handleHelpByAIClick}
              >
                Chat Now
              </button>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-primary font-semibold text-primary mb-4">
                FAQ
              </h2>
              <p className="font-secondary text-primary font-normal">
                Browse frequently asked questions for quick help.
              </p>
              <button
                className="mt-2 bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
                onClick={handleFAQClick}
              >
                View FAQs
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
              onClick={() => setShowContactForm(false)}
            >
              Back to Help Center
            </button>
            <CustHelpByUs />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustHelpCenter;
