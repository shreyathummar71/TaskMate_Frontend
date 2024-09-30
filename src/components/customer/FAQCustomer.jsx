import React, { useEffect, useState } from "react";

const FAQCustomer = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);

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
        const customerFaqs = faqArray.filter(
          (faq) => faq.audience === "customer"
        );
        setFaqs(customerFaqs);
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
      <div className="flex items-center justify-center mt-8">
        <h1 className=" font-primary text-2xl font-bold text-primary">
          Frequently Asked Questions
        </h1>
      </div>

      {/* FAQ List */}
      <div className="max-w-2xl mx-auto space-y-4 mt-8 text-start">
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

export default FAQCustomer;
