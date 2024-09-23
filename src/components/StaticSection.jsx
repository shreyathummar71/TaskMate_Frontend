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
        <div className="w-1/2 flex flex-col justify-center p-14 my-32">
          <h2 className="text-3xl font-bold font-primary text-white ">
            Your Happiness
          </h2>
          <h2 className="text-3xl pb-10 pt-5 font-bold font-primary text-secondary">
            Guaranteed
          </h2>
          <p className="mt-2 text-white font-secondary">
            Your happiness is our goal. If you’re not happy, we’ll work to make
            it right. Our friendly customer service agents are available 24
            hours a day, 7 days a week. The Handy Happiness Guarantee only
            applies when you book and pay for a service directly through the
            Handy platform.
          </p>
        </div>
      </div>
      <div className="section-2 bg-tertiary float-start w-full px-20 py-7">
        <div className="text-3xl text-white text-center font-primary py-4">
          How <span className="text-primary">Task</span>
          <span className="text-secondary">Mate</span> Works
        </div>
        <div className="flex items-center justify-center text-center">
          <div>
            <div className="flex items-center justify-center text-center">
              <img
                src={calender} // Use curly braces for the variable
                alt="calender"
              />
            </div>
            <div className="text-primary font-primary py-3">Pick a time</div>
            <p className="text-white font-secondary w-[50%] float-none m-auto">
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
            <div className="text-primary font-primary py-3">Book instantly</div>
            <p className="text-white font-secondary w-[50%] float-none m-auto">
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
            <div className="text-primary font-primary py-3">
              Your pro arrives
            </div>
            <p className="text-white font-secondary w-[50%] float-none m-auto">
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
