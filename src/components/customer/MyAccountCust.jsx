import React, { useState, useEffect } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";

const MyAccountCust = () => {
  const [customerId, setCustomerId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    street: "",
    zipCode: "",
    city: "",
    state: "",
  });
  const [aboutMe, setAboutMe] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch customer ID and data
  useEffect(() => {
    const fetchCustomerData = async () => {
      const id = await getCustomerIdFromToken();
      setCustomerId(id);

      if (id) {
        // Fetch existing user details from API
        try {
          const response = await fetch(
            `https://backend-taskmate.onrender.com/customer/${id}`
          );
          if (!response.ok) throw new Error("Failed to fetch user data");
          const userData = await response.json();

          // Set state with fetched data
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setEmail(userData.email || "");
          setProfileImage(userData.profileImage || "");
          setGender(userData.gender || "");
          setPhoneNumber(userData.phoneNumber || "");
          setAddress(
            userData.address || {
              street: "",
              zipCode: "",
              city: "",
              state: "",
            }
          );
          setAboutMe(userData.aboutMe || "");
        } catch (error) {
          setError("Failed to fetch user data.");
        }
      }
    };

    fetchCustomerData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const updatedData = {
      firstName,
      lastName,
      email,
      password, // You may choose to handle password differently
      profileImage,
      gender,
      phoneNumber,
      address,
      aboutMe,
    };

    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/customer/${customerId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to update details");
      } else {
        setSuccess("Details updated successfully!");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleCancel = () => {
    console.log("This is my Cancel button");
    // Resetting all fields if you want to implement reset functionality
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setProfileImage("");
    setGender("");
    setPhoneNumber("");
    setAddress({ street: "", zipCode: "", city: "", state: "" });
    setAboutMe("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full md:w-3/4 lg:w-2/3"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Side for Profile Image and Personal Details */}
          <div className="flex flex-col items-center mb-4">
            <div className="mb-4">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
              />
            </div>
            <input
              type="text"
              placeholder="Profile Image URL"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Right Side for Additional Details */}
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) =>
                  setAddress({ ...address, zipCode: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <textarea
              placeholder="About Me"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
      </form>
    </div>
  );
};

export default MyAccountCust;
