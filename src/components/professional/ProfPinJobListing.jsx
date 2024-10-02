import React, { useState, useEffect } from "react";
import { FaThumbtack } from "react-icons/fa";
import userimg from "/src/assets/images/user.png";

// The API URL for fetching pinned jobs
const PIN_JOB_API_URL = "https://backend-taskmate.onrender.com/dashboard";

// Utility function to decode JWT (Base64URL)
const decodeJWT = (token) => {
  const base64Url = token.split('.')[1]; // Get the payload part of the token
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload); // Return the decoded payload as a JSON object
};

// Utility function to format time as "11:30 AM to 5:30 PM"
const formatWorkingTime = (startTime, endTime) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true }; // 12-hour format with AM/PM

  const formattedStartTime = new Date(startTime).toLocaleTimeString('en-US', options);
  const formattedEndTime = new Date(endTime).toLocaleTimeString('en-US', options);

  return `${formattedStartTime} to ${formattedEndTime}`;
};

const ProfPinJobListing = () => {
  const [pinnedJobs, setPinnedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchPinnedJobs = async () => {
      const storedUser = localStorage.getItem("user"); // Get the user object from local storage
      if (storedUser) {
        const user = JSON.parse(storedUser); // Parse the user object
        const token = user.token; // Extract the token

        let professionalId;
        try {
          const decodedToken = decodeJWT(token); // Manually decode the token to extract the professionalId
          professionalId = decodedToken._id; // Assuming _id is the professional ID in the token
          console.log("Decoded Professional ID from Token:", professionalId); // Log the professionalId
        } catch (error) {
          console.error("Error decoding token:", error);
          setError("Failed to decode token.");
          setLoading(false);
          return;
        }

        console.log("Token:", token); // Log token

        setFirstName(user.firstName || "Unknown");
        setProfilePicture(user.profileImage || userimg);

        if (token && professionalId) {
          try {
            const response = await fetch(`${PIN_JOB_API_URL}/${professionalId}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Add Authorization header with token
              },
            });

            console.log("Response Status:", response.status); // Log the response status

            if (response.ok) {
              const data = await response.json();
              console.log("Pinned Jobs Data:", data); // Log the complete response data

              // Log each job's service_id for debugging
              data.forEach((job) => {
                if (job.job_id?.service_id) {
                  console.log("Service Name:", job.job_id.service_id.name); // Log the service name
                } else {
                  console.log("Service ID is missing or not populated");
                }
              });

              setPinnedJobs(data); // Set pinned jobs data if the response is successful
            } else {
              console.error("Failed to fetch pinned jobs:", response.statusText);
              setError("Failed to fetch pinned jobs.");
            }
          } catch (error) {
            console.error("An error occurred while fetching pinned jobs:", error);
            setError("An error occurred while fetching pinned jobs.");
          } finally {
            setLoading(false); // Remove loading state even if there's an error
          }
        } else {
          console.error("Token or professionalId is missing.");
          setError("Professional ID or token is missing.");
          setLoading(false); // Remove loading state if token or professionalId is missing
        }
      } else {
        setError("User is not logged in.");
        setLoading(false); // Remove loading state if user is not logged in
      }
    };

    fetchPinnedJobs();
  }, []);

  if (loading) {
    return <p>Loading pinned jobs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-primary font-primary">Pinned Job Listings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
        {pinnedJobs.length > 0 ? (
          pinnedJobs.map((job) => (
            <div key={job.job_id._id} className="text-white rounded-lg pb-3 shadow-lg max-w-xs bg-primary relative">
              {/* Pin Button (It's already pinned, so no click action here) */}
              <div className="absolute top-2 right-2 text-2xl text-secondary">
                <FaThumbtack />
              </div>

              {/* Job Card Content */}
              <div className="text-white rounded-lg p-4 shadow-lg max-w-xs text-center bg-tertiary">
                <div className="flex justify-center">
                  <img
                    src={profilePicture || userimg}
                    alt={`${firstName}'s Profile`}
                    className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                  />
                </div>
                <h3 className="text-lg font-primary">{firstName || "Unknown Professional"}</h3>
              </div>

              <div className="p-4">
                {/* Service Information */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Service: </span>
                  <span>{job.job_id?.service_id?.name || "N/A"}</span> 
                </p>

                {/* Country and City */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Country: </span>
                  <span>{job.job_id?.country || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">City: </span>
                  <span>{job.job_id?.city || "N/A"}</span>
                </p>

                {/* Charges per hour */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Charges per hour: </span>
                  <span>{job.job_id?.chargesPerHour || "N/A"}€</span>
                </p>

                {/* Working Date */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Working Date: </span>
                  <span>{new Date(job.job_id?.date).toLocaleDateString("en-GB")}</span>
                </p>

                {/* Working Time */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Working Time: </span>
                  <span>
                    {formatWorkingTime(job.job_id?.startTime, job.job_id?.endTime)}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No pinned jobs available. Start pinning jobs!</p>
        )}
      </div>
    </div>
  );
};

export default ProfPinJobListing;
