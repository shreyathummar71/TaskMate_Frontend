import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  const navigate = useNavigate();
  const handleSignupCustClick = () => {
    navigate("/signupCust");
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
        console.log("data", data); // Log to check data structure

        // Assuming the data is an object with a property containing the array
        const faqArray = data.faqs || [];
        const generalFaqs = faqArray.filter(
          (faq) => faq.audience === "general"
        );

        setFaqs(generalFaqs);
        console.log("Filtered general FAQs:", generalFaqs);
      })
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  return (
    <>
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src="src/assets/images/faqBanner.jpeg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className=" font-primary text-4xl md:text-6xl font-bold text-white">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4 mt-8">
        {faqs.map((faq) => (
          <div key={faq._id} className="border-b border-gray-200">
            <details className="group py-4">
              <summary className="font-semibold font-secondary  text-white text-lg cursor-pointer flex justify-between items-center">
                {faq.question}
                <span className="text-xl transform transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 font-secondary text-white group-open:block">
                {faq.answer}
              </p>
            </details>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          className="bg-tertiary  bg-opacity-50 border text-center border-secondary font-secondary font-semibold text-white  py-2 px-6 rounded-xl shadow-lg mb-8 inline-flex items-center"
          onClick={handleSignupCustClick}
        >
          <span class="mr-2 text-xl">Get Started</span>
          <span>
            <img
              src="src/assets/images/buttonArrow.png"
              alt="arrowButton"
              width="20"
            ></img>
          </span>
        </button>
      </div>
    </>
  );
};
export default FAQ;
