import { useState, useEffect } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import userImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/images/Back_Arrow.png";
import Dropdown from "../../assets/images/Dropdown.png";

const MyAccountCust = () => {
  const [customerId, setCustomerId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("✸✸✸✸✸✸✸✸");
  const [profileImage, setProfileImage] = useState(null);
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
  const [fileError, setFileError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.profileImage) {
        // Change from profilePicture to profileImage
        setProfileImage(user.profileImage); // Change here as well
      }
    }
  }, []);

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
          console.log("____", userData);

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

    // Convert profileImage to Base64 if it's not the default image
    let base64Image = null;
    if (profileImage && profileImage !== userImage) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const reader = new FileReader();

      // Read the blob as a Base64 data URL
      reader.onloadend = () => {
        base64Image = reader.result;
        console.log("Base64 image prepared:", base64Image); // Debugging log

        // Now submit the data
        submitData(base64Image);
      };
      reader.readAsDataURL(blob);
    } else {
      // If the image is the default one, just submit without image
      submitData(null);
    }
  };

  const submitData = async (base64Image) => {
    const userData = {
      firstName,
      lastName,
      gender,
      email,
      // password,
      phoneNumber,
      address,
      aboutMe,
      profileImage: base64Image, // Include Base64 image string
    };

    console.log("Submitting user data:", userData); // Debugging log

    try {
      const response = await fetch(
        `https://backend-taskmate.onrender.com/customer/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify(userData), // Send JSON body
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
    setSuccess(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 61 * 1024) {
        // Check if file size exceeds 60 KB
        setFileError("Image size should not exceed 60 KB."); // Set the error message
        return; // Exit the function early if the file is too large
      }
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result); // Update profileImage with base64 string
        };
        reader.readAsDataURL(file);
        setFileError(null);
      } else {
        setProfileImage(userImage);
        setFileError(null); // Set to default if no file
      }
    }
  };

  const handleDropdownClick = () => {
    const dropdown = document.getElementById("gender");
    if (dropdown) {
      dropdown.click();
    }
  };

  const handleBackButton = () => {
    navigate("/customerDashboard");
  };

  return (
    <div className="relative flex justify-start items-center min-h-screen bg-primary py-6 ">
      <div className="flex flex-col w-96 items-center mb-96 -mx-12 -mt-28">
        <img
          src={profileImage || userImage}
          alt="Profile"
          className="rounded-full w-52 h-52 object-cover mb-4 border-secondary border-4 p-2" // Changed mb-40 to mb-4
        />
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {/* Edit Image Button */}
        <button
          type="button"
          onClick={() => document.getElementById("profileImageInput").click()} // Opens the file input dialog
          className="bg-primary text-white font-primary rounded-md  hover:underline transition duration-200"
        >
          Edit Image
        </button>
        <h2 className="text-white text-lg font-semibold mt-7">{`${firstName} ${lastName}`}</h2>
        <p className="text-gray-400 text-center">{email}</p>
        {fileError && (
          <div className="text-red-800 text-sm font-light font-primary mt-1">
            {fileError}
          </div>
        )}
      </div>
      {/* Error Message for File Size */}

      <div className="">
        <h1 className="text-white font-primary font-bold text-2xl top-1 left-16 relative">
          My Account
        </h1>
        <div className="relative bg-[rgba(217,217,217,0.5)] rounded-3xl top-5 left-14">
          <div className="absolute  inset-0 bg-opacity-30 z-10 rounded-2xl" />
          <form
            onSubmit={handleSubmit}
            className=" rounded-2xl shadow-lg p-6 w-full h-auto relative z-20"
          >
            <div className="flex flex-col space-y-4">
              {/* First Row */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <label
                    className="text-white font-primary mt-4"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => {
                      console.log("First Name before update:", firstName); // Add console log
                      setFirstName(e.target.value);
                      console.log("First Name after update:", e.target.value); // Log after update
                    }}
                    required
                    className="box-border text-center mt-2 text-white w-[307px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] "
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-white font-primary mt-4"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="box-border text-center mt-2 w-[307px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label
                    className="text-white mt-4 font-primary"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <div className="flex items-center gap-2 relative">
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="box-border text-center mt-2 w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white focus:ring-2 focus:ring-[#F7D552] appearance-none"
                    >
                      <option value="" className="bg-tertiary">
                        Select Gender
                      </option>
                      <option value="male" className="bg-tertiary">
                        Male
                      </option>
                      <option value="female" className="bg-tertiary">
                        Female
                      </option>
                      <option value="other" className="bg-tertiary">
                        Other
                      </option>
                    </select>
                    {/* Drop down icon*/}

                    <img
                      src={Dropdown}
                      alt="Dropdown"
                      className="w-5 h-4 absolute right-1 mr-2"
                      onClick={handleDropdownClick}
                    />
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <label
                    className="text-white font-primary mt-4"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="box-border text-center mt-2  w-[307px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-white font-primary mt-4"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="box-border text-center mt-2 w-[307px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-white font-primary mt-4"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="box-border  text-center mt-2 w-[307px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>
              </div>

              {/* Third Row: Address */}
              <label
                className="text-primary font-primary -my-12 -mt-32 text-xl"
                htmlFor="address"
              >
                Address
              </label>
              <div className="flex space-x-2">
                <div className="flex flex-col w-full">
                  <label
                    className="text-white py-1 font-primary"
                    htmlFor="street"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className="box-border text-center w-[299px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-white py-1 font-primary"
                    htmlFor="zipCode"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={address.zipCode}
                    onChange={(e) =>
                      setAddress({ ...address, zipCode: e.target.value })
                    }
                    className="box-border text-center w-[209px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>
                <div className="flex flex-col w-full font-primary">
                  <label className="text-white py-1" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="box-border text-center w-[209px] h-[45px] left-[392px] top-[190px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-white font-primary py-1 "
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="box-border text-center w-[209px] h-[45px] left-[392px] top-[190px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  />
                </div>
              </div>

              {/* About Me Section */}
              <div className="flex flex-col w-full font-primary">
                <label
                  className="text-white font-primary mt-1"
                  htmlFor="aboutMe"
                >
                  About Me
                </label>
                <textarea
                  id="aboutMe"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="box-border p-3 mt-2 w-[951px] h-[345px] left-[392px] top-[190px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  rows="4"
                />
              </div>

              {/* Buttons Section */}
              <div className="flex justify-between  mt-4 gap-6">
                <div>
                  <button
                    type="submit"
                    onClick={handleBackButton}
                    className=" flex text-center text-white font-primary rounded-md py-2 px-2 mx-4 transition duration-200"
                  >
                    <img
                      src={BackArrow}
                      alt="Back Arrow"
                      className="mr-2  w-4 h-4"
                    />
                    Back to Dashboard
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-primary text-white font-primary rounded-md py-2 px-6  mx-4 hover:bg-tertiary transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-primary text-white font-primary rounded-md py-2 px-4  hover:bg-tertiary transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              {error && (
                <div className="text-red-800 text-lg font-extrabold  font-primary absolute -top-8 left-1/2 transform -translate-x-1/2 text-bold px-2 py-0 text-center">
                  {error}
                </div>
              )}
            </div>
            <div className="relative">
              {success && (
                <div className="text-secondary text-lg font-extrabold font-primary absolute -top-8 left-1/2 transform -translate-x-1/2 text-bold px-2 py-0 text-center">
                  {success}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccountCust;
