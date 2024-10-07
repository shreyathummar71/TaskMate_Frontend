import React, { useState, useEffect } from "react";
import { FaThumbtack } from "react-icons/fa";
import userimg from "/src/assets/images/user.png";

// The API URL for fetching and unpinning jobs
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
  const [lastName, setLastName] = useState(""); // State for last name
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
        } catch (error) {
          setError("Failed to decode token.");
          setLoading(false);
          return;
        }

        setFirstName(user.firstName || "Unknown");
        setLastName(user.lastName || ""); // Set last name from user
        setProfilePicture(user.profileImage || userimg);

        if (token && professionalId) {
          try {
            const response = await fetch(`${PIN_JOB_API_URL}/${professionalId}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Add Authorization header with token
              },
            });

            if (response.ok) {
              const data = await response.json();
              console.log("Pinned Jobs Data:", data);

              // Filter out jobs with past working dates
              const today = new Date();
              const futureJobs = data.filter(job => {
                const jobDate = new Date(job.job_id?.date);
                return jobDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0); // Compare only the date
              });

              // Sort the jobs by date
              const sortedJobs = futureJobs.sort((a, b) => new Date(a.job_id.date) - new Date(b.job_id.date));

              setPinnedJobs(sortedJobs);

              // Assuming professional details are consistent across all jobs,
              // set the firstName and lastName from the first job if available.
              if (sortedJobs.length > 0) {
                const professional = sortedJobs[0].professionalId;
                setFirstName(professional?.firstName || "Unknown");
                setLastName(professional?.lastName || "");
                setProfilePicture(professional?.profileImage || userimg);
              }
            } else {
              setError("Failed to fetch pinned jobs.");
            }
          } catch (error) {
            setError("An error occurred while fetching pinned jobs.");
          } finally {
            setLoading(false);
          }
        } else {
          setError("Token or professionalId is missing.");
          setLoading(false);
        }
      } else {
        setError("User is not logged in.");
        setLoading(false);
      }
    };

    fetchPinnedJobs();
  }, []);

  // Handle unpinning a job
  const handleUnpinJob = async (job) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = user.token;
      const professionalId = job.professionalId?._id || decodeJWT(token)._id;

      if (!token || !professionalId) {
        setError("User token or professional ID is missing.");
        return;
      }

      try {
        const response = await fetch(`${PIN_JOB_API_URL}/${professionalId}/${job.job_id._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Remove the unpinned job from the state
          setPinnedJobs(pinnedJobs.filter(pinnedJob => pinnedJob.job_id._id !== job.job_id._id));
        } else {
          console.error("Failed to unpin the job.");
        }
      } catch (error) {
        console.error("Error unpinning job:", error);
      }
    } else {
      setError("User is not logged in.");
    }
  };

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
              {/* Unpin Button */}
              <button
                onClick={() => handleUnpinJob(job)} // Call the unpin function on click
                className="absolute top-2 right-2 text-2xl text-secondary"
              >
                <FaThumbtack />
              </button>

              {/* Job Card Content */}
              <div className="text-white rounded-lg p-4 shadow-lg max-w-xs text-center bg-tertiary">
                <div className="flex justify-center">
                  <img
                    src={profilePicture || userimg}
                    alt={`${firstName} ${lastName}'s Profile`} // Show full name in alt
                    className="w-40 h-40 rounded-full p-1 border-2 border-secondary"
                  />
                </div>
                <h3 className="text-lg font-primary">
                  {`${firstName} ${lastName}` || "Unknown Professional"}
                </h3> {/* Display full name */}
              </div>

              <div className="p-4">
                {/* Service Information */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Service : </span>
                  <span>{job.job_id?.service_id?.name || "N/A"}</span>
                </p>

                {/* Country and City */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Country : </span>
                  <span>{job.job_id?.country || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">City : </span>
                  <span>{job.job_id?.city || "N/A"}</span>
                </p>

                {/* Charges per hour */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Charges per hour : </span>
                  <span>{job.job_id?.chargesPerHour || "N/A"}€</span>
                </p>

                {/* Working Date */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Working Date : </span>
                  <span>{new Date(job.job_id?.date).toLocaleDateString("en-GB")}</span>
                </p>

                {/* Working Time */}
                <p className="text-sm mb-1">
                  <span className="text-secondary">Working Time : </span>
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
