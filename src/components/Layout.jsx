import { Outlet } from "react-router-dom";
import Hero from "./Hero";
import Category from "./Category";
import StaticSection from "./StaticSection";
import Partners from "./Partners";
import Feedback from "./Feedback";
import AboutSection from "./AboutSection";
import TaskmateBanner from "./TaskmateBanner";
import Blogs_LP from "./Blogs_LP";

const Layout = () => {
  return (
    <div>
      {/* all landingpage section/components goes here.. */}
      <Hero />
      <Category />
      <StaticSection />
      <Feedback />
      <AboutSection />
      <Partners />
      <Blogs_LP />
      <TaskmateBanner />
    </div>
  );
};

export default Layout;
