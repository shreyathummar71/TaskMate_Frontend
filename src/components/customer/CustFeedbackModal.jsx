import React, { useState } from "react";

const CustFeedbackModal = ({
  isOpen,
  onClose,
  bookingId,
  custId,
  profId,
  onSubmitFeedback,
  onSuccess, // New prop for success callback
}) => {
  const [rating, setRating] = useState(0); // Start with no rating
  const [hoverRating, setHoverRating] = useState(0); // Track hover rating
  const [reviewText, setReviewText] = useState("");

  if (!isOpen) return null; // Modal is hidden when isOpen is false

  const handleSubmit = async () => {
    const feedback = {
      booking_id: bookingId,
      cust_id: custId,
      prof_id: profId,
      rating,
      reviewText,
    };

    try {
      await onSubmitFeedback(feedback); // Submit feedback to parent component
      onSuccess(); // Call the success callback after submission

      // Reset the feedback form fields
      setRating(0); // Reset rating to 0
      setHoverRating(0); // Reset hover rating to 0
      setReviewText(""); // Clear the review text
    } catch (error) {
      // Handle any errors (optional)
      console.error("Error submitting feedback:", error);
    }

    onClose(); // Close modal after submission
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={starValue}
          onClick={() => setRating(starValue)} // Set rating on click
          onMouseEnter={() => setHoverRating(starValue)} // Set hover rating
          onMouseLeave={() => setHoverRating(0)} // Reset hover rating on mouse leave
          style={{
            cursor: "pointer",
            fontSize: "36px",
            color: starValue <= (hoverRating || rating) ? "#FFD700" : "#ccc", // Yellow if selected or hovered
          }}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-secondary font-primary">
          Give Feedback
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Rating</label>
          <div className="flex mt-2">{renderStars()}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-3">
            Review
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
            rows="4"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 mr-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustFeedbackModal;
