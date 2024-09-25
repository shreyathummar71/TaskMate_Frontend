import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header"; // Default Header
import CustHeader from "./customer/CustHeader"; // Customer-specific Header
import ProfHeader from "./professional/ProfHeader"; // Professional-specific Header
import Footer from "./Footer"; // Default Footer
import CustFooter from "./customer/CustFooter"; // Customer-specific Footer
import ProfFooter from "./professional/ProfFooter"; // Professional-specific Footer

const MainLayout = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if the current route is an auth route (login/signup pages)
  const isAuthRoute =
    location.pathname === "/signupCust" ||
    location.pathname === "/loginCust" ||
    location.pathname === "/signupProf" ||
    location.pathname === "/loginProf";

  // Check if user is a customer or professional
  const isCustomer = user && user.user === "customer";
  const isProfessional = user && user.user === "professional";

  // Check if the user is authenticated
  const isAuthenticated = isCustomer || isProfessional;

  return (
    <>
      {/* Render appropriate Header: Default on landing page, custom after login */}
      {!isAuthRoute &&
        (isAuthenticated ? (
          isCustomer ? (
            <CustHeader />
          ) : (
            <ProfHeader />
          )
        ) : (
          <Header />
        ))}

      {/* Render the content */}
      <Outlet />

      {/* Render appropriate Footer: Default on landing page, custom after login */}
      {!isAuthRoute &&
        (isAuthenticated ? (
          isCustomer ? (
            <CustFooter />
          ) : (
            <ProfFooter />
          )
        ) : (
          <Footer />
        ))}
    </>
  );
};

export default MainLayout;
