import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FAQProfessional = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignupProfClick = () => {
    navigate("/signupProf");
  };

  // Fetch FAQs from the API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          "https://backend-taskmate.onrender.com/faqs"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const faqArray = data.faqs || []; // Ensure faqs is an array
        const professionalFaqs = faqArray.filter(
          (faq) => faq.audience === "professional"
        );
        setFaqs(professionalFaqs);
      } catch (error) {
        setError("Error fetching FAQs");
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="faq-container bg-white max-w-2xl ml-0 mx-auto mt-8 text-start ">
      {/* Title */}
      <h1 className="font-primary text-2xl font-bold text-primary mb-6">
        Frequently Asked Questions for Professionals
      </h1>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="border-b border-gray-200">
            <details className="group py-4">
              <summary className="font-semibold font-primary text-primary text-left text-lg cursor-pointer flex justify-between items-center">
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
    </div>
  );
};

export default FAQProfessional;
