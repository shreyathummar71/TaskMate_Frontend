import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetchFeedback from "../../utils/useFetchFeedback"; // Import the custom hook
import userImage from "/src/assets/images/user.png";
import { useParams } from "react-router-dom";
import BookingModal from "./BookingModal";
import getCustomerIdFromToken from "../../utils/tokenUtils";

const ProfDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { service_id } = location.state || {};
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [customerId, setCustomerId] = useState(null); // State for customer ID

  // Fetch customer ID from the token
  useEffect(() => {
    const id = getCustomerIdFromToken();
    setCustomerId(id); // Store customer ID in state
  }, []);
  // Fetch professional details
  useEffect(() => {
    const fetchProfessionalDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/professional/${id}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON data
        setProfessional(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionalDetails();
  }, [id]);

  // Fetch feedback based on professionalId
  const feedbackUrl = `http://localhost:8081/feedback/professional/${id}`;
  const {
    feedback,
    loading: feedbackLoading,
    error: feedbackError,
  } = useFetchFeedback(feedbackUrl);
  // Handle modal open/close
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle booking submission
  const handleBookingSubmit = (bookingData) => {
    console.log("Booking Data Submitted:", bookingData);
    // You can send bookingData to your API here
    setIsModalOpen(false); // Close the modal after submission
  };

  if (loading || feedbackLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!professional) {
    return <div>No professional found</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <span key={i} className="text-yellow-500 text-2xl">
            ★
          </span>
        );
      } else if (i === filledStars && halfStar) {
        stars.push(
          <span key={i} className="text-yellow-500 text-2xl">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-2xl">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <div>
        <h1>Professional Detail Page</h1>
        <p>Service ID: {service_id || "Not provided"}</p>
        <p>Customer ID: {customerId || "Not fetched"}</p>{" "}
        {/* Display Customer ID */}
        {/* Other professional details can be displayed here */}
      </div>
      <div className="bg-primary py-14 flex justify-between items-center text-white px-40">
        {/* Part 1: Image */}
        <div className="text-left mb-5">
          {professional.profileImage && (
            <img
              src={professional.profileImage}
              alt={`${professional.firstName}'s profile`}
              className="rounded-full w-[150px] h-[150px] border-2 border-secondary overflow-hidden"
            />
          )}
          <p className="mt-4 text-center">
            {professional.averageRating
              ? renderStars(professional.averageRating)
              : "N/A"}
          </p>
        </div>

        {/* Part 2: Personal Information */}
        <div className="text-left mb-5 ">
          <h1 className="text-2xl font-semibold text-secondary font-primary mb-4">{`${professional.firstName} ${professional.lastName}`}</h1>
          <p className="mb-4">Email: {professional.email}</p>
          <p className="mb-4">Phone: {professional.phoneNumber}</p>
          <p className="mb-4">
            {professional.jobProfile.experience} years of experience
          </p>
        </div>

        {/* Part 3: Location and Buttons */}
        <div className="text-left mb-5">
          <div>
            <p className="text-2xl font-semibold text-secondary font-primary mb-4">
              Location:
            </p>
            <span className="float-start w-full mb-2">
              City: {professional.jobProfile.city || "Unknown"}
            </span>
            <span className="float-start w-full mb-7">
              Country: {professional.jobProfile.country || "Unknown"}
            </span>
          </div>
          <button className="bg-tertiary text-black px-4 py-2 rounded mr-5 hover:bg-secondary">
            Add to Favorite
          </button>
          <button
            onClick={handleModalOpen}
            className="bg-tertiary text-black  px-4 py-2 rounded hover:bg-secondary"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-8 px-8">
        <h2 className="text-2xl font-semibold font-primary text-primary mb-5">
          Skills
        </h2>
        <div className="flex flex-wrap justify-start mb-5">
          {professional.jobProfile.skill &&
          professional.jobProfile.skill.length > 0 ? (
            professional.jobProfile.skill.map((skill) => {
              console.log("Rendering Skill:", skill); // Debugging
              return (
                <div key={skill.name} className="mr-7 text-center float-start">
                  {skill.image ? (
                    <img
                      src={skill.image}
                      alt={`${skill.name} image`}
                      className="h-32 w-32 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = userImage; // Fallback image
                      }}
                    />
                  ) : (
                    <div className="h-32 w-32 flex items-center justify-center bg-gray-200 rounded-md">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <span className="float-start w-full text-sm mt-2 text-primary">
                    {skill.name}
                  </span>
                </div>
              );
            })
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-tertiary p-8">
        <h2 className="text-2xl font-semibold font-primary text-primary mb-5 ">
          About Me:
        </h2>
        <p className="text-md text-black font-secondary">
          {professional.aboutMe}
        </p>
      </div>

      {/* Feedback Section */}
      <div className="my-8 px-8">
        {feedbackError ? (
          <p>Error fetching feedback: {feedbackError}</p>
        ) : feedback && feedback.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedback.map((fb) => (
              <div
                key={fb._id}
                className=" text-center flex flex-col justify-between rounded-md bg-primary"
              >
                {/* Customer Profile Image */}
                <div className="items-center pb-4 text-center bg-tertiary  rounded-md">
                  <img
                    src={fb.cust_id.profileImage || userImage}
                    alt={`${fb.cust_id.firstName}'s profile`}
                    className="w-32 h-32 m-auto rounded-full"
                  />
                  <div>
                    <p className="text-sm mt-2 text-gray-700">
                      {fb.cust_id.firstName} {fb.cust_id.lastName}
                    </p>
                  </div>
                </div>

                {/* Rating Section */}
                <div className="p-5">
                  <div className="mb-2 text-center">
                    <div className="text-center">{renderStars(fb.rating)}</div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-2">
                    <p className="text-sm mt-2  text-white">{fb.reviewText}</p>
                  </div>

                  {/* Review Date */}
                  <div className=" text-right">
                    <p className="text-sm  text-white">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No feedback available.</p>
        )}
      </div>
      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleBookingSubmit}
        professional={professional}
        service={service_id}
        customerId={customerId} // Pass customer ID here
      />
    </>
  );
};

export default ProfDetailPage;
