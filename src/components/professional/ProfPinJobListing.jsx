import React, { useState, useEffect } from "react";
import { FaThumbtack } from "react-icons/fa";
import userimg from "/src/assets/images/user.png"; 

const PROFESSIONAL_JOBS_API_URL = "https://backend-taskmate.onrender.com/newJob/professional";
const PIN_JOB_API_URL = "https://backend-taskmate.onrender.com/dashboard"; // API for pinning jobs

const ProfPinJobListing = ({ onPinJob }) => {
  const [jobs, setJobs] = useState([]);
  const [pinnedJobs, setPinnedJobs] = useState([]); // State to track pinned jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName || "Unknown");
      setProfilePicture(user.profileImage || userimg);
    }
  }, []);

  const fetchJobs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      setError("User is not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(PROFESSIONAL_JOBS_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        setError("Failed to fetch job listings");
      }
    } catch (error) {
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle pin/unpin functionality
  const handlePinJob = async (job) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      return; // Ensure user is logged in
    }

    const isPinned = pinnedJobs.includes(job._id);

    try {
      const response = isPinned
        ? await fetch(`${PIN_JOB_API_URL}/${job._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await fetch(PIN_JOB_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ prof_id: user.id, job_id: job._id }),
          });

      if (response.ok) {
        // Update pinned jobs in state
        const updatedPinnedJobs = isPinned
          ? pinnedJobs.filter((id) => id !== job._id)
          : [...pinnedJobs, job._id];
        setPinnedJobs(updatedPinnedJobs);
        onPinJob(); // Refresh the dashboard's pinned jobs
      } else {
        console.error("Failed to pin/unpin job");
      }
    } catch (error) {
      console.error("Error pinning/unpinning job:", error);
    }
  };

  const isJobPinned = (jobId) => pinnedJobs.includes(jobId);

  if (loading) {
    return <p>Loading job listings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="text-white rounded-lg pb-3 shadow-lg max-w-xs bg-primary relative">
              {/* Pin Button */}
              <button
                onClick={() => handlePinJob(job)}
                className={`absolute top-2 right-2 text-2xl ${
                  isJobPinned(job._id) ? "text-secondary" : "text-gray-300"
                }`}
              >
                <FaThumbtack />
              </button>

              <div className="text-white rounded-lg p-4 shadow-lg max-w-xs text-center bg-tertiary">
                <div className="flex justify-center ">
                  <img
                    src={profilePicture || userimg}
                    alt={`${firstName}'s Profile`}
                    className="w-40 h-40 rounded-full "
                  />
                </div>
                <h3 className="text-lg font-primary">{firstName || "Unknown Professional"}</h3>
              </div>

              <div className="p-4 ">
                <p className="text-sm mb-1">
                  <span className="text-secondary">Service : </span>
                  <span>{job.service_id?.name || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">Country : </span>
                  <span>{job.country || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">City : </span>
                  <span>{job.city || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">Charges per hour : </span>
                  <span>{job.chargesPerHour || "N/A"}€</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">Working Date : </span>
                  <span>{new Date(job.date).toLocaleDateString("en-GB")}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No job listings available. Start by adding your first job!</p>
        )}
      </div>
    </div>
  );
};

export default ProfPinJobListing;
