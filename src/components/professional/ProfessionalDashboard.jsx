import React, { useEffect, useState, useRef } from "react";
import ProfPinJobListing from "./ProfPinJobListing";
import ProfJobListing from "./ProfJobListing";
import ProfManageBooking from "./ProfManageBooking";
import ProfSchedule from "./ProfSchedule";
import ProfEarning from "./ProfEarning";
import FAQProfessional from "./FAQProfessional";
import ProfHelpCenter from "./ProfHelpCenter";
import userimg from "/src/assets/images/user.png";
import buttonArrow from "/src/assets/images/buttonArrow.png";
import profdashboard from "/src/assets/images/profdashboard.png";

const ProfessionalDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [profilePicture, setProfilePicture] = useState("");
  const [profId, setProfId] = useState(""); // State to hold profId

  // Ref for scrolling to the Job Listings section
  const jobListingRef = useRef(null);

  // Scroll to the Job Listings section
  const scrollToSection = () => {
    if (jobListingRef.current) {
      jobListingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.profileImage) {
        setProfilePicture(user.profileImage);
      }
      // Assuming user object contains a profId property
      if (user.profId) {
        setProfId(user.profId); // Set profId from user data
      }
    }
  }, []);

  return (
    <>
      <div className="relative">
        <img
          src={profdashboard}
          alt="category hero section"
          className="w-full object-cover"
          style={{ height: "600px" }}
        />

        <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex">
          <div className="w-1/3 flex justify-center items-center pl-10">
            <img
              src={profilePicture || userimg}
              alt="dashboard illustration"
              className="rounded-full w-[50%] h-auto p-3 border-2 border-secondary overflow-hidden"
            />
          </div>
          <div className="flex flex-col justify-center items-start mt-16">
            <h1 className="text-4xl font-semibold text-secondary font-primary">
              Welcome to Your Dashboard!
            </h1>
            <p className="mt-6 text-2xl text-center font-secondary">
              Ready to take on your next job?
            </p>
            <p className="text-2xl mt-4 text-center font-secondary">
              Manage your tasks, schedule, and earnings with ease
            </p>
            <div className="flex justify-center pb-8">
              <button
                onClick={() => {
                  setActiveMenu("JobListing");
                  scrollToSection();
                }}
                className="border border-secondary bg-tertiary bg-opacity-40 font-secondary text-xl font-semibold text-white mt-7 py-2 px-6 rounded-xl shadow-lg mb-6 inline-flex items-center"
              >
                <span className="mr-2">My Jobs</span>
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
              ref={jobListingRef}
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "JobListing"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("JobListing")}
            >
              Job Listings
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "ManageBooking"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("ManageBooking")}
            >
              Manage Booking
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "Schedule"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("Schedule")}
            >
              Schedule
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "Earnings"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("Earnings")}
            >
              Earnings
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "FAQ" ? "text-secondary" : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("FAQ")}
            >
              FAQ
            </li>
            <li
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "HelpCenter"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("HelpCenter")}
            >
              Help Center
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow pl-10 w-2/4">
          {activeMenu === "dashboard" && <ProfPinJobListing />}
          {activeMenu === "JobListing" && <ProfJobListing />}
          {activeMenu === "ManageBooking" && <ProfManageBooking />}
          {activeMenu === "Schedule" && <ProfSchedule />}
          {activeMenu === "Earnings" && <ProfEarning profId={profId} />}{" "}
          {/* Pass profId here */}
          {activeMenu === "FAQ" && <FAQProfessional />}
          {activeMenu === "HelpCenter" && <ProfHelpCenter />}
        </div>
      </div>
    </>
  );
};

export default ProfessionalDashboard;
