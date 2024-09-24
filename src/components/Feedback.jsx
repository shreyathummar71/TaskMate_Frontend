import React, { useState, useEffect } from "react";
import useFetchFeedback from "../utils/useFetchFeedback";

const Feedback = () => {
  const { feedback, loading, error } = useFetchFeedback(
    "https://backend-taskmate.onrender.com/feedback"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4; // Show 4 cards at a time
  const delay = 3000; // 3 seconds delay between slides

  // Handle automatic sliding
  useEffect(() => {
    if (!feedback || feedback.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, delay);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, feedback]);

  // Function to manually go to the previous feedback
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? feedback.length - cardsPerView
        : prevIndex - cardsPerView
    );
  };

  // Function to manually go to the next feedback
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + cardsPerView) % feedback.length
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!feedback || feedback.length === 0) {
    return <div>No feedback available</div>;
  }

  // Calculate the visible feedback cards

  const visibleFeedback = [];
  for (let i = 0; i < cardsPerView; i++) {
    visibleFeedback.push(feedback[(currentIndex + i) % feedback.length]);
  }
  return (
    <div className="py-10 px-5 float-start w-full">
      {/* Carousel Cards */}
      <div className="relative w-full h-auto max-w-full overflow-hidden ">
        <div className="flex transition-transform duration-700 ease-in-out float-start w-full gap-1">
          {visibleFeedback.map((item) => {
            const { rating, reviewText, cust_id, prof_id } = item;

            const professionalName =
              prof_id.firstName && prof_id.lastName
                ? `${prof_id.firstName} ${prof_id.lastName}`
                : "Unknown Professional";

            const customerName =
              cust_id.firstName && cust_id.lastName
                ? `${cust_id.firstName} ${cust_id.lastName}`
                : "Anonymous";

            const ratingStatus = "Rating28";

            return (
              <div
                key={item._id}
                className="flex flex-col w-1/4 flex-shrink-0  px-4 rounded-lg"
              >
                <div className="bg-primary rounded-lg float-start w-full">
                  {/* Upper Part with Tertiary Background */}
                  <div className="bg-tertiary flex-1 flex flex-col items-center justify-center p-4 rounded-lg relative">
                    <img
                      className="w-32 h-32 mt-12"
                      src={prof_id.image || "https://via.placeholder.com/100"}
                      alt={professionalName}
                    />
                    <h2 className="text-xl font-semibold font-primary text-center text-white mt-6">
                      {professionalName}
                    </h2>
                  </div>

                  {/* Lower Part with Primary Background */}
                  <div className="bg-primary flex-1 p-4 flex flex-col rounded-b-3xl">
                    {/* Customer Name */}
                    <h6 className="text-center font-primary text-white mb-2">
                      Review by: {customerName}
                    </h6>

                    {/* Star Rating */}
                    <div className="text-center mb-4 flex justify-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`inline-block text-4xl ${
                            i < rating ? "text-yellow-400" : "text-tertiary "
                          }`}
                          style={{ width: "1em", height: "1em" }}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>

                    {/* Description Feedback */}
                    <p className=" font-primary p-4 text-white text-sm text-left">
                      {reviewText}
                    </p>

                    {/* Review Text */}
                    <p className="text-right font-primary text-white text-sm mt-5">
                      {ratingStatus}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
