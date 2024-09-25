import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/customer/signup" ||
    location.pathname === "/customer/login";
  return (
    <>
      {/* Only render Header and Footer if not on the auth routes */}
      {!isAuthRoute && <Header />}
      <Outlet />
      {!isAuthRoute && <Footer />}
    </>
  );
};

export default MainLayout;
