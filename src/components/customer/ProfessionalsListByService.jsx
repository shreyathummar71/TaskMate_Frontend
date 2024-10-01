import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userImage from "../../assets/images/user.png";
import ProfDetailPage from "./ProfDetailPage";

const PROFESSIONAL_BY_SERVICE_ID_URL =
  "https://backend-taskmate.onrender.com/newJob/professionals-for-service-details/";

const ProfessionalsListByService = ({ serviceId }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          `${PROFESSIONAL_BY_SERVICE_ID_URL}${serviceId}`
        );
        setProfessionals(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "No professionals available for this service"
        );
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchProfessionals();
    }
  }, [serviceId]);

  if (loading) return <div>Loading professionals...</div>;
  if (error) return <div> {error}</div>;

  const handleViewProfessionalDetailsClick = (id) => {
    navigate(`/professional-detail/${id}`);
  };

  // Function to render stars based on average rating
  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating); // Get the whole number part of the rating
    const halfStar = rating % 1 !== 0; // Check if there's a half star

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <span key={i} className="text-yellow-500 text-4xl mx-1">
            ★
          </span>
        ); // Filled star
      } else if (i === filledStars && halfStar) {
        stars.push(
          <span key={i} className="text-yellow-500 text-4xl mx-1">
            ☆
          </span>
        ); // Half star (optional)
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-4xl mx-1">
            ☆
          </span>
        ); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {professionals.map((professional) => (
        <div
          key={professional._id}
          className="flex flex-col justify-between bg-primary rounded-xl"
        >
          {/* Professional Profile Image */}
          <div className="items-center pb-4 text-center  bg-tertiary rounded-xl">
            <span className="text-red-600">{professional.professionalId}</span>
            <img
              src={professional.profileImage || userImage}
              alt={professional.firstName}
              className="w-40 h-40 m-auto rounded-full text-center mt-4 p-1 border-2 border-secondary"
            />

            <p className="  text-center font-semibold text-xl  text-white font-primary">
              {professional.firstName} {professional.lastName}
            </p>
          </div>

          <div className="items-center pb-4  bg-primary rounded-b-xl">
            <div>
              <p className="text-lg text-center mt-2  text-white font-secondary">
                {renderStars(professional.averageRating)}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                <span className="text-secondary">Service : </span>
                {professional.serviceName}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                <span className="text-secondary"> Location : </span>
                {professional.city} , {professional.country}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                <span className="text-secondary">Charges : </span>€
                {professional.chargesPerHour}/hour
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                <span className="text-secondary">Working Date : </span>
                {professional.workingDate}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                <span className="text-secondary">Working Time : </span>
                {professional.workingTime.start} -{" "}
                {professional.workingTime.end}
              </p>
            </div>

            {/* Button with more detailed text */}
            <div className="float-end mr-4 mt-3">
              <button
                onClick={() =>
                  handleViewProfessionalDetailsClick(
                    professional.professionalId
                  )
                }
                className="text-xs  text-white font-primary border-b border-secondary hover:text-secondary hover:border-white"
              >
                View {professional.firstName}'s Full Profile{" "}
                {/* Updated text */}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalsListByService;
