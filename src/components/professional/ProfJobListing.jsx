import React, { useState, useEffect } from "react";
import AddJob from "./AddJob"; // Your modal for adding and editing jobs
import userimg from "/src/assets/images/user.png"; // Default user image

const PROFESSIONAL_JOBS_API_URL = "https://backend-taskmate.onrender.com/newJob/professional"; // Ensure the correct URL
const DELETE_JOB_API_URL = "https://backend-taskmate.onrender.com/newJob"; // Base URL to delete job

const ProfJobListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedJob, setSelectedJob] = useState(null); // State to hold the job being edited

  // Fetch professional data from localStorage (name and profile picture)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName || "Unknown");
      setProfilePicture(user.profileImage || userimg);
    }
  }, []);

  const handleOpenModal = (job = null) => {
    setSelectedJob(job); // Set the job to edit, or null for adding a new job
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchJobs(); // Refresh job listings after adding or editing a job
  };

  // Fetch jobs for the logged-in professional
  const fetchJobs = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user from localStorage
    const token = user ? user.token : null; // Extract the token from the user object

    if (!token) {
      setError("User is not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(PROFESSIONAL_JOBS_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data); // Set the fetched jobs in the state
      } else {
        setError("Failed to fetch job listings");
      }
    } catch (error) {
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to format time to "HH:mm AM/PM"
  const formatTime = (time) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(time).toLocaleTimeString([], options);
  };

  // Function to format date to "dd/mm/yyyy"
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Handle job deletion
  const handleDeleteJob = async (jobId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      setError("User is not logged in.");
      return;
    }

    try {
      const response = await fetch(`${DELETE_JOB_API_URL}/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== jobId)); // Remove deleted job from state
      } else {
        setError("Failed to delete job.");
      }
    } catch (error) {
      setError("An error occurred while deleting the job.");
    }
  };

  // Handle editing the job (open modal with pre-filled data)
  const handleEditJob = (job) => {
    setSelectedJob(job); // Set the selected job to edit
    setIsModalOpen(true); // Open the modal
  };

  if (loading) {
    return <p>Loading job listings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-primary font-primary">Job Listings</h1>
        <button
          onClick={() => handleOpenModal()} // Reset selectedJob for adding new jobs
          className="bg-primary text-white font-primary py-2 px-4 rounded-xl shadow-md hover:bg-secondary"
        >
          <i className="fas fa-plus mr-2 text-secondary"></i>
          Add Job
        </button>
      </div>

      {/* Modal for Adding/Editing Job */}
      <AddJob 
        isModalOpen={isModalOpen} 
        handleCloseModal={handleCloseModal} 
        job={selectedJob} // Pass the selected job for editing, null for adding
        clearFormOnAdd={true} // Clear the form on add job
      />

      {/* Display job listings as cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg p-4">
              {/* User Profile Picture */}
              <div className="flex justify-center mb-4">
                <img
                  src={profilePicture || userimg} // Display profile picture
                  alt={`${firstName}'s Profile`}
                  className="w-24 h-24 rounded-full border-2 border-blue-500"
                />
              </div>

              {/* Job Details */}
              <div className="text-center">
                <p className="text-md font-semibold">{firstName}</p>
                <p>Service: {job.service_id?.name || "N/A"}</p>
                <p>City: {job.city || "N/A"}</p>
                <p>Country: {job.country || "N/A"}</p>
                <p>Charges: {job.chargesPerHour || "N/A"} euro</p>
                <p>Working Date: {formatDate(job.date)}</p>
                <p>
                  Working Time: {formatTime(job.startTime)} to {formatTime(job.endTime)}
                </p>
              </div>

              {/* Edit and Remove Buttons */}
              <div className="mt-4 flex justify-around">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 py-1 px-3 rounded-lg"
                  onClick={() => handleEditJob(job)}
                >
                  Edit Job
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 py-1 px-3 rounded-lg"
                  onClick={() => handleDeleteJob(job._id)}
                >
                  Remove
                </button>
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
