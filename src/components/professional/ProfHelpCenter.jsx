import React, { useState } from "react";
import ProfHelpByUs from "./ProfHelpByUs";
import ProfHelpByAIInterface from "./ProfHelpByAIInterface";
import FAQProfessional from "./FAQProfessional";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center z-50">
      <div className="bg-primary p-6 rounded-lg shadow-lg w-[90%] max-w-lg h-[80%] max-h-[700px] overflow-auto relative">
        {children}
      </div>
    </div>
  );
};

const ProfHelpCenter = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAIInterface, setShowAIInterface] = useState(false);
  const [showFAQProfessional, setShowFAQProfessional] = useState(false);

  const handleHelpByUSClick = () => {
    setShowContactForm(true);
  };

  const handleHelpByAIClick = () => {
    setShowAIInterface(true);
  };

  const handleFAQClick = () => {
    setShowFAQProfessional(true);
  };

  return (
    <div className="flex flex-col">
      <div className="help-center-container font-primary ">
        <h1 className="text-2xl  text-primary font-primary mb-6">
          Help Center
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Help by Us */}
          <div className="bg-primary p-6 rounded-lg font-primary shadow-md">
            <h2 className="text-xl font-primary text-white mb-4">Help by Us</h2>
            <p className="font-secondary text-white mb-2 ">
              Contact our support team for personalized assistance.
            </p>
            <button
              className="mt-2 bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-lg font-primary text-sm hover:bg-secondary hover:text-white"
              onClick={handleHelpByUSClick}
            >
              Help by Us
            </button>
          </div>

          {/* Help by AI */}
          <div className="bg-primary p-6 rounded-lg font-primary shadow-md">
            <h2 className="text-xl font-primary  text-white mb-4">
              Help by AI
            </h2>
            <p className="font-secondary text-white mb-2 font-normal ">
              Get instant answers with our AI-powered chatbot.
            </p>
            <button
              className="mt-2 bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-lg font-primary text-sm hover:bg-secondary hover:text-white"
              onClick={handleHelpByAIClick}
            >
              Ask Now
            </button>
          </div>

          {/* FAQ */}
          <div className="bg-primary p-6 rounded-lg font-primary shadow-md">
            <h2 className="text-xl font-primary font- text-white mb-4">FAQ</h2>
            <p className="font-secondary text-white mb-2 font-normal">
              Browse frequently asked questions for quick help.
            </p>
            <button
              className="mt-2 bg-tertiary bg-opacity-50 border border-secondary text-white px-4 py-2 rounded-lg font-primary text-sm hover:bg-secondary hover:text-white"
              onClick={handleFAQClick}
            >
              View FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showContactForm}>
        <ProfHelpByUs onClose={() => setShowContactForm(false)} />
      </Modal>

      <Modal isOpen={showAIInterface}>
        <ProfHelpByAIInterface onClose={() => setShowAIInterface(false)} />
      </Modal>

      {/* FAQ (not in a modal) */}
      {showFAQProfessional && (
        <div className="relative mt-8">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
            onClick={() => setShowFAQProfessional(false)}
          >
            Back
          </button>
          <FAQProfessional />
        </div>
      )}
    </div>
  );
};

export default ProfHelpCenter;
