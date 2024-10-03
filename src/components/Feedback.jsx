import React, { useState, useEffect } from "react";
import useFetchFeedback from "../utils/useFetchFeedback";
import userImage from "../assets/images/user.png";

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
    const feedbackIndex = (currentIndex + i) % feedback.length;
    const feedbackItem = feedback[feedbackIndex];

    // Check if the feedbackItem is valid
    if (feedbackItem) {
      visibleFeedback.push(feedbackItem);
    }
  }

  return (
    <div className="py-16 px-5 float-start w-full">
      {/* Carousel Cards */}
      <div className="relative w-full h-auto max-w-full overflow-hidden ">
        <div className="flex transition-transform duration-700 ease-in-out float-start w-full gap-1">
          {visibleFeedback.map((item) => {
            // Ensure item is defined before destructuring
            if (!item) {
              return null; // Skip if item is undefined
            }

            const { rating, reviewText, cust_id, prof_id } = item;

            const professionalName =
              prof_id && prof_id.firstName && prof_id.lastName
                ? `${prof_id.firstName} ${prof_id.lastName}`
                : "Unknown Professional";

            const customerName =
              cust_id && cust_id.firstName && cust_id.lastName
                ? `${cust_id.firstName} ${cust_id.lastName}`
                : "Anonymous";

            const ratingStatus = "Rating28";

            return (
              <div
                key={item._id}
                className="flex flex-col w-1/4 flex-shrink-0 px-4 rounded-lg h-auto"
              >
                {/* Card Container with Fixed Heights */}
                <div className="bg-primary rounded-2xl float-start w-full h-full flex flex-col justify-between">
                  {/* Upper Part with Fixed Height */}
                  <div className="bg-tertiary flex items-center justify-center p-4 rounded-2xl h-60">
                    <div className="flex flex-col items-center">
                      <img
                        className="w-32 h-32 mb-4 object-cover"
                        src={prof_id?.image || userImage} // Optional chaining here
                        alt={professionalName}
                      />
                      <h2 className="text-xl font-semibold font-primary text-white text-center">
                        {professionalName}
                      </h2>
                    </div>
                  </div>

                  {/* Lower Part with Fixed Height */}
                  <div className="bg-primary flex flex-col justify-between p-4 flex-1 rounded-b-3xl h-auto ">
                    {/* Customer Name */}
                    <h6 className="text-center text-xs font-primary text-white ">
                      Review by: {customerName}
                    </h6>

                    {/* Star Rating */}
                    <div className="text-center mb-3 flex justify-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`inline-block text-5xl ${
                            i < rating ? "text-secondary" : "text-tertiary"
                          }`}
                          style={{ width: "1em", height: "1em" }}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>

                    {/* Description Feedback */}
                    <div className="flex-grow ">
                      <p className="font-primary text-white text-sm text-justify h-auto overflow-hidden text-ellipsis">
                        {reviewText}
                      </p>
                    </div>

                    {/* Rating Status */}
                    <p className="text-right font-primary text-white text-xs mt-8">
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
