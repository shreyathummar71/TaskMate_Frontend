import { Link } from "react-router-dom"; // Ensure Link is imported
import coverImage from "../../assets/images/cust_signup_cover.png";

const SignupCust = () => {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(14,14,14,0.6)]" />
        <div
          className="absolute right-40 top-1/2 w-[582px] h-[508px] rounded-[30px] p-8 z-10 translate-y-[-50%] flex flex-col justify-center items-center" // Add flexbox classes here
          style={{ backgroundColor: "rgba(183, 186, 191, 0.6)" }}
        >
          <div className="w-full max-w-md space-y-6">
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold text-primary font-primary -mt-14">
                TasK<span className="text-secondary">Mate</span>
              </h2>
            </div>
            <h2 className="text-3xl font-semibold text-white font-primary p-1">
              Signup
            </h2>
            <div className="flex justify-center max-w-full">
              <form className="space-y-4 w-full">
                {" "}
                {/* Set width to full for form */}
                <div>
                  <label className="font-primary text-primary block ">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    style={{ backgroundColor: "rgba(39, 51, 67, 0.6)" }}
                    className="w-full px-4 py-2 border  border-secondary rounded-3xl focus:outline-none " // Ensure input is full width
                  />
                </div>
                <div>
                  <label className="block text-primary font-primary">
                    Password
                  </label>
                  <input
                    type="password"
                    style={{ backgroundColor: "rgba(39, 51, 67, 0.6)" }}
                    className="w-full px-4 py-2 border  border-secondary rounded-3xl focus:outline-none" // Ensure input is full width
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-30 text-white font-primary py-2 px-4 rounded-3xl bg-primary "
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
            <p className="text-sm text-white font-primary text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-white">
                <span className="text-secondary">Log in</span> here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupCust;
