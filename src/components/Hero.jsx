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
          <div className="font-primary text-left text-white">
            <h2 className="text-2xl font-semibold font-primary mb-8">
              Find <span className="text-secondary mb-10">Trusted</span>
              <br /> Local Service Providers!
            </h2>
            <div className="flex space-x-4">
              <button className="bg-tertiary border border-secondary  text-white font-bold py-2 px-4 rounded-xl shadow-lg mb-6">
                Get Started &raquo;
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="bg-tertiary border  border-secondary text-white font-bold py-2 px-4 rounded-xl shadow-lg">
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
