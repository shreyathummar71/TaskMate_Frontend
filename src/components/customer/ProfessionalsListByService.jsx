// ProfessionalsListByService.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PROFESSIONAL_BY_SERVICE_ID_URL =
  "https://backend-taskmate.onrender.com/newJob/professionals-for-service-details/";

const ProfessionalsListByService = ({ serviceId }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Function to render stars based on average rating
  // const renderStars = (rating) => {
  //   const stars = [];
  //   const filledStars = Math.floor(rating); // Get the whole number part of the rating
  //   const halfStar = rating % 1 !== 0; // Check if there's a half star

  //   for (let i = 0; i < 5; i++) {
  //     if (i < filledStars) {
  //       stars.push(
  //         <span key={i} className="text-yellow-500 text-2xl">
  //           ★
  //         </span>
  //       ); // Filled star
  //     } else if (i === filledStars && halfStar) {
  //       stars.push(
  //         <span key={i} className="text-yellow-500 text-2xl">
  //           ☆
  //         </span>
  //       ); // Half star (optional)
  //     } else {
  //       stars.push(
  //         <span key={i} className="text-gray-400 text-2xl">
  //           ☆
  //         </span>
  //       ); // Empty star
  //     }
  //   }
  //   return stars;
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {professionals.map((professional) => (
        <div
          key={professional._id}
          className="text-center flex flex-col justify-between rounded-md bg-tertiary"
        >
          {/* Professional Profile Image */}

          <div className="items-center pb-4 text-center bg-tertiary  rounded-md">
            <img
              src={professional.profileImage || "/assets/images/pro.png"}
              alt={professional.firstName}
              className="w-32 h-32 m-auto rounded-full"
            />
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary">
                Name : {professional.firstName} {professional.lastName}
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

            {/* <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary">
                Average Rating : {renderStars(professional.averageRating)}
              </p>
            </div> */}
          </div>

          <Link
            to={`/professional-detail/${professional._id}`}
            className="block mt-3 text-center bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalsListByService;
