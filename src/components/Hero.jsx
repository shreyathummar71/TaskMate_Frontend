import { useNavigate } from "react-router-dom";
import hero_background from "../assets/images/hero_background.png";
import buttonArrow from "../assets/images/buttonArrow.png";

const Hero = () => {
  const navigate = useNavigate();
  const handleSignupCustClick = () => {
    navigate("/customer/signup");
  };
  const handleSignupProfClick = () => {
    navigate("/professional/signup");
  };

  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center p-7"
        style={{
          backgroundImage: `url(${hero_background})`,
        }}
      >
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative z-20 flex items-center justify-start h-full animate-slideUp ">
          <div className=" text-left text-white">
            <p className="text-4xl font-semibold font-primary mb-7 mt-20">
              Find <span className="text-secondary">Trusted</span>
            </p>
            <p className="text-3xl font-semibold font-primary mb-12">
              Local Service Providers!
            </p>
            <div className="flex space-x-4 mt-5">
              <button
                className="bg-tertiary  bg-opacity-50 border border-secondary font-secondary font-semibold text-white  py-2 px-6 rounded-xl shadow-lg mb-8 inline-flex items-center hover:bg-secondary"
                onClick={handleSignupCustClick}
              >
                <span className="mr-2 text-xl ">Get Started</span>
                <span>
                  <img src={buttonArrow} alt="arrowButton" width="20"></img>
                </span>
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-tertiary  bg-opacity-50 border  border-secondary font-secondary font-semibold text-white  py-2 px-6 rounded-xl shadow-lg text-xl hover:bg-secondary"
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
