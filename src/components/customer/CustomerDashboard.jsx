import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import CustAllCategory from "./CustAllCategory";
import CustMyBooking from "./CustMyBooking";
import CustFavorites from "./CustFavorites";
import FAQCustomer from "./FAQCustomer";
import CustHelpCenter from "./CustHelpCenter";
import custdashboard from "/src/assets/images/custdashboard.png";
import userimg from "/src/assets/images/user.png";
import buttonArrow from "/src/assets/images/buttonArrow.png";
import CustSchedule from "./CustSchedule";

const CustomerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("bookService");
  const [profilePicture, setProfilePicture] = useState("");
  const [serviceId, setServiceId] = useState(null); // State to hold selected service ID
  const [cust_Id, setCust_Id] = useState(null); // Define state for custId
  const mainContentRef = useRef(null);
  const bookServiceRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.profileImage) {
      setProfilePicture(user.profileImage);
    }
  }, []);

  const scrollToBookService = () => {
    if (bookServiceRef.current) {
      bookServiceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle "Find Professional" navigation
  const handleFindProfessionalClick = (serviceId) => {
    setActiveMenu("find-professional"); // Set the active menu to "Find Professional"
    setServiceId(serviceId); // Pass the service ID
    navigate("/find-professional/findProfessional"); // Programmatically navigate to the route
  };

  return (
    <>
      <div className="relative">
        {/* Dashboard Image and Welcome Section */}
        <img
          src={custdashboard}
          alt="category hero section"
          className="w-full object-cover"
          style={{ height: "600px" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex">
          <div className="w-1/3 flex justify-center items-center pl-10 animate-slideUp">
            <img
              src={profilePicture || userimg}
              alt="dashboard illustration"
              className="rounded-full w-[50%] h-auto p-3 border-2 border-secondary overflow-hidden "
            />
          </div>
          <div className="flex flex-col justify-center items-start mt-16 animate-slideUp">
            <h1 className="text-4xl font-semibold text-secondary font-primary">
              Welcome to Your Dashboard!
            </h1>
            <p className="mt-6 text-3xl text-center font-secondary">
              Manage bookings, explore services,
            </p>
            <p className="text-3xl mt-4 text-center font-secondary">
              and stay updated effortlessly.
            </p>
            <div className="flex justify-center pb-8">
              <button
                onClick={() => {
                  setActiveMenu("bookService");
                  scrollToBookService();
                }}
                className="border border-secondary bg-tertiary bg-opacity-40 font-secondary text-xl font-semibold text-white mt-7 py-2 px-6 rounded-xl shadow-lg mb-6 inline-flex items-center hover:bg-secondary"
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

      <div className="flex bg-white p-10 mb-20 mt-10">
        {/* Sidebar */}
        <div className="w-80 bg-tertiary rounded-2xl h-auto">
          <ul className="p-8 text-center text-white font-primary">
            <li
              ref={bookServiceRef}
              className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${
                activeMenu === "bookService"
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
              onClick={() => setActiveMenu("bookService")}
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
              Manage Bookings
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
          {activeMenu === "bookService" && <CustAllCategory />}
          {/* pass custId here */}
          {activeMenu === "my-bookings" && <CustMyBooking custId={cust_Id} />}
          {activeMenu === "Schedule" && <CustSchedule />}
          {activeMenu === "favorites" && <CustFavorites />}
          {activeMenu === "faq" && <FAQCustomer />}
          {activeMenu === "help-center" && <CustHelpCenter />}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
