import React, { useEffect, useState } from "react";
import useFetchFeedback from "../../utils/useFetchFeedback"; // Import the custom hook
import userImage from "/src/assets/images/user.png";

const ProfDetailPage = () => {
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Replace with the actual ID you want to fetch
  const professionalId = "66f6d6f40b98e724eaa0d724";

  // Fetch professional details
  useEffect(() => {
    const fetchProfessionalDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/professional/${professionalId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON data
        setProfessional(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionalDetails();
  }, [professionalId]);

  // Fetch feedback based on professionalId
  const feedbackUrl = `http://localhost:8081/feedback/professional/${professionalId}`;
  const {
    feedback,
    loading: feedbackLoading,
    error: feedbackError,
  } = useFetchFeedback(feedbackUrl);

  if (loading || feedbackLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!professional) {
    return <div>No professional found</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <span key={i} className="text-yellow-500 text-2xl">
            ★
          </span>
        );
      } else if (i === filledStars && halfStar) {
        stars.push(
          <span key={i} className="text-yellow-500 text-2xl">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-2xl">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  // Modal Component for Booking
  const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
      },
      phoneNumber: "",
      email: "",

      appointmentDateTime: new Date().toISOString().substring(0, 16), // Current date-time
      bookHr: new Date().getHours(), // Current hour
      isBookingForOthers: false, // New state for checkbox
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith("address.")) {
        const field = name.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [field]: value,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    const handleCheckboxChange = () => {
      setFormData((prev) => ({
        ...prev,
        isBookingForOthers: !prev.isBookingForOthers,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Only add bookingForOthers if the checkbox is checked
      const bookingData = {
        cust_id: "Your_Customer_ID", // Replace with the actual customer ID
        prof_id: professional._id, // Professional ID from fetched data
        service_id: "Your_Service_ID", // Replace with the actual service ID
        appointmentDateTime: formData.appointmentDateTime,
        bookHr: new Date(formData.appointmentDateTime).getHours(), // Set to the hour of the appointment
        addJobModel_id: "Your_AddJobModel_ID", // Replace with the actual AddJobModel ID
        status: "pending", // Default status
        // Include bookingForOthers only if the checkbox is checked
        bookingForOthers: formData.isBookingForOthers
          ? {
              name: formData.name,
              address: formData.address,
              phoneNumber: formData.phoneNumber,
              email: formData.email,
            }
          : undefined,
      };

      onSubmit(bookingData);
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-primary rounded-lg p-6 w-1/3">
          <h2 className="text-xl font-primary text-secondary text-center mb-4">
            Book Appointment
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="datetime-local"
                name="appointmentDateTime"
                value={formData.appointmentDateTime}
                onChange={handleChange}
                className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="bookHr"
                placeholder="Book Hour"
                value={formData.bookHr}
                onChange={handleChange}
                className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                required
              />
            </div>

            {/* Checkbox for Booking for Others */}
            <div className="mb-4">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isBookingForOthers}
                  onChange={handleCheckboxChange}
                />
                Book for someone else
              </label>
            </div>

            {formData.isBookingForOthers && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address.street"
                    placeholder="Street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address.city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address.state"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address.zipcode"
                    placeholder="Zipcode"
                    value={formData.address.zipcode}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
              </>
            )}

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 mr-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleBookingSubmit = async (formData) => {
    try {
      const bookingData = {
        cust_id: "Your_Customer_ID", // This needs to be valid
        prof_id: professional._id, // Ensure this is set correctly
        service_id: "Your_Service_ID", // This needs to be valid
        appointmentDateTime: formData.appointmentDateTime,
        bookHr: new Date(formData.appointmentDateTime).getHours(),
        addJobModel_id: "Your_AddJobModel_ID", // This needs to be valid
        bookingForOthers: formData.isBookingForOthers
          ? {
              name: formData.name,
              address: formData.address,
              phoneNumber: formData.phoneNumber,
              email: formData.email,
            }
          : undefined,
      };

      const response = await fetch("http://localhost:8081/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      alert("Booking confirmed!");
      handleModalClose();
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-primary py-14 flex justify-between items-center text-white px-40">
        {/* Part 1: Image */}
        <div className="text-left mb-5">
          {professional.profileImage && (
            <img
              src={professional.profileImage}
              alt={`${professional.firstName}'s profile`}
              className="rounded-full w-[150px] h-[150px] border-2 border-secondary overflow-hidden"
            />
          )}
          <p className="mt-4 text-center">
            {professional.averageRating
              ? renderStars(professional.averageRating)
              : "N/A"}
          </p>
        </div>

        {/* Part 2: Personal Information */}
        <div className="text-left mb-5 ">
          <h1 className="text-2xl font-semibold text-secondary font-primary mb-4">{`${professional.firstName} ${professional.lastName}`}</h1>
          <p className="mb-4">Email: {professional.email}</p>
          <p className="mb-4">Phone: {professional.phoneNumber}</p>
          <p className="mb-4">
            {professional.jobProfile.experience} years of experience
          </p>
        </div>

        {/* Part 3: Location and Buttons */}
        <div className="text-left mb-5">
          <div>
            <p className="text-2xl font-semibold text-secondary font-primary mb-4">
              Location:
            </p>
            <span className="float-start w-full mb-2">
              City: {professional.jobProfile.city || "Unknown"}
            </span>
            <span className="float-start w-full mb-7">
              Country: {professional.jobProfile.country || "Unknown"}
            </span>
          </div>
          <button className="bg-tertiary text-black px-4 py-2 rounded mr-5 hover:bg-secondary">
            Add to Favorite
          </button>
          <button
            onClick={handleModalOpen}
            className="bg-tertiary text-black  px-4 py-2 rounded hover:bg-secondary"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-8 px-8">
        <h2 className="text-2xl font-semibold font-primary text-primary mb-5">
          Skills
        </h2>
        <div className="flex flex-wrap justify-start mb-5">
          {professional.jobProfile.skill &&
          professional.jobProfile.skill.length > 0
            ? professional.jobProfile.skill.map((skill) => (
                <div key={skill.name} className="mr-7 text-center float-start">
                  {skill.image && (
                    <img
                      src={skill.image}
                      alt={`${skill.name} image`}
                      className="h-32 w-32 object-cover rounded-md"
                    />
                  )}
                  <span className="float-start w-full text-sm mt-2 text-primary">
                    {skill.name}
                  </span>
                </div>
              ))
            : "N/A"}
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-tertiary p-8">
        <h2 className="text-2xl font-semibold font-primary text-primary mb-5 ">
          About Me:
        </h2>
        <p className="text-md text-black font-secondary">
          {professional.aboutMe}
        </p>
      </div>

      {/* Feedback Section */}
      <div className="my-8 px-8">
        {feedbackError ? (
          <p>Error fetching feedback: {feedbackError}</p>
        ) : feedback && feedback.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedback.map((fb) => (
              <div
                key={fb._id}
                className=" text-center flex flex-col justify-between rounded-md bg-primary"
              >
                {/* Customer Profile Image */}
                <div className="items-center pb-4 text-center bg-tertiary  rounded-md">
                  <img
                    src={fb.cust_id.profileImage || userImage}
                    alt={`${fb.cust_id.firstName}'s profile`}
                    className="w-32 h-32 m-auto rounded-full"
                  />
                  <div>
                    <p className="text-sm mt-2 text-gray-700">
                      {fb.cust_id.firstName} {fb.cust_id.lastName}
                    </p>
                  </div>
                </div>

                {/* Rating Section */}
                <div className="p-5">
                  <div className="mb-2 text-center">
                    <div className="text-center">{renderStars(fb.rating)}</div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-2">
                    <p className="text-sm mt-2  text-white">{fb.reviewText}</p>
                  </div>

                  {/* Review Date */}
                  <div className=" text-right">
                    <p className="text-sm  text-white">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No feedback available.</p>
        )}
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBookingSubmit}
      />
    </>
  );
};

export default ProfDetailPage;
