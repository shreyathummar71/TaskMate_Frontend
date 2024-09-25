import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userimg from "/src/assets/images/user.png";

const CustHeader = () => {
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Ref for dropdown menu
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.firstName) {
        setFirstName(user.firstName);
      }
      if (user.profilePicture) {
        setProfilePicture(user.profilePicture);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/"); // Navigate to the home page
  };

  const navigateToAccount = () => {
    setDropdownOpen(false); // Close dropdown
    navigate("/customerDashboard/myaccount"); // Navigate to My Account page
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="sticky top-0 z-50 bg-tertiary p-2 flex justify-between items-center">
      <div>
        <Link to="/customerDashboard" className="text-3xl font-tertiary mt-2">
          <span className="text-primary">TasK</span>
          <span className="text-secondary">Mate</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4 relative">
        {firstName && (
          <span className="text-primary font-primary text-md">
            Welcome
            <span className="text-secondary font-primary text-md capitalize pl-1">
              {firstName}
            </span>{" "}
          </span>
        )}

        {/* Profile Picture */}
        <div onClick={toggleDropdown} className="cursor-pointer">
          <img
            src={profilePicture || userimg}
            alt={`${firstName}'s Profile`}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            ref={dropdownRef} // Attach ref to the dropdown menu
            className="absolute right-0 top-10 mt-2 bg-white rounded shadow-lg w-48"
          >
            <button
              onClick={navigateToAccount}
              className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-200"
            >
              My Account
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustHeader;
