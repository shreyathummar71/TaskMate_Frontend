import { useState, useEffect } from "react";
import getCustomerIdFromToken from "../../utils/tokenUtils";
import userImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/images/Back_Arrow.png";
import Dropdown from "../../assets/images/Dropdown.png";

// API URLs
const geoNamesUsername = "dhruvi.balar";
const EUROPEAN_COUNTRIES_API_URL =
  "https://restcountries.com/v3.1/region/europe";

const MyAccountProf = () => {
  const [customerId, setCustomerId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("✸✸✸✸✸✸✸✸");
  const [profileImage, setProfileImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    country: "",
    street: "",
    zipCode: "",
    city: "",
  });
  const [aboutMe, setAboutMe] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [SelectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  const [experience, setExperience] = useState("");
  const [allskills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [countryName, setCountryName] = useState("");

  const [selectedPayments, setSelectedPayments] = useState({
    bank: false,
    paypal: false,
    cash: false,
  });

  const navigate = useNavigate();

  //fetching skills

  useEffect(() => {
    fetch("http://localhost:8081/services")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming the response is an array of services
        setAllSkills(data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  // Handle skill selection
  const handleSkillChange = (event) => {
    const value = event.target.value;
    setSkillInput(value); // Set the current input value
  };

  // Add skill to selected skills
  const handleAddSkill = () => {
    if (skillInput && !selectedSkills.includes(skillInput)) {
      setSelectedSkills((prev) => [...prev, skillInput]);
      setSkillInput(""); // Clear the input field
    }
  };

  // Remove skill from selected skills
  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  //fetching countries
  useEffect(() => {
    fetch(EUROPEAN_COUNTRIES_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Extracting country names and codes from the response
        const europeanCountries = data.map((country) => ({
          countryName: country.name.common, // Use common name
          countryCode: country.cca2, // Use the two-letter country code
          geonameId: country.ccn3, // You may use any other identifier if needed
        }));

        setCountries(europeanCountries);
        console.log("European countries", europeanCountries);
      })
      .catch((error) => {
        console.error("Error fetching European countries:", error);
      });
  }, []);

  // Fetch cities when a country is selected
  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);

    const selectedCountryData = countries.find(
      (country) => country.countryCode === countryCode
    );

    if (selectedCountryData) {
      const countryName = selectedCountryData.countryName; // Get the country name
      console.log("Selected country is", countryName);

      setAddress((prev) => ({ ...prev, country: countryName }));
      setCountryName(countryName);
      setSelectedCity(""); // Reset city selection when country changes

      if (countryCode) {
        // Fetch cities based on the selected country code
        fetch(
          `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=10&username=${geoNamesUsername}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.geonames && data.geonames.length > 0) {
              setCities(data.geonames); // Set cities from the response
            } else {
              console.log("No cities found for the selected country.");
              setCities([]); // Clear cities if none are found
            }
          })
          .catch((error) => {
            console.error("Error fetching cities:", error);
          });
      }
    } else {
      console.error("Country not found for the selected code", countryCode);
    }
  };

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
            `http://localhost:8081/professional/${id}`
          );
          if (!response.ok) throw new Error("Failed to fetch user data");

          const userData = await response.json();
          console.log("Fetched user data:", userData);

          // Set state with fetched data
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setEmail(userData.email || "");
          setProfileImage(userData.profileImage || "");
          setGender(userData.gender || "");
          setPhoneNumber(userData.phoneNumber || "");

          // Ensure the address is structured correctly
          setAddress(
            userData.address || {
              street: "",
              city: "", // Assuming these properties exist
              zipCode: "", // Assuming you need to add this field
              country: "",
            }
          );

          const fetchedCountryName = userData.address?.country;

          if (fetchedCountryName) {
            // Reverse lookup: find the countryCode using countryName
            const selectedCountryData = countries.find(
              (country) => country.countryName === fetchedCountryName
            );

            if (selectedCountryData) {
              setSelectedCountry(selectedCountryData.countryCode); // Set the countryCode for dropdown
            }
          }

          // Set the city
          const fetchedCity = userData.address?.city;
          setSelectedCity(fetchedCity || "");

          setAboutMe(userData.aboutMe || "");
          setExperience(userData.experience || 0); // Assuming experience is a number
          setSkillInput(userData.skill || []); // Assuming skills is an array
          setSelectedPayments(userData.selectedPayments || ""); // Adjust based on expected type
          setSelectedCountry(userData.selectedCountry || "");
        } catch (error) {
          setError("Failed to fetch user data.");
          console.error(error); // Optionally log the error for debugging
        }
      }
    };

    fetchCustomerData();
  }, []);

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value; // Get the selected value
    console.log("Selected City", selectedCityId);
    const [cityName, adminCode] = selectedCityId.split("-"); // Split the uniqueId to get cityName

    console.log(
      "Selected city:",
      cityName,
      "from state with admin code:",
      adminCode
    );

    setSelectedCity(cityName);
    setAddress((prev) => ({ ...prev, city: cityName }));
    console.log("Selected city final", cityName);
  };

  //handle payment checkboxes

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPayments((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

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

  // Convert selectedPayments object into an array of selected payment options
  const paymentOptionArray = Object.keys(selectedPayments).filter(
    (key) => selectedPayments[key] === true
  );

  const submitData = async (base64Image) => {
    const userData = {
      firstName,
      lastName,
      gender,
      email,
      // password,
      phoneNumber,
      address: address,
      aboutMe,
      profileImage: base64Image, // Include Base64 image string
      jobProfile: {
        perHrCharge: 50, // Static
        completedHrs: 100, // Static
        experience: experience, // Dynamic value
        skill: skillInput,
        country: countryName,
        city: SelectedCity,
        paymentOption: paymentOptionArray,
      },
    };

    try {
      console.log("before submitting", userData);
      const response = await fetch(
        `http://localhost:8081/professional/${customerId}`,
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
    setExperience("");
    setAllSkills("");
    setSelectedPayments("");
    setSelectedCountry("");
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
    <div className="relative flex justify-start items-center min-h-screen bg-primary py-16 mb-28">
      <div className="flex flex-col w-96 items-center -mt-80 -mx-12 h-screen">
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
                      className="w-5 h-4 absolute right-2 mr-2"
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
                    className="box-border  text-center mt-2 w-[331px] h-[45px] left-[392px] top-[224px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
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
                {/* <div className="flex flex-col w-full font-primary"> */}

                <div className="flex flex-col w-full font-primary">
                  <label className="text-white -py-1" htmlFor="country">
                    Country
                  </label>
                  <div className="flex items-center gap-2 relative">
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="box-border text-center mt-2 w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white focus:ring-2 focus:ring-[#F7D552] appearance-none"
                      aria-label="Country selection"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option
                          key={country.geonameId}
                          value={country.countryCode}
                        >
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                    {/* Drop down icon*/}

                    <img
                      src={Dropdown}
                      alt="Dropdown"
                      className="w-5 h-4 absolute right-2 mr-2 cursor-pointer"
                      onClick={() => {
                        const selectElement =
                          document.getElementById("country");
                        selectElement.focus();
                        selectElement.click(); // Attempt to simulate click
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full font-primary">
                  <label className="text-white -py-1" htmlFor="city">
                    City
                  </label>
                  <div className="flex items-center gap-2 relative">
                    <select
                      id="city"
                      value={SelectedCity}
                      onChange={handleCityChange}
                      className="box-border text-center mt-2 w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white focus:ring-2 focus:ring-[#F7D552] appearance-none"
                      disabled={!selectedCountry}
                      aria-label="City selection"
                    >
                      <option value="">Select City</option>
                      {selectedCountry && cities.length > 0 ? (
                        cities.map((city) => (
                          <option key={city.geonameId} value={city.name}>
                            {city.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No cities available</option>
                      )}
                    </select>
                    {/* Drop down icon*/}

                    <img
                      src={Dropdown}
                      alt="Dropdown"
                      className="w-5 h-4 absolute right-2 mr-2 cursor-pointer"
                      onClick={() => {
                        const selectElement = document.getElementById("city");
                        selectElement.focus();
                        selectElement.click(); // Attempt to simulate click
                      }}
                    />
                  </div>
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
                  className="box-border p-3 mt-2 w-[1007px] h-[345px] left-[392px] top-[190px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white"
                  rows="4"
                />
              </div>

              {/* Job Profile Section */}
              <label
                className="text-primary font-primary -my-12 -mt-32 text-xl"
                htmlFor="address"
              >
                Job Profile
              </label>
              <div className="flex space-x-4">
                <div className="flex flex-col w-2/4">
                  {" "}
                  {/* Set width to 1/4 for Experience */}
                  <label
                    className="text-white font-primary mt-4"
                    htmlFor="experience"
                  >
                    Experience
                  </label>
                  <input
                    type="text"
                    id="experience"
                    value={experience}
                    onChange={(e) => {
                      setExperience(e.target.value);
                    }}
                    required
                    className="box-border text-center mt-2 text-white w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px]"
                  />
                </div>
                <div className="flex flex-col w-3/4 font-primary">
                  {" "}
                  {/* Set width to 3/4 for Skills */}
                  <label className="text-white mt-4 " htmlFor="skill">
                    Skills
                  </label>
                  <div className="flex items-center gap-2 relative">
                    <select
                      id="skills"
                      value={skillInput}
                      onChange={handleSkillChange}
                      onBlur={handleAddSkill} // Optional: Add skill when the select loses focus
                      className="box-border text-center mt-2 w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white focus:ring-2 focus:ring-[#F7D552] appearance-none"
                    >
                      <option value="">Select Skill</option>
                      {Array.isArray(allskills) &&
                        allskills.map((skill, index) => (
                          <option key={index} value={skill.name}>
                            {skill.name}
                          </option>
                        ))}
                    </select>
                    {/* Dropdown icon */}
                    <img
                      src={Dropdown}
                      alt="Dropdown"
                      className="w-5 h-4 absolute right-2 mr-2 cursor-pointer"
                      onClick={() => document.getElementById("skills").focus()}
                    />
                  </div>
                  {/* Button to add skill */}
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="mt-2 bg-[#F7D552] text-black rounded-[10px] h-[45px]"
                  >
                    Add Skill
                  </button>
                  {/* Display selected skills */}
                  <div className="mt-2">
                    <label
                      className="text-white mt-4"
                      htmlFor="selected-skills"
                    >
                      Selected Skills
                    </label>
                    <input
                      type="text"
                      id="selected-skills"
                      value={selectedSkills.join(", ")} // Join selected skills for display
                      readOnly
                      className="box-border mt-2 w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] rounded-[10px] text-white text-center"
                    />
                  </div>
                  {/* Display selected skills with remove option */}
                  <div className="mt-2">
                    {selectedSkills.map((skill) => (
                      <span key={skill} className="text-white mr-2">
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-red-500"
                        >
                          &times; {/* X mark to remove skill */}
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label
                  className="text-white mt-4 font-primary"
                  htmlFor="payment-methods"
                >
                  Payment Options
                </label>
                <div className="flex gap-2 mt-2">
                  {/* Bank */}
                  <div className="flex items-center w-1/3 relative peer">
                    <input
                      type="checkbox"
                      id="bank"
                      name="bank"
                      checked={selectedPayments.bank}
                      onChange={handleCheckboxChange}
                      className="appearance-none h-5 w-5 border mx-2 border-secondary rounded-sm checked:bg-yellow-500 checked:border-[#F7D552] cursor-pointer absolute z-10"
                    />
                    <label
                      htmlFor="bank"
                      className={`box-border text-center w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white flex items-center justify-center cursor-pointer peer-checked:bg-[#F7D552] peer-checked:text-black`}
                    >
                      {/* Show tick mark when checked */}
                      {selectedPayments.bank && (
                        <span className="text-secondary text-lg font-bold mr-2">
                          ✓
                        </span>
                      )}
                      Bank
                    </label>
                  </div>

                  {/* PayPal */}
                  <div className="flex items-center w-1/3 relative peer">
                    <input
                      type="checkbox"
                      id="paypal"
                      name="paypal"
                      checked={selectedPayments.paypal}
                      onChange={handleCheckboxChange}
                      className="appearance-none h-5 w-5 border mx-2 border-secondary rounded-sm checked:bg-yellow-500 checked:border-[#F7D552] cursor-pointer absolute z-10"
                    />
                    <label
                      htmlFor="paypal"
                      className={`box-border text-center w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white flex items-center justify-center cursor-pointer peer-checked:bg-[#F7D552] peer-checked:text-black`}
                    >
                      {selectedPayments.paypal && (
                        <span className="text-secondary text-lg font-bold mr-2">
                          ✓
                        </span>
                      )}
                      PayPal
                    </label>
                  </div>

                  {/* Add another payment method, e.g., Credit Card */}
                  <div className="flex items-center w-1/3 relative peer">
                    <input
                      type="checkbox"
                      id="cash"
                      name="cash"
                      checked={selectedPayments.creditCard}
                      onChange={handleCheckboxChange}
                      className="appearance-none h-5 w-5 border mx-2 border-secondary rounded-sm checked:bg-yellow-500 checked:border-[#F7D552] cursor-pointer absolute z-10"
                    />
                    <label
                      htmlFor="cash"
                      className={`box-border text-center w-full h-[45px] bg-[rgba(39,51,67,0.6)] border border-[#F7D552] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-white flex items-center justify-center cursor-pointer peer-checked:bg-[#F7D552] peer-checked:text-black`}
                    >
                      {selectedPayments.cash && (
                        <span className="text-secondary text-lg font-bold mr-2">
                          ✓
                        </span>
                      )}
                      Cash
                    </label>
                  </div>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex justify-between  mt-4 gap-6 relative">
                <div>
                  <button
                    type="submit"
                    onClick={handleBackButton}
                    className=" flex text-center text-white font-primary rounded-md py-2 px-2 mx-4 transition duration-200  absolute top-2"
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

export default MyAccountProf;
