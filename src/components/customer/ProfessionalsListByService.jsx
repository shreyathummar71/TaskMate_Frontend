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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {professionals.map((professional) => (
        <div key={professional._id} className="border p-4 rounded-lg shadow">
          <img
            src={professional.profileImage || "/default-avatar.png"}
            alt={professional.firstName}
            className="w-24 h-24 rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-semibold text-center">
            {professional.firstName} {professional.lastName}
          </h3>
          <p className="text-sm text-gray-600 text-center">
            {professional.jobProfile.experience} years experience
          </p>
          <div className="mt-2 text-center">
            <span className="text-yellow-500">
              {professional.averageRating.toFixed(1)} ★
            </span>
          </div>
          <Link
            to={`/professional-detail/${professional._id}`}
            className="block mt-3 text-center bg-tertiary text-white px-4 py-2 rounded hover:bg-secondary"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalsListByService;
