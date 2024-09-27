// FindProfessional.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FindProfessional = () => {
  const { serviceId } = useParams(); // Get the serviceId from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle button click
  const handleContactProfessional = () => {
    navigate("/professional-detail", { state: { serviceId } }); // Pass serviceId as state if needed
  };

  return (
    <div className="p-10">
      <h1 className="text-lg font-semibold">
        Find Professional for Service ID: {serviceId}
      </h1>
      <button
        className="mt-4 px-6 py-2 bg-tertiary text-white rounded-xl hover:bg-secondary"
        onClick={handleContactProfessional} // Attach the click event handler
      >
        Contact Professional
      </button>
    </div>
  );
};

export default FindProfessional;
