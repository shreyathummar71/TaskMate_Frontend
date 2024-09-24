import React, { useEffect, useState } from "react";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:8081/faqs") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);
  return (
    <>
      <div class="relative h-64 md:h-96 overflow-hidden">
        <img
          src="src/assets/images/faqBanner.jpeg"
          alt="Banner"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white shadow-md rounded-lg p-4">
            <details className="group">
              <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                {faq.question}
                <span className="group-open:rotate-45 transform transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-2 text-gray-600 hidden group-open:block">
                {faq.answer}
              </p>
            </details>
          </div>
        ))}
      </div>

      <div class="text-center mt-8">
        <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
          Get Started
        </button>
      </div>
    </>
  );
};
export default FAQ;
