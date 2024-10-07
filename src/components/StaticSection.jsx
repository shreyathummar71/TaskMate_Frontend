import React from "react";
import happiness from "../assets/images/dad_kid.png"; //import the image
import calender from "../assets/images/calender.png";
import phone from "../assets/images/phone.png";
import pro from "../assets/images/pro.png";

const StaticSection = () => {
  return (
    <div>
      <div className="bg-primary float-start section-1">
        <div className="w-1/2 float-start">
          <img
            src={happiness} // Use curly braces for the variable
            alt="Happiness Guarantee"
            className="max-w-full w-full h-auto"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-10">
          <h2 className="text-3xl font-semibold font-primary text-white ">
            Your Happiness,
          </h2>
          <h2 className="text-3xl pb-5 pt-4 font-semibold font-primary text-secondary">
            Guaranteed
          </h2>
          <p className=" text-white font-secondary text-justify " style={{ lineHeight: '2' }}>
            Your happiness is our goal. If you’re not happy, we’ll work to make it right.
             Our friendly customer service agents are available 24 hours a day, 
             7 days a week to address any concerns, answer your questions, 
             and ensure your experience is as smooth as possible. 
             Whether it's a simple query or a more complex issue, we're always here to assist.
          </p>
          <p className=" text-white font-secondary mt-6 text-justify " style={{ lineHeight: '2' }}
          >The TaskMate Happiness Guarantee only applies when you book and pay for a service directly through the Handy platform, 
          ensuring that every service provider meets our rigorous standards.</p>
        </div>
      </div>
      <div className="section-2 bg-tertiary float-start w-full px-20 py-7">
        <div className="text-3xl text-white text-center font-primary py-4 mb-8 mt-5">
          How <span className="text-primary font-tertiary">Task</span>
          <span className="text-secondary font-tertiary">Mate</span> Works
        </div>
        <div className="flex items-center justify-center text-center mb-6">
          <div>
            <div className="flex items-center justify-center text-center">
              <img
                src={calender} // Use curly braces for the variable
                alt="calender"
              />
            </div>
            <div className="text-primary font-primary py-6">Pick a time</div>
            <p className="text-white font-secondary w-[80%] float-none m-auto">
              No more delivery windows! Select the exact day and time for your
              Furniture Assembly.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-center">
              <img
                src={phone} // Use curly braces for the variable
                alt="phone"
              />
            </div>
            <div className="text-primary font-primary py-6">Book instantly</div>
            <p className="text-white font-secondary w-[80%] float-none m-auto">
              We'll confirm your appointment and take care of payment
              electronically and securely.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center text-center">
              <img
                src={pro} // Use curly braces for the variable
                alt="professional"
              />
            </div>
            <div className="text-primary font-primary py-5">
              Your pro arrives
            </div>
            <p className="text-white font-secondary w-[80%] float-none m-auto">
              An experienced, fully-equipped professional will show up on time
              at your doorstep!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticSection;
