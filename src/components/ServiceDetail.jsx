import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import buttonArrow from "../assets/images/buttonArrow.png";

const SERVICE_DETAIL_API_URL = "https://backend-taskmate.onrender.com/services";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await fetch(`${SERVICE_DETAIL_API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch service details");
        }
        const data = await response.json();
        setService(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  if (loading) {
    return <div className="text-gray-600">Loading service details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!service) {
    return <div>No service details available.</div>;
  }

  return (
    <div className="bg-white">
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="max-w-full w-full h-auto object-cover mb-4"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
          {service.name}
        </h2>
      </div>
      <div className="p-8">
        <h3 className="text-lg font-semibold mb-4 font-primary text-primary">
          Service Description
        </h3>
        <p className="text-black font-secondary mb-12 text-md">
          {service.description.offered.descriptionPara}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-40">
          <ul className="ml-5">
            {service.description.offered.keypoints
              .slice(0, 3)
              .map((point, index) => (
                <li
                  key={index}
                  className="flex items-center font-secondary text-black mb-8"
                >
                  <span className="text-lg">🔧</span>
                  {point}
                </li>
              ))}
          </ul>
          <ul className="ml-5">
            {service.description.offered.keypoints
              .slice(3)
              .map((point, index) => (
                <li
                  key={index + 3}
                  className="flex items-center font-secondary text-black mb-8"
                >
                  <span className="text-lg">🔧</span>
                  {point}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* Displaying the image description parts */}
      <div className="bg-tertiary pt-8">
        {Object.entries(service.description.imageDescription)
          .filter(([key, part]) => part && part.image) // Filter out undefined or empty parts
          .map(([key, part], index) => (
            <div
              key={part._id}
              className={`flex items-center bg-tertiary pb-8 ${
                index % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              <img
                src={part.image}
                alt={part.title}
                className="h-auto object-cover mb-2"
              />
              <p
                className={`w-3/5 ${
                  index % 2 === 1 ? "-mr-20" : "-ml-20"
                } bg-primary text-white px-8 py-10 relative z-1 font-secondary text-sm`}
              >
                <div className="text-lg font-primary mb-3">{part.title}</div>
                {part.descriptionPara}
              </p>
            </div>
          ))}
      </div>

      {/* Displaying the why section */}
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-5 font-primary text-primary">
          Why Book with <span className="text-secondary">TaskMate?</span>
        </h3>
        <p className="text-black font-secondary mb-12 text-md">
          {service.description.why.descriptionPara}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-40">
          {service.description.why.keypoints.map((point, index) => (
            <div key={index} className="flex items-start">
              <span className="material-icons text-secondary text-2xl mr-2">
                check
              </span>
              <li className="list-none font-secondary text-black">{point}</li>
            </div>
          ))}
        </div>
      </div>

      {/* Get Started Button */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => navigate("/customer/login")}
          className="bg-tertiary border border-secondary font-secondary font-semibold text-white  py-2 px-4 rounded-xl shadow-lg mb-6 inline-flex items-center"
        >
          <span class="mr-2">Get Started</span>
          <span>
            <img src={buttonArrow} alt="arrowButton" width="20"></img>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ServiceDetail;
