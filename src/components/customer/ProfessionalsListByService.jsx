// ProfessionalsListByService.js
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
          <span key={i} className="text-yellow-500 text-2xl">
            ★
          </span>
        ); // Filled star
      } else if (i === filledStars && halfStar) {
        stars.push(
          <span key={i} className="text-yellow-500 text-2xl">
            ☆
          </span>
        ); // Half star (optional)
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-2xl">
            ☆
          </span>
        ); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {professionals.map((professional) => (
        <div
          key={professional._id}
          className="text-center flex flex-col justify-between rounded-md bg-tertiary"
        >
          {/* Professional Profile Image */}
          <div className="items-center pb-4 text-center  bg-tertiary  mt-4 rounded-md">
            <img
              src={professional.profileImage || userImage}
              alt={professional.firstName}
              className="w-32 h-32 m-auto rounded-full text-center"
            />

            <p className="  text-center font-semibold text-xl  ml-3 text-white font-secondary">
              {professional.firstName} {professional.lastName}
            </p>
          </div>

          <div className="items-center pb-4 text-center  bg-primary rounded-md">
            <div>
              <p className="text-lg  text-center  mt-2 ml-3 text-white font-secondary">
                {renderStars(professional.averageRating)}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                ServiceName : {professional.serviceName}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                Location: : {professional.city} , {professional.country}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                Charges : ${professional.chargesPerHour}/hour
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                Working Date: : {professional.workingDate}
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary ">
                Working Time: : {professional.workingTime.start} -{" "}
                {professional.workingTime.end}
              </p>
            </div>

            {/* Button to view profile */}

            <button
              onClick={() =>
                handleViewProfessionalDetailsClick(professional._id)
              }
              className="text-sm text-right mr-2 text-white font-secondary border-b border-secondary hover:text-secondary hover:border-white"
            >
              More Details of Professional
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalsListByService;
