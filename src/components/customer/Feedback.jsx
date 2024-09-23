import React, { useState, useEffect } from "react";
import useFetchFeedback from "../../utils/useFetchFeedback";

const Feedback = () => {
  const { feedback, loading, error } = useFetchFeedback(
    "https://backend-taskmate.onrender.com/feedback"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const delay = 1000; // 1.5 seconds delay between slides

  useEffect(() => {
    if (!feedback || feedback.length === 0) return;

    const interval = setInterval(() => {
      // Move to the next set of cards or wrap around
      setCurrentIndex((prevIndex) =>
        prevIndex + cardsPerView >= feedback.length
          ? 0
          : prevIndex + cardsPerView
      );
    }, delay);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [feedback.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!feedback || feedback.length === 0) {
    return <div>No feedback available</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerView >= feedback.length ? 0 : prevIndex + cardsPerView
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - cardsPerView < 0
        ? feedback.length - cardsPerView
        : prevIndex - cardsPerView
    );
  };

  // Slice the feedback array to show only 4 cards at a time
  const visibleFeedback = feedback.slice(
    currentIndex,
    currentIndex + cardsPerView
  );

  return (
    <div className="py-10 px-5">
      <div className="flex justify-between items-center">
        {/* Previous Button */}
        <button onClick={handlePrev} className="p-2 bg-tertiary rounded">
          &#8592; {/* Left Arrow */}
        </button>

        {/* Carousel Cards */}
        <div className="grid grid-cols-4 gap-16">
          {visibleFeedback.length > 0 ? (
            visibleFeedback.map((item) => {
              const { rating, reviewText, cust_id, prof_id } = item;

              const description = "Hi this is dummy description";

              const professionalName =
                prof_id.firstName && prof_id.lastName
                  ? `${prof_id.firstName} ${prof_id.lastName}`
                  : prof_id.email || "Unknown Professional";

              const customerName =
                cust_id.firstName && cust_id.lastName
                  ? `${cust_id.firstName} ${cust_id.lastName}`
                  : cust_id.email || "Anonymous";
              return (
                <div
                  key={item._id}
                  className="card bg-tertiary relative shadow-lg rounded-lg p-6 max-w-xl h-auto mx-auto"
                >
                  {/* Professional Image */}
                  <div className="flex justify-center mt-10">
                    <img
                      className="w-32 h-32 mb-5"
                      src={prof_id.image || "https://via.placeholder.com/100"}
                      alt={professionalName}
                    />
                  </div>

                  {/* Professional Name */}
                  <h2 className="text-xl  font-semibold text-center mb-5 font-primary">
                    {professionalName}
                  </h2>

                  {/* Review Section */}
                  <div className="bg-primary rounded-b-lg p-6 ">
                    {/* Customer Name */}
                    <h6 className="text-center font-primary text-white mb-2">
                      Review by: {customerName}
                    </h6>

                    {/* Star Rating */}
                    <div className="text-center mb-4">
                      {Array(rating)
                        .fill()
                        .map((_, i) => (
                          <span
                            key={i}
                            className="inline-block text-yellow-400 text-5xl"
                          >
                            &#9733;
                          </span>
                        ))}
                    </div>

                    {/* Description Feedback */}
                    <p className="text-center font-primary text-white text-sm">
                      {description}
                    </p>

                    {/* Review Text */}
                    <p className="text-right font-primary text-white text-sm mt-5">
                      {reviewText}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No feedback available</div>
          )}
        </div>

        {/* Next Button */}
        <button onClick={handleNext} className="p-2 bg-gray-300 rounded">
          &#8594; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
