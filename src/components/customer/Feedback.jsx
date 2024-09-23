import React, { useState, useEffect } from "react";
import useFetchFeedback from "../../utils/useFetchFeedback";

const Feedback = () => {
  const { feedback, loading, error } = useFetchFeedback(
    "https://backend-taskmate.onrender.com/feedback"
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const delay = 3000; // 3 seconds delay between slides

  useEffect(() => {
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
        <button onClick={handlePrev} className="p-2 bg-gray-300 rounded">
          Previous
        </button>

        {/* Carousel Cards */}
        <div className="grid grid-cols-4 gap-6">
          {visibleFeedback.length > 0 ? (
            visibleFeedback.map((item) => {
              const { rating, reviewText, cust_id, prof_id } = item;

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
                  className="card bg-tertiary shadow-lg rounded-lg p-6 max-w-xs mx-auto text-gray-500"
                >
                  {/* Professional Image */}
                  <div className="avatar ">
                    <img
                      className="w-9 h-9 mx-auto"
                      src={prof_id.image || "https://via.placeholder.com/100"}
                      alt={professionalName}
                    />
                  </div>
                  {/* Professional Name */}
                  <h2 className="text-xl font-semibold text-center mb-2">
                    {professionalName}
                  </h2>
                  <div className="bg-primary ">
                    {/* Customer Name */}
                    <p className="text-center mb-2">
                      Reviewed by: {customerName}
                    </p>

                    {/* Star Rating */}
                    <div className="text-center mb-4">
                      {Array(rating)
                        .fill()
                        .map((_, i) => (
                          <span
                            key={i}
                            className="inline-block text-yellow-400 text-xl"
                          >
                            &#9733;
                          </span>
                        ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-center text-gray-600 text-sm">
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
          Next
        </button>
      </div>
    </div>
  );
};

export default Feedback;
