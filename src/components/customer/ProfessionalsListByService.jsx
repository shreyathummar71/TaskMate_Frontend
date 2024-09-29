// ProfessionalsListByService.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfessionalsListByService = ({ serviceId }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (serviceId) {
      const fetchProfessionals = async () => {
        try {
          const response = await fetch(
            `http://localhost:8081/professional/services/${serviceId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch professionals");
          }
          const data = await response.json();
          setProfessionals(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProfessionals();
    }
  }, [serviceId]);

  if (loading) return <div>Loading professionals...</div>;
  if (error) return <div>Error: {error}</div>;

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

          <div className="items-center pb-4 text-center bg-tertiary  rounded-md">
            <img
              src={professional.profileImage || "/default-avatar.png"}
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
                work Experience : {professional.jobProfile.experience} years
              </p>
            </div>
            <div>
              <p className="text-sm  text-left mt-2 ml-3 text-white font-secondary">
                Average Rating : {renderStars(professional.averageRating)}
              </p>
            </div>
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
