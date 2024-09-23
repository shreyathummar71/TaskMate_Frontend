import React from "react";

const Hero = () => {
  return (
    <div>
      {" "}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/hero_background.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Overlay for better text visibility */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="font-primary text-left text-white">
            <h2 className="text-2xl font-semibold font-primary mb-4">
              Find <span className="text-yellow-400">Trusted</span>
              <br /> Local Service Providers!
            </h2>
            <div className="flex justify-center space-x-4 gap-2">
              <button className="bg-tertiary  text-white font-bold py-2 px-4 rounded-xl shadow-lg">
                Get Started &raquo;
              </button>
              <button className="bg-tertiary  text-white font-bold py-2 px-4 rounded-xl shadow-lg">
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
