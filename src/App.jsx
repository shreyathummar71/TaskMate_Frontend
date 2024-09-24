import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import MainLayout from "./components/MainLayout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AllCategory from "./components/AllCategory";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Blogs from "./components/Blogs";
import ServiceDetail from "./components/ServiceDetail";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Layout />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/allcategory" element={<AllCategory />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/blogs" element={Blogs} />
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
