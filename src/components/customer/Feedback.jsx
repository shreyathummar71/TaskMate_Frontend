import useFetchFeedback from "../../utils/useFetchFeedback";
const Feedback = () => {
  const { feedback, loading, error } = useFetchFeedback(
    "https://backend-taskmate.onrender.com/feedback"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {feedback.length > 0 ? (
        feedback.map((item) => {
          const { rating, reviewText, cust_id, prof_id } = item;

          // Combine firstName and lastName, or fallback to email if name is not available
          const professionalName =
            prof_id.firstName && prof_id.lastName
              ? `${prof_id.firstName} ${prof_id.lastName}`
              : prof_id.email || "Unknown Professional";

          // Combine customer's name
          const customerName =
            cust_id.firstName && cust_id.lastName
              ? `${cust_id.firstName} ${cust_id.lastName}`
              : cust_id.email || "Anonymous";

          return (
            <div key={item._id} className="card">
              {/* Professional's image */}
              <img
                src={prof_id.image || "default-profile.jpg"}
                alt={professionalName}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <h3>{professionalName}</h3>{" "}
              {/* Display professional's full name */}
              <p>Reviewed by: {customerName}</p>{" "}
              {/* Display customer's full name */}
              <p>Rating: {rating} stars</p>
              <p>Description: {reviewText}</p>
            </div>
          );
        })
      ) : (
        <div>No feedback available</div>
      )}
    </div>
  );
};

export default Feedback;
