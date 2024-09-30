import React from "react";

// Import the images
import aboutUsImage from "../assets/images/about us.webp";
import shreyaImage from "../assets/images/team/shreya.jpg";
import dhruviImage from "../assets/images/team/dhruvi 1.png";
import anjaliImage from "../assets/images/team/anjali.png";
import shitalImage from "../assets/images/team/shital.jpg";

const AboutUs = () => {
  return (
    <div className="">
      {/* Hero Section with Background Image, Black Overlay */}
      <div
        className="relative about-header-img bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${aboutUsImage})`, // Use the imported image
          height: "600px",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Content on top of the overlay */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="header-text text-4xl font-bold">About Us</h1>
        </div>
      </div>

      {/* Content Section after Hero */}
      <div className="py-6">
        <div className="row">
          <div className="">
            {/* About TaskMate Section */}
            <div className="mb-8 pl-16 pr-16">
              <h2 className=" text-2xl text-primary mb-4 font-primary">
                About TaskMate
              </h2>
              <p className="font-secondary ml-7 text-justify mb-11">
                TaskMate is a digital marketplace designed to connect customers
                with trusted local professionals for various home services.
                Whether it's cleaning, repairs, or maintenance, our platform
                ensures that finding help for home needs is simple, secure, and
                reliable. By offering an easy-to-use booking system and a
                network of pre-screened, top-rated professionals, TaskMate takes
                the hassle out of household tasks, allowing customers to focus
                on what matters most while ensuring professionals can grow their
                businesses with flexible and rewarding opportunities.
              </p>
            </div>

            {/* Our Mission & Vision Section */}
            <div className="bg-tertiary pl-16 pr-16 pt-10 pb-10 ">
              <div className="">
                <h2 className="text-2xl mb-4 font-primary text-secondary">
                  Mission & Vision
                </h2>

                <h3 className="text-lg mb-4 font-primary text-primary">
                  Mission:
                </h3>
                <p className="font-secondary text-black  mb-6 ml-7">
                  Our mission is to provide a seamless, reliable platform for
                  customers to easily find and book home services while
                  empowering local professionals with flexible work
                  opportunities. By connecting individuals with skilled
                  professionals in their area, we aim to enhance convenience,
                  reduce the stress of home maintenance, and create lasting
                  relationships between customers and trusted service providers.
                </p>

                <h3 className="text-lg mb-4 font-primary text-primary">
                  Vision:
                </h3>
                <p className="font-secondary text-black ml-7">
                  Our vision is to revolutionize the way home services are
                  accessed and delivered, creating a world where finding help
                  for household needs is as simple as a click. We envision a
                  transparent, efficient marketplace where customers can trust
                  that the service they receive is top-quality, and
                  professionals can thrive through opportunities to grow their
                  business, build their reputation, and achieve financial
                  independence.
                </p>
              </div>
            </div>

            {/* Our Story Section */}
            <div className="pl-16 pr-16 pt-10 mb-10 ">
              <h2 className="text-2xl text-primary mb-4 font-primary">
                Our Story
              </h2>
              <p className="font-secondary ml-7 text-justify">
                TaskMate was created to solve a common problem—finding trusted
                professionals for home services quickly and easily. Our founders
                realized that busy people needed a reliable platform to connect
                with skilled professionals for tasks like cleaning and repairs.
                With TaskMate, we aim to make the process simple, secure, and
                stress-free for both customers and service providers.
              </p>
            </div>

            {/* Meet the Team Section */}
            <div className="mb-8 bg-primary pl-16 pr-16 pt-10 pb-10">
              <h2 className="text-2xl mb-10 font-primary text-secondary">
                Meet the Team
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center">
                  <img
                    className="w-60 h-60 rounded-full object-cover mb-4"
                    src={shreyaImage} // Use the imported image
                    alt="Shreya Thummar"
                  />
                  <p className="text-center font-secondary text-white text-xl">
                    Shreya Thummar
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="w-60 h-60 rounded-full object-cover mb-4"
                    src={dhruviImage} // Use the imported image
                    alt="Dhruvi Balar"
                  />
                  <p className="text-center font-secondary text-white text-xl">
                    Dhruvi Balar
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="w-60 h-60 rounded-full object-cover mb-4"
                    src={anjaliImage} // Use the imported image
                    alt="Anjali Grover"
                  />
                  <p className="text-center font-secondary text-white text-xl">
                    Anjali Grover
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="w-60 h-60 rounded-full object-cover mb-4"
                    src={shitalImage} // Use the imported image
                    alt="Shital Dalavi"
                  />
                  <p className="text-center font-secondary text-white text-xl">
                    Shital Dalavi
                  </p>
                </div>
              </div>
            </div>

            {/* Our Core Values Section */}
            <div className="mb-8 pl-16 pr-16 pt-10 pb-10">
              <h2 className="text-2xl text-primary mb-4 font-primary">
                Our Core Values:
              </h2>
              <p className="font-secondary ml-7 text-justify">
                At TaskMate, Customer Satisfaction is at the heart of everything
                we do, ensuring a seamless experience from booking to service
                completion, backed by top-rated professionals and a Happiness
                Guarantee. We prioritize Trust & Safety by rigorously vetting
                our service providers, offering secure payment systems, and
                maintaining a transparent review process, so customers can feel
                confident and secure. Through Empowerment, we give both
                customers and professionals the tools to take control—customers
                can easily book services, while service providers enjoy flexible
                scheduling and income opportunities. Finally, we foster a strong
                Community, connecting individuals in a network of trust and
                support, where professionals can grow their businesses, and
                customers can rely on a shared commitment to quality and care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
