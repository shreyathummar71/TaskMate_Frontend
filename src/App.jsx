import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner"; // loading component
import Layout from "./components/Layout";
import MainLayout from "./components/MainLayout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AllCategory from "./components/AllCategory";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Blogs from "./components/Blogs";
import ServiceDetail from "./components/ServiceDetail";
import SignupCust from "./components/customer/SignupCust";
import SignupProf from "./components/professional/SignupProf";
import LoginCust from "./components/customer/LoginCust";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import ProfessionalDashboard from "./components/professional/ProfessionalDashboard";
import FAQ from "./pages/FAQ";
import MyAccountCust from "./components/customer/MyAccountCust";
import CustHelpByUs from "./components/customer/CustHelpByUs";
import LoginProf from "./components/professional/LoginProf";
import MyAccountProf from "./components/professional/MyAccountProf";
import CustHelpByAIInterface from "./components/customer/CustHelpByAIInterface";

const App = () => {
  const [isLoading, setIsLoading] = useState(true); //State to handle spinner
  const [user, setUser] = useState(null);

  //Spinning process while loading the app
  useEffect(() => {
    const loadApp = setTimeout(() => {
      setIsLoading(false); // Set loading to false when app is ready
    }, 600); // Simulating 3 seconds of loading time, adjust as needed

    return () => clearTimeout(loadApp); // Cleanup
  }, []);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
      if (storedUser) {
        // Check if the stored user is a customer or a professional
        if (storedUser.data && storedUser.data.user) {
          const userType = storedUser.data.user; // Assuming this contains "customer" or "professional"
          setUser({
            ...storedUser,
            role: userType === "professional" ? "professional" : "customer",
          });
        }
      }
    }
  }, [user]);

  // console.log("USER Details", user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Layout />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/allcategory" element={<AllCategory />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/blogs" element={<Blogs />} />

          {/* <Routes for Customer for login and password  */}
          <Route
            path="/customer/signup"
            element={<SignupCust setUser={setUser} />}
          />
          <Route
            path="/customer/login"
            element={<LoginCust setUser={setUser} />}
          />
          {/* <Routes for Professional for login and password  */}
          <Route
            path="/professional/signup"
            element={<SignupProf setUser={setUser} />}
          />
          <Route
            path="/professional/login"
            element={<LoginProf setUser={setUser} />}
          />

          <Route path="/faq" element={<FAQ />} />

          {/* Route for Help Center */}
          <Route path="/custHelpByUs" element={<CustHelpByUs />} />
          <Route path="/custHelpByAI" element={<CustHelpByAIInterface />} />

          {/* Protected Customer and Professional Dashboard Routes */}
          <Route path="/customerDashboard" element={<CustomerDashboard />} />
          <Route
            path="/professionalDashboard"
            element={<ProfessionalDashboard />}
          />
          <Route
            path="/customerDashboard/myaccount"
            element={<MyAccountCust />}
          />
          <Route
            path="/professionalDashboard/myaccount"
            element={<MyAccountProf />}
          />
        </Route>
      </>
    )
  );

  return (
    <>
      <div>
        {isLoading ? (
          // Show loading spinner while app is loading
          <LoadingSpinner />
        ) : (
          // Show the app with router once loading is complete
          <RouterProvider router={router} />
        )}
      </div>
    </>
  );
};

export default App;
