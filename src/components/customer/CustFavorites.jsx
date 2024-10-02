import React, { useState, useEffect } from "react";
import axios from "axios";
import userImage from "../../assets/images/user.png";
import getCustomerIdFromToken from "../../utils/tokenUtils"; // Your token utility
import { useNavigate } from "react-router-dom";

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
          `http://localhost:8081/favourite/customer/${customerId}`
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

  if (loading) return <div>Loading favorites...</div>;
  if (error) return <div>{error}</div>;

  const handleViewProfessionalDetailsClick = (id, service_id, job_id) => {
    navigate(`/professional-detail/${id}`, {
      state: {
        service_id,
        job_id, // Pass job ID to detail page
      },
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((favorite) => (
        <div
          key={favorite.prof_id._id}
          className="flex flex-col justify-between bg-primary rounded-xl"
        >
          <div className="items-center pb-4 text-center bg-tertiary rounded-xl">
            <img
              src={favorite.prof_id.profileImage || userImage}
              alt={favorite.prof_id.firstName}
              className="w-40 h-40 m-auto rounded-full text-center mt-4 p-1 border-2 border-secondary"
            />
            <p className="text-center font-semibold text-xl text-white font-primary">
              {favorite.prof_id.firstName} {favorite.prof_id.lastName}
            </p>
          </div>
          <div className="items-center pb-4 bg-primary rounded-b-xl">
            <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
              Service: {favorite.jobId.serviceName}
            </p>
            <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
              Date: {new Date(favorite.jobId.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
              Charges: €{favorite.jobId.chargesPerHour}/hour
            </p>

            <div className="float-end mr-4 mt-3">
              <button
                onClick={() =>
                  handleViewProfessionalDetailsClick(
                    favorite.prof_id._id,
                    favorite.service_id._id,
                    favorite.jobId._id
                  )
                }
                className="text-xs text-white font-primary border-b border-secondary hover:text-secondary hover:border-white"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustFavorites;
