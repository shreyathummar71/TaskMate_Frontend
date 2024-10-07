import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import images
import faqHeaderImg from "../assets/images/FAQ.png";
import buttonArrowImg from "../assets/images/buttonArrow.png";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  const navigate = useNavigate();
  const handleSignupCustClick = () => {
    navigate("/customer/signup");
  };

  useEffect(() => {
    fetch("https://backend-taskmate.onrender.com/faqs")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const faqArray = data.faqs || [];
        const generalFaqs = faqArray.filter(
          (faq) => faq.audience === "general"
        );
        setFaqs(generalFaqs);
      })
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative faq-header-img bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${faqHeaderImg})`, // Use the imported image
          height: "550px",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* FAQs Section */}
      <div className="faq-container bg-white">
        <div className="text-center mt-8 text-primary font-primary">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 mt-8">
          {faqs.map((faq) => (
            <div key={faq._id} className="border-b border-gray-200">
              <details className="group py-4">
                <summary className="font-semibold font-primary text-primary text-lg cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span className="text-xl transform transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 font-normal font-secondary text-tertiary group-open:block">
                  {faq.answer}
                </p>
              </details>
            </div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-8">
          <button
            className="bg-tertiary border border-secondary font-secondary font-semibold text-white  py-2 px-4 rounded-xl shadow-lg mb-6 inline-flex items-center"
            onClick={handleSignupCustClick}
          >
            <span className="mr-2 text-xl">Get Started</span>
            <span>
              <img
                src={buttonArrowImg} // Use the imported image
                alt="arrowButton"
                width="20"
              />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FAQ;
