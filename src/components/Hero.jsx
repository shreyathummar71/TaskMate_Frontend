import React, { useState } from "react";
import SignupCust from "./customer/SignupCust";
import SignupProf from "./professional/SignupProf";

const Hero = () => {
  // Create a state variable to control whether the customer signup component should be displayed:
  const [showSignupCust, setShowSignupCust] = useState(false);

  // Create a state variable to control whether the Professional signup component should be displayed:
  const [showSignupProf, setShowSignupProf] = useState(false);

  // Create a function to handle the SignupCust button click:
  const handleSignupCustClick = () => {
    setShowSignupCust(true);
  };

  // Create a function to handle the SignupProf button click:
  const handleSignupProfClick = () => {
    setShowSignupProf(true);
  };

  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center p-7"
        style={{
          backgroundImage: "url('src/assets/images/hero_background.png')",
        }}
      >
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative z-10 flex items-center justify-start h-full p-5">
          <div className=" text-left text-white">
            <p className="text-3xl font-semibold font-primary mb-4">
              Find <span className="text-secondary">Trusted</span>
            </p>
            <p className="text-2xl font-semibold font-primary mb-8">
              Local Service Providers!
            </p>
            <div className="flex space-x-4 mt-5">
              <button
                className="bg-tertiary border border-secondary font-secondary font-semibold text-white  py-2 px-4 rounded-xl shadow-lg mb-6 inline-flex items-center"
                onClick={handleSignupCustClick}
              >
                <span class="mr-2">Get Started</span>
                <span>
                  <img
                    src="src/assets/images/buttonArrow.png"
                    alt="arrowButton"
                    width="20"
                  ></img>
                </span>
              </button>
              {showSignupCust && <SignupCust />}
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-tertiary border  border-secondary font-secondary font-semibold text-white  py-2 px-4 rounded-xl shadow-lg"
                onClick={setShowSignupProf}
              >
                Join as a Professional
              </button>
              {showSignupProf && <SignupProf />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
