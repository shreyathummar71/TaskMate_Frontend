import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CustFooter = () => {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    navigate(`/customerDashboard?section=${section}`);
  };

  return (
    <footer className="bg-primary text-white">
      <div className="bg-tertiary text-center py-7">
        <h1 className="text-4xl font-tertiary">
          <span className="text-primary">TasK</span>
          <span className="text-secondary">Mate</span>
        </h1>
        <p className="text-white font-secondary text-xl mt-3 ">
          TaskMate makes finding trusted home service professionals simple and fast.
          <br />
          From cleaning to repairs, we've got you covered with quality, reliable service every time.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
        {/* Column 1 */}
        <div className="ml-4">
          <h3 className="font-primary mb-4 text-lg">
            Task
            <span className="text-secondary hover:text-yellow-400 cursor-pointer">
              Mate
            </span>{" "}
            Happiness Guarantee
          </h3>
          <ul className="space-y-3 font-secondary text-sm">
          <li onClick={() => handleNavigation("bookService")}>
              <span className="hover:text-secondary cursor-pointer">Dashboard</span>
            </li>
            <li onClick={() => handleNavigation("my-bookings")}>
              <span className="hover:text-secondary cursor-pointer">Manage Booking</span>
            </li>
            <li onClick={() => handleNavigation("Schedule")}>
              <span className="hover:text-secondary cursor-pointer">My Booking</span>
            </li>
            <li onClick={() => handleNavigation("bookService")}>
              <span className="hover:text-secondary cursor-pointer">Services</span>
            </li>
            <li onClick={() => handleNavigation("faq")}>
              <span className="hover:text-secondary cursor-pointer">FAQ</span>
            </li>
            <li onClick={() => handleNavigation("help-center")}>
              <span className="hover:text-secondary cursor-pointer">Help Center</span>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="ml-8 mt-2">
          <h3 className="text-secondary font-primary mb-4 text-sm">
            POPULAR SERVICES
          </h3>
          <ul className="space-y-3 font-secondary text-sm">
            <li>
              <Link to="/services/66f2cd0de6226da9aeec3043" className="hover:text-secondary">
                Cleaning
              </Link>
            </li>
            <li>
              <Link to="/services/66f29dd0eec19273c999fedf" className="hover:text-secondary">
              Leaky Faucet Repair
              </Link>
            </li>
            <li>
              <Link to="/services/66fe9e8e0d7973a259d61276" className="hover:text-secondary">
              Appliance Repairs
              </Link>
            </li>
            <li>
              <Link to="/services/66fea1f90d7973a259d6127c" className="hover:text-secondary">
                Moving Help
              </Link>
            </li>
            <li>
              <Link to="/services/66f2d266e6226da9aeec305b" className="hover:text-secondary">
              Interior Wall Painting
              </Link>
            </li>
            <li>
              <Link to="/services/66fe962b0d7973a259d6125e"className="hover:text-secondary">
                Furniture Assembly
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="ml-8">
          <h3 className="text-secondary font-primary mb-4 text-lg">Location</h3>
          <div className="grid grid-cols-2 gap-2">
            <ul className="space-y-3 font-secondary text-sm">
              <li>Germany</li>
              <li>United Kingdom</li>
              <li>France</li>
              <li>Italy</li>
              <li>Spain</li>
              <li>Netherlands</li>
            </ul>
            <ul className="space-y-3 font-secondary text-sm">
            <li>Switzerland</li>
              <li>Sweden</li>
              <li>Belgium</li>
              <li>Austria</li>
              <li>Norway</li>
              <li>Denmark</li>
            </ul>
          </div>
        </div>

        {/* Column 4 */}
        <div className="text-center">
          <p className="font-secondary mt-8 mb-4">
            Have a question or need assistance?
            <br />
            We're here to help – get in touch with us today!
          </p>
          <Link to="/contactus">
            <button className="bg-tertiary font-secondary bg-opacity-50 border border-secondary text-white px-6 py-2 rounded-md hover:bg-yellow-400 hover:text-white">
              Contact US
            </button>
          </Link>
          <div className="flex justify-center text-3xl mt-9 space-x-10">
            <a href="#" className="hover:text-secondary">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-secondary">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-secondary">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-secondary">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-tertiary text-primary font-primary py-4 text-sm text-center">
        <p>
          Copyright © Task
          <span className="text-secondary">Mate</span>. 2024 All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};
export default CustFooter;
