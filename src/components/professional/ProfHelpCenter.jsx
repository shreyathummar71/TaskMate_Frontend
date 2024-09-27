import React, { useState } from "react";
import ProfHelpByUs from "./ProfHelpByUs";
import ProfHelpByAIInterface from "./ProfHelpByAIInterface";
import FAQProfessional from "./FAQProfessional";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary p-6 rounded-lg shadow-md w-11/12 max-w-2xl">
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
      <div className="help-center-container font-primary bg-tertiary p-8">
        <h1 className="text-3xl font-bold text-primary font-primary mb-6">
          Help Center
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Help by Us */}
          <div className="bg-white p-6 rounded-lg font-primary shadow-md">
            <h2 className="text-xl font-primary font-semibold text-primary mb-4">
              Help by Us
            </h2>
            <p className="font-primary text-primary font-normal">
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
            <p className="font-primary text-primary font-normal">
              Get instant answers with our AI-powered chatbot.
            </p>
            <button
              className="mt-2 bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
              onClick={handleHelpByAIClick}
            >
              Ask Now
            </button>
          </div>

          {/* FAQ */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-primary font-semibold text-primary mb-4">
              FAQ
            </h2>
            <p className="font-primary text-primary font-normal">
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

      {/* Modals */}
      <Modal isOpen={showContactForm} onClose={() => setShowContactForm(false)}>
        <ProfHelpByUs onClose={() => setShowContactForm(false)} />
      </Modal>

      <Modal isOpen={showAIInterface} onClose={() => setShowAIInterface(false)}>
        <ProfHelpByAIInterface onClose={() => setShowAIInterface(false)} />
      </Modal>

      {/* FAQ (not in a modal) */}
      {showFAQProfessional && (
        <div className="relative mt-8">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
            onClick={() => setShowFAQProfessional(false)}
          >
            back
          </button>
          <FAQProfessional />
        </div>
      )}
    </div>
  );
};

export default ProfHelpCenter;
