import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import coverImage from "../../assets/images/cust_login_cover.png";
import HomeIcon from "../../assets/images/HomeIcon.png";

const LoginCust = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Indicates the loading state after login
  const navigate = useNavigate();

  // Effect to handle navigation after loading
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        navigate("/customer/dashboard");
      }, 3000); // Wait for 3 seconds before navigating

      // Cleanup the timer when component unmounts or loading state changes
      return () => clearTimeout(timer);
    }
  }, [loading, navigate]); // Only re-run this effect if 'loading' or 'navigate' changes

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://backend-taskmate.onrender.com/customer/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      data.user = "customer";
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
      setEmail(""); // Clear email
<<<<<<< HEAD
      setPassword(""); // Clear password
      setLoading(true); // Trigger loading state (shows overlay and triggers navigation)
=======
      setPassword(""); // Clear
      clearMessages();
      navigate("/customerDashboard");
>>>>>>> main
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Cover Image */}
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(14,14,14,0.6)]" />

        {/* Home Icon */}
        <button
          onClick={handleHomeClick} // Attach  Home click handler
          className="absolute top-16 left-16 flex items-center text-white focus:outline-none"
        >
          <img
            src={HomeIcon}
            alt="Home Icon"
            className=" w-12 h-12 mr-2" // Adjust size as needed
          />
        </button>

        {/* Form Section */}
        <div
          className="absolute right-40 top-1/2 w-[582px] h-[508px] rounded-[30px] p-8 z-10 translate-y-[-50%] flex flex-col justify-center items-center"
          style={{ backgroundColor: "rgba(183, 186, 191, 0.6)" }}
        >
          <div className="w-full max-w-md space-y-6">
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold text-primary font-primary mt-6">
                TasK<span className="text-secondary">Mate</span>
              </h2>
            </div>
            <h2 className="text-3xl font-semibold text-white font-primary p-1">
              Login
            </h2>

            {/* Login Form */}
            <div className="flex justify-center max-w-full">
              <form onSubmit={submitHandler} className="space-y-4 w-full">
                <div>
                  <label className="font-primary text-primary block">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    style={{ backgroundColor: "rgba(39, 51, 67, 0.6)" }}
                    className="w-full px-4 py-2 border text-white font-secondary border-secondary rounded-3xl focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="block text-primary font-primary">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: "rgba(39, 51, 67, 0.6)" }}
                    className="w-full px-4 py-2 border text-white font-secondary border-secondary rounded-3xl focus:outline-none"
                  />
                  {/* Font Awesome Eye Icon */}
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0  top-5  right-4 flex items-center cursor-pointer text-white"
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye" : "fas fa-eye-slash"
                      }
                    ></i>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-30 text-white font-primary py-2 px-4 rounded-3xl bg-primary hover:bg-secondary"
                  >
                    Login
                  </button>
                </div>
                {/* Display Error msg */}
                <div className="relative">
                  {error && (
                    <div className="text-red-800  font-primary absolute top-0 left-1/2 transform -translate-x-1/2 text-bold px-2 py-0 text-center">
                      {error}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <p className="text-sm text-white font-primary text-center pt-7">
              Don't have an account?{" "}
              <Link to="/customer/signup" className="text-white">
                <span className="text-secondary">Signup</span> here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Loading Overlay (Full Screen) */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="80px"
            height="80px"
            viewBox="0 0 128 128"
            xml:space="preserve"
          >
            <rect x="0" y="0" width="100%" height="100%" fill="#171D22" />
            <g>
              <path
                d="M76.34 52.05l-43.6-43.6a63.42 63.42 0 0 1 29.7-8.2zm4.2 7.7L64.64.2A63.32 63.32 0 0 1 94.44 8zm-.08 8.86l16-59.5a63.32 63.32 0 0 1 21.94 21.6zm-4.5 7.6l43.62-43.5a63.32 63.32 0 0 1 8.17 29.7zm-7.7 4.4l59.56-15.9a63.32 63.32 0 0 1-7.78 29.8zm-8.86-.1l59.56 16a63.32 63.32 0 0 1-21.66 22zM51.8 76l43.58 43.63a63.32 63.32 0 0 1-29.72 8.17zm-4.36-7.7l15.92 59.6a63.32 63.32 0 0 1-29.82-7.8zm.1-8.83l-16 59.55A63.3 63.3 0 0 1 9.6 97.3zm4.5-7.62L8.44 95.4a63.32 63.32 0 0 1-8.2-29.72zm7.7-4.33L.16 63.36a63.32 63.32 0 0 1 7.8-29.8zm8.85.1L9 31.56A63.32 63.32 0 0 1 30.68 9.6z"
                fill="#e4d804"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 64 64"
                to="30 64 64"
                dur="500ms"
                repeatCount="indefinite"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

export default LoginCust;
