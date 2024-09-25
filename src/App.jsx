import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
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
import LoginProf from "./components/professional/LoginProf";
import MyAccountProf from "./components/professional/MyAccountProf";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  console.log("USER Details", user);
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
          <Route path="/professional/signup" element={<SignupProf />} />
          <Route path="/professional/login" element={<LoginProf />} />

          <Route path="/faq" element={<FAQ />} />

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
      <RouterProvider router={router} />
    </>
  );
};

export default App;
