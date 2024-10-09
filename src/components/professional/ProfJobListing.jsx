import React, { useState, useEffect } from "react";
import AddJob from "./AddJob";
import { FaThumbtack } from "react-icons/fa";
import userimg from "/src/assets/images/user.png";

const PROFESSIONAL_JOBS_API_URL =
  "https://backend-taskmate.onrender.com/newJob/professional";
const DELETE_JOB_API_URL = "https://backend-taskmate.onrender.com/newJob";
const PIN_JOB_API_URL = "https://backend-taskmate.onrender.com/dashboard";

// Utility function to format time
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const ProfJobListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); // New state for last name
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [pinnedJobs, setPinnedJobs] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = user.token;

      if (token) {
        fetchJobs(token);
      } else {
        console.error("Token is missing.");
      }
    } else {
      console.error("User is not logged in.");
    }
  }, []);

  // Fetch jobs and professional details
  const fetchJobs = async (token) => {
    try {
      const response = await fetch(PROFESSIONAL_JOBS_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Filter out jobs with dates in the past
        const filteredJobs = data.filter((job) => {
          const jobDate = new Date(job.date);
          const today = new Date();
          // Compare only the date, ignoring time
          return jobDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
        });

        setJobs(filteredJobs);

        if (filteredJobs.length > 0) {
          const professional = filteredJobs[0].professionalId;
          setFirstName(professional.firstName || "Unknown");
          setLastName(professional.lastName || "");
          setProfilePicture(professional.profileImage || userimg);

          fetchPinnedJobs(filteredJobs[0].professionalId._id, token);
        }
      } else {
        setError("Failed to fetch job listings");
      }
    } catch (error) {
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch pinned jobs function
  const fetchPinnedJobs = async (professionalId, token) => {
    try {
      const response = await fetch(`${PIN_JOB_API_URL}/${professionalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const pinnedJobsData = await response.json();
        const pinnedJobIds = pinnedJobsData.map((job) => job.job_id._id);
        setPinnedJobs(pinnedJobIds);
      } else {
        console.error("Failed to fetch pinned jobs.");
      }
    } catch (error) {
      console.error("Error fetching pinned jobs:", error);
    }
  };

  // Sort jobs by date
  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Handle pin/unpin functionality
  const handlePinJob = async (job) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = user.token;

      if (!token) {
        console.error("User token is missing.");
        return;
      }

      const isPinned = pinnedJobs.includes(job._id);

      try {
        const apiUrl = isPinned
          ? `${PIN_JOB_API_URL}/${job.professionalId._id}/${job._id}` // Use the correct URL for DELETE
          : PIN_JOB_API_URL;

        const response = isPinned
          ? await fetch(apiUrl, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
          : await fetch(PIN_JOB_API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                professionalId: job.professionalId._id,
                job_id: job._id,
              }),
            });

        if (response.ok) {
          const updatedPinnedJobs = isPinned
            ? pinnedJobs.filter((id) => id !== job._id)
            : [...pinnedJobs, job._id];
          setPinnedJobs(updatedPinnedJobs);
        } else {
          console.error("Failed to pin/unpin job.");
        }
      } catch (error) {
        console.error("Error pinning/unpinning job:", error);
      }
    }
  };

  // Handle deleting a job
  const handleDeleteJob = async (jobId) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = user.token;

      if (!token) {
        setError("User is not logged in.");
        return;
      }

      try {
        if (pinnedJobs.includes(jobId)) {
          const requestBody = JSON.stringify({
            professionalId: jobs.find((job) => job._id === jobId)
              ?.professionalId,
            job_id: jobId,
          });

          const pinResponse = await fetch(PIN_JOB_API_URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: requestBody,
          });

          if (pinResponse.ok) {
            setPinnedJobs(pinnedJobs.filter((id) => id !== jobId));
          } else {
            console.error("Failed to remove job from pinned jobs.");
          }
        }

        const response = await fetch(`${DELETE_JOB_API_URL}/${jobId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setJobs(jobs.filter((job) => job._id !== jobId));
          setAlertMessage("Job deleted successfully!");
          setTimeout(() => {
            setAlertMessage("");
          }, 3000);
        } else {
          setError("Failed to delete job.");
        }
      } catch (error) {
        setError("An error occurred while deleting the job.");
      }
    }
  };

  // Handle editing a job
  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Handle adding a job without pinning it
  const handleAddJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const handleJobSaved = (updatedJob) => {
    if (selectedJob) {
      setJobs(
        jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
      );
    } else {
      setJobs([...jobs, updatedJob]);
    }
  };

  if (loading) {
    return <p>Loading job listings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative">
      {/* Alert message */}
      {alertMessage && (
        <div className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-lg shadow-md">
          {alertMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-primary font-primary">Job Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white font-medium font-primary py-2 px-4 rounded-lg shadow-md hover:bg-secondary"
        >
          <i className="fas fa-plus mr-2 text-secondary hover:text-white"></i>
          Add Job
        </button>
      </div>

      <AddJob
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
        job={selectedJob}
        clearFormOnAdd={true}
        onJobSaved={handleJobSaved} // Callback to update the job list
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job) => (
            <div
              key={job._id}
              className="text-white rounded-lg pb-3 shadow-lg max-w-xs bg-primary relative"
            >
              {/* Pin Button */}
              <button
                onClick={() => handlePinJob(job)}
                className={`absolute top-2 right-2 text-2xl ${
                  pinnedJobs.includes(job._id)
                    ? "text-secondary"
                    : "text-gray-300"
                }`}
              >
                <FaThumbtack />
              </button>

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
                </h3>{" "}
                {/* Display full name */}
              </div>

              <div className="p-4">
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
                <p className="text-sm mb-1">
                  <span className="text-secondary">Working Time : </span>
                  <span>
                    {formatTime(job.startTime)} to {formatTime(job.endTime)}
                  </span>
                </p>
              </div>

              {/* Edit and Remove Buttons */}
              <div className="pr-4">
                <div className="flex justify-end space-x-3">
                  <button
                    className="bg-tertiary text-primary py-2 px-4 rounded-lg text-sm hover:bg-secondary hover:text-white"
                    onClick={() => handleEditJob(job)}
                  >
                    Edit Job
                  </button>
                  <button
                    className="bg-tertiary text-primary py-2 px-4 rounded-lg text-sm hover:bg-secondary hover:text-white"
                    onClick={() => handleDeleteJob(job._id)}
                  >
                    Remove
                  </button>
                </div>
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

export default ProfJobListing;
