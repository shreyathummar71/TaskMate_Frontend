import React from "react";

const AboutUs = () => {
  return (
    <div className="main-body-container text-black">
      <div className="about-header-img bg-gray-800 text-white py-10">
        <div className="row text-center">
          <h1 className="header-text text-4xl font-bold">About Us</h1>
        </div>
      </div>

      <div className="blank-background bg-white py-10">
        <div className="row">
          <div className="max-w-5xl mx-auto">
            {/* About TaskMate Section */}
            {/* About TaskMate Section */}
            <div className="mb-8">
              <h2 className="uppercase text-2xl font-bold mb-4">
                About TaskMate
              </h2>
              <p>
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
            {/* Our Mission & Vision Section */}
            <div className="mb-8">
              <h2 className="uppercase text-2xl font-bold mb-4">
                Mission & Vision
              </h2>

              <h3 className="uppercase text-lg font-bold mb-4">Mission:</h3>
              <p>
                Our mission is to provide a seamless, reliable platform for
                customers to easily find and book home services while empowering
                local professionals with flexible work opportunities. By
                connecting individuals with skilled professionals in their area,
                we aim to enhance convenience, reduce the stress of home
                maintenance, and create lasting relationships between customers
                and trusted service providers.
              </p>

              <h3 className="uppercase text-lg font-bold mb-4">Vision:</h3>
              <p>
                Our vision is to revolutionize the way home services are
                accessed and delivered, creating a world where finding help for
                household needs is as simple as a click. We envision a
                transparent, efficient marketplace where customers can trust
                that the service they receive is top-quality, and professionals
                can thrive through opportunities to grow their business, build
                their reputation, and achieve financial independence.
              </p>
            </div>

            {/* Meet the Team Section */}
            {/* Meet the Team Section */}
            <div className="mb-8">
              <h2 className="uppercase text-2xl font-bold mb-4">
                Meet the Team
              </h2>
              <div className="flex justify-between items-center">
                {/* Each image and name wrapped in a flex container */}
                <div className="flex flex-col items-center">
                  <img
                    className="w-52 h-52 rounded-full object-cover mb-2"
                    src="../src/assets/images/shreya.jpg"
                    alt="Shreya Thummar"
                  />
                  <p className="text-center">Shreya Thummar</p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="w-52 h-52 rounded-full object-cover mb-2"
                    src="../src/assets/images/shreya.jpg"
                    alt="Anjali Grover"
                  />
                  <p className="text-center">Anjali Grover</p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="w-52 h-52 rounded-full object-cover mb-2"
                    src="../src/assets/images/shreya.jpg"
                    alt="Dhruvi Balar"
                  />
                  <p className="text-center">Dhruvi Balar</p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="w-52 h-52 rounded-full object-cover mb-2"
                    src="../src/assets/images/shreya.jpg"
                    alt="Shital Dalavi"
                  />
                  <p className="text-center">Shital Dalavi</p>
                </div>
              </div>
            </div>

            {/* Our Story Section */}
            <div className="mb-8">
              <h2 className="uppercase text-2xl font-bold mb-4">Our Story</h2>
              <p>
                TaskMate was created to solve a common problem—finding trusted
                professionals for home services quickly and easily. Our founders
                realized that busy people needed a reliable platform to connect
                with skilled professionals for tasks like cleaning and repairs.
                With TaskMate, we aim to make the process simple, secure, and
                stress-free for both customers and service providers.
              </p>
            </div>

            {/* Our Core Values Section */}
            <div className="mb-8">
              <h2 className="uppercase text-2xl font-bold mb-4">
                Our Core Values:
              </h2>
              <p>
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
