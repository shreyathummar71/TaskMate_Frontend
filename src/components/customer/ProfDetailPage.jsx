import React, { useEffect, useState } from "react";
import useFetchFeedback from "../../utils/useFetchFeedback"; // Import the custom hook
import userImage from "/src/assets/images/user.png";
import noImage from "/src/assets/images/placeholder-image.jpg";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BookingModal from "./BookingModal";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import BackArrow from "../../assets/images/Back_Arrow.png";
import axios from "axios";

const ProfDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { service_id, job_id } = location.state || {};
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [customerId, setCustomerId] = useState(null); // State for customer ID
  const [jobDescription, setJobDescription] = useState(null); // State for job description
  const [chargesPerHour, setChargesPerHour] = useState(null); // State for charges per hour
  const [date, setdate] = useState(null); // State for addjob model date
  const [referenceImage, setReferenceImage] = useState(null); // State for reference image
  const [jobLoading, setJobLoading] = useState(true); // State for job loading
  const [jobError, setJobError] = useState(null); // State for job error
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const [favoriteId, setFavoriteId] = useState(null); // Store favorite ID for removing
  const navigate = useNavigate();
  // Fetch customer ID from the token
  useEffect(() => {
    const id = getCustomerIdFromToken();
    setCustomerId(id); // Store customer ID in state
  }, []);
  const handleBackButton = () => {
    navigate("/customerDashboard");
  };

  const jobDate = new Date(date); // Create a Date object
  const formattedDate = jobDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // Change to "numeric" for a numeric month (1-12)
    day: "numeric",
  });
  // Fetch professional details
  useEffect(() => {
    const fetchProfessionalDetails = async () => {
      try {
        const response = await fetch(
          `https://backend-taskmate.onrender.com/professional/${id}`
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

  // Fetch job details based on job_id
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!job_id) return; // Exit if job_id is not available

      try {
        const response = await fetch(
          `https://backend-taskmate.onrender.com/newjob/${job_id}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON data
        setJobDescription(data.description); // Set job description
        setChargesPerHour(data.chargesPerHour); // Set charges per hour
        setdate(data.date); // Set job date
        setReferenceImage(data.referenceImage); // Set reference image
      } catch (err) {
        setJobError(err.message);
      } finally {
        setJobLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  // Check if the professional is already a favorite
  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await axios.get(
          `https://backend-taskmate.onrender.com/favourite/customer/${customerId}`
        );

        // Check if the professional is in the favorites list
        const favorite = response.data.find((fav) => fav.prof_id._id === id);

        if (favorite) {
          setIsFavorite(true);
          setFavoriteId(favorite._id); // Set the favorite ID properly
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    if (customerId) {
      checkIfFavorite();
    }
  }, [customerId, id]);

  // Fetch feedback based on professionalId
  const feedbackUrl = `https://backend-taskmate.onrender.com/feedback/professional/${id}`;
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
    setIsModalOpen(false); // Close the modal after submission
  };

  // Handle Add/Remove to/from Favorite
  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        const deleteResponse = await axios.delete(
          `https://backend-taskmate.onrender.com/favourite/${favoriteId}`
        );
        if (deleteResponse.status === 200) {
          setIsFavorite(false); // Update favorite status to false
          setFavoriteId(null); // Clear favorite ID
        } else {
          alert("Failed to remove from favorites");
        }
      } else {
        // Add to favorite if not already a favorite
        const response = await axios.post(
          "https://backend-taskmate.onrender.com/favourite",
          {
            cust_id: customerId,
            prof_id: id,
            jobId: job_id,
          }
        );
        if (response.status === 201) {
          setIsFavorite(true); // Update favorite status to true
          setFavoriteId(response.data._id); // Store the favorite ID
        } else {
          alert(response.data.message || "Failed to add to favorites");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      alert("Error toggling favorite status");
    }
  };

  if (loading || feedbackLoading || jobLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!professional) {
    return <div>No professional found</div>;
  }

  if (jobError) {
    return <div>Error fetching job details: {jobError}</div>;
  }

  // Log the professional object
  console.log("Professional Object:", professional);

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
      <div className="bg-primary text-white pt-14 mb-14 float-start w-full">
        <div className="justify-around items-center flex ">
          {/* Part 1: Image */}
          <div className="text-left mb-5">
            {professional.profileImage && (
              <img
                src={professional.profileImage || userImage}
                alt={`${professional.firstName}'s profile`}
                className="rounded-full w-40 h-40 border-2 border-secondary overflow-hidden"
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
            <p className="mb-4">
              {professional.jobProfile.experience} years of experience
            </p>
            {chargesPerHour && (
              <p className="mb-4">Charges per Hour: {chargesPerHour} €</p>
            )}
            {date && <p className="mb-4">Date: {formattedDate}</p>}
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
              <p className="mb-4">Phone: {professional.phoneNumber}</p>
            </div>
            <button
              onClick={handleToggleFavorite}
              className={`${
                isFavorite
                  ? "bg-red-600 text-white"
                  : "bg-tertiary text-black hover:bg-secondary"
              } px-4 py-2 rounded mr-5`}
            >
              {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
            </button>
            <button
              onClick={handleModalOpen}
              className="bg-tertiary text-black px-4 py-2 rounded hover:bg-secondary"
            >
              Book Now
            </button>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleBackButton}
          className=" flex text-center text-white font-primary rounded-md py-2 px-2 text-sm mx-4 mb-5 transition duration-200"
        >
          <img src={BackArrow} alt="Back Arrow" className="mr-2  w-4 h-4" />
          Back to Dashboard
        </button>
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
              return (
                <div key={skill._id} className="mr-7 text-center float-start">
                  {skill.image ? (
                    <img
                      src={skill.image}
                      alt="service image"
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
      <div className="bg-tertiary p-8 ">
        <h2 className="text-2xl font-semibold font-primary text-primary mb-5 ">
          About Me:
        </h2>
        <p className="text-md text-black font-secondary">
          {professional.aboutMe}
        </p>
      </div>
      <div className="p-8 bg-primary flex">
        <div className="w-1/2">
          {referenceImage && (
            <div>
              <img
                src={referenceImage || noImage}
                alt="Reference"
                className="object-cover rounded-md w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImage; // Fallback image
                }}
              />
            </div>
          )}
        </div>

        {/* Description Section with Centered Text */}
        <div className="w-1/2 flex justify-center items-center">
          <p className="text-md text-white font-secondary text-left px-10">
            {jobDescription || "No description available."}
          </p>
        </div>
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
                className="text-center flex flex-col justify-between rounded-md bg-primary"
              >
                {/* Customer Profile Image */}
                <div className="items-center pb-4 text-center bg-tertiary rounded-md">
                  {fb.cust_id ? ( // Check if cust_id is not null
                    <img
                      src={fb.cust_id.profileImage || userImage}
                      alt={`${fb.cust_id.firstName}'s profile`}
                      className="w-32 h-32 m-auto rounded-full"
                    />
                  ) : (
                    <img
                      src={userImage} // Fallback image when cust_id is null
                      alt="Default Profile"
                      className="w-32 h-32 m-auto rounded-full"
                    />
                  )}
                  <div>
                    {fb.cust_id ? (
                      <p className="text-sm mt-2 text-gray-700">
                        {fb.cust_id.firstName} {fb.cust_id.lastName}
                      </p>
                    ) : (
                      <p className="text-sm mt-2 text-gray-700">Anonymous</p> // Fallback text when cust_id is null
                    )}
                  </div>
                </div>

                {/* Rating Section */}
                <div className="p-5">
                  <div className="mb-2 text-center">
                    <div className="text-center">{renderStars(fb.rating)}</div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-2">
                    <p className="text-sm mt-2 text-white">{fb.reviewText}</p>
                  </div>

                  {/* Review Date */}
                  <div className="text-right">
                    <p className="text-sm text-white">
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
        serviceId={service_id}
        customerId={customerId}
        jobId={job_id}
        chargesPerHour={chargesPerHour}
        formattedDate={formattedDate}
      />
    </>
  );
};

export default ProfDetailPage;
