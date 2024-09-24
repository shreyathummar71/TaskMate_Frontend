import React from "react";

const Hero = () => {
  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('src/assets/images/hero_background.png')",
        }}
      >
        <div className="absolute inset-0 opacity-50"></div>{" "}
        {/* Overlay for better text visibility */}
        <div className="relative z-10 flex items-center justify-start h-full p-5">
          <div className=" text-left text-white">
            <p className="text-3xl font-semibold font-primary mb-4">
              Find <span className="text-secondary">Trusted</span>
            </p>
            <p className="text-2xl font-semibold font-primary mb-8">
              Local Service Providers!
            </p>

            <div className="flex space-x-4 mt-5">
              <button className="bg-tertiary border border-secondary font-secondary font-semibold text-white  py-2 px-4 rounded-2xl shadow-lg mb-6 inline-flex items-center">
                <span class="mr-2">Get Started</span>{" "}
                {/* <span className="font-bold"> &raquo;</span> */}
                <span>
                  <img
                    src="src/assets/images/buttonArrow.png"
                    alt="arrowButton"
                    width="20"
                  ></img>
                </span>
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="bg-tertiary border  border-secondary font-secondary font-semibold text-white  py-2 px-4 rounded-xl shadow-lg">
                Join as a Professional
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
