import React, { useState, useEffect } from "react";
import axios from "axios";
import userImage from "../../assets/images/user.png";
import getCustomerIdFromToken from "../../utils/tokenUtils"; // Your token utility
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import Heart Icons

const CustFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const customerId = getCustomerIdFromToken(); // Get customer ID from token
        const response = await axios.get(
          `https://backend-taskmate.onrender.com/favourite/customer/${customerId}`
        );
        setFavorites(response.data);
      } catch (err) {
        setError("Unable to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (favId) => {
    try {
      await axios.delete(`https://backend-taskmate.onrender.com/favourite/${favId}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite._id !== favId)
      );
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  if (loading) return <div>Loading favorites...</div>;
  if (error) return <div>{error}</div>;

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <span key={i} className="text-yellow-500 text-4xl mx-1">★</span>
        );
      } else if (i === filledStars && halfStar) {
        stars.push(
          <span key={i} className="text-yellow-500 text-4xl mx-1">☆</span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-4xl mx-1">☆</span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((favorite) => {
        const job = favorite.jobId || {}; // Fallback if jobId is undefined
        const service = job.service_id || {}; // Fallback if service_id is undefined
        const professional = favorite.prof_id || {}; // Fallback if prof_id is undefined

        return (
          <div
            key={favorite._id} // Using favorite._id to track the favorite for deletion
            className="flex flex-col justify-between bg-primary rounded-xl relative"
          >
            {/* Heart Icon to remove from favorites */}
            <div className="absolute top-2 right-2">
              <FaHeart
                className="text-red-600 text-3xl cursor-pointer"
                onClick={() => removeFromFavorites(favorite._id)}
                title="Remove from favorites"
              />
            </div>

            {/* Professional Profile Image */}
            <div className="items-center pb-4 text-center bg-tertiary rounded-xl">
              <img
                src={professional.profileImage || userImage}
                alt={professional.firstName}
                className="w-40 h-40 m-auto rounded-full text-center mt-4 p-1 border-2 border-secondary"
              />
              <p className="text-center font-semibold text-xl text-white font-primary">
                {professional.firstName} {professional.lastName}
              </p>
            </div>

            <div className="items-center pb-4 bg-primary rounded-b-xl">
              <div>
                <p className="text-lg text-center mt-2 text-white font-secondary">
                  {renderStars(professional.averageRating || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Service: </span>
                  {service.name || "N/A"} {/* Ensure service name is safely accessed */}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Location: </span>
                  {job.city || "N/A"}, {job.country || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Charges: </span>€{job.chargesPerHour || "N/A"}/hour
                </p>
              </div>
              <div>
               <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                 <span className="text-secondary">Working Date : </span>
                  {job.date
                     ? new Date(job.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                     year: 'numeric',
                  })
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Working Time : </span>
                  {job.startTime
                    ? new Date(job.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}{" "}
                  -{" "}
                  {job.endTime
                    ? new Date(job.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustFavorites;
