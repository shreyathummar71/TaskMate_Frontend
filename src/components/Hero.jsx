import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleSignupCustClick = () => {
    navigate("/customer/signup");
  };
  const handleSignupProfClick = () => {
    navigate("/signupProf");
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
        <div className="relative z-20 flex items-center justify-start h-full ">
          <div className=" text-left text-white">
            <p className="text-4xl font-semibold font-primary mb-7 mt-20">
              Find <span className="text-secondary">Trusted</span>
            </p>
            <p className="text-3xl font-semibold font-primary mb-12">
              Local Service Providers!
            </p>
            <div className="flex space-x-4 mt-5">
              <button
                className="bg-tertiary  bg-opacity-50 border border-secondary font-secondary font-semibold text-white  py-2 px-6 rounded-xl shadow-lg mb-8 inline-flex items-center"
                onClick={handleSignupCustClick}
              >
                <span class="mr-2 text-xl">Get Started</span>
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
              <button
                className="bg-tertiary  bg-opacity-50 border  border-secondary font-secondary font-semibold text-white  py-2 px-6 rounded-xl shadow-lg text-xl"
                onClick={handleSignupProfClick}
              >
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
