import { Outlet } from "react-router-dom";
import Hero from "./Hero";
import Category from "./Category";
import StaticSection from "./StaticSection";
import Partners from "./Partners";
import Feedback from "./customer/Feedback";
import Blogs from "./Blogs";
import TaskmateBanner from "./TaskmateBanner";

const Layout = () => {
  return (
    <div>
      {/* all landingpage section/components goes here.. */}
      <Hero />
      <Category />
      <StaticSection />
      <Feedback />
      <Blogs />
      <Partners />
      <TaskmateBanner />
    </div>
  );
};

export default Layout;
