import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustAllCategory from "./CustAllCategory";
import CustMyBooking from "./CustMyBooking";
import CustFavorites from "./CustFavorites";
import FAQCustomer from "./FAQCustomer";
import CustHelpCenter from "./CustHelpCenter";
import custdashboard from "/src/assets/images/custdashboard.png";
import userimg from "/src/assets/images/user.png";
import buttonArrow from "/src/assets/images/buttonArrow.png";

const CustomerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [profilePicture, setProfilePicture] = useState("");

  // Ref for the main content section
  const mainContentRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.profileImage) {
      setProfilePicture(user.profileImage);
    }
  }, []);

  // Scroll to the main content section
  const scrollToSection = () => {
    if (mainContentRef.current) {
      // Scroll to the ref element smoothly
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative">
        <img
          src={custdashboard}
          alt="category hero section"
          className="w-full h-auto object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex">
          <div className="w-1/3 flex justify-center items-center pl-10">
            <img
              src={profilePicture || userimg}
              alt="dashboard illustration"
              className="rounded-full w-[50%] h-auto p-3 border-2 border-secondary overflow-hidden "
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-start ">
            <h1 className="text-3xl font-semibold text-secondary font-primary">
              Welcome to Your Dashboard!
            </h1>
            <p className="mt-6 text-xl text-center font-secondary">
              Manage bookings, explore services,
            </p>
            <p className="text-xl mt-2 text-center font-secondary">
              and stay updated effortlessly.
            </p>
            <div className="flex justify-center pb-8">
              <button
                onClick={() => {
                  setActiveMenu("book-service"); // Set active menu to 'book-service'
                  scrollToSection(); // Scroll to the main content
                }}
                className="border border-secondary font-secondary font-semibold text-white mt-7 py-2 px-4 rounded-xl shadow-lg mb-6 inline-flex items-center"
              >
                <span className="mr-2">Book Now</span>
                <span>
                  <img src={buttonArrow} alt="arrowButton" width="20" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-8 border-tertiary rounded-lg"></div>

      <div className="flex bg-white p-8 mb-20">
        {/* Sidebar */}
        <div className="w-80 bg-tertiary rounded-2xl h-auto">
          <ul className="p-8 text-center text-white font-primary">
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "dashboard"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "book-service"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("book-service")}
            >
              Book a Service
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "my-bookings"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("my-bookings")}
            >
              My Bookings
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "favorites"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("favorites")}
            >
              Favorites
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "faq" ? "text-secondary" : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("faq")}
            >
              FAQ
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "help-center"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("help-center")}
            >
              Help Center
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow pl-10 w-2/4" ref={mainContentRef}>
          {activeMenu === "dashboard" && <CustAllCategory />}
          {activeMenu === "book-service" && <CustBookService />}
          {activeMenu === "my-bookings" && <CustMyBooking />}
          {activeMenu === "favorites" && <CustFavorites />}
          {activeMenu === "faq" && <FAQCustomer />}
          {activeMenu === "help-center" && <CustHelpCenter />}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
