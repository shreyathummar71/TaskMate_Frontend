import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-4 pt-7">
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
            <li>
              <Link to="/" className="hover:text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/AllCategory" className="hover:text-secondary">
                Services
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-secondary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-secondary">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-secondary">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-secondary">
                Help
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-secondary">
                Contact Us
              </Link>
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
              <Link to="/AllCategory" className="hover:text-secondary">
                Cleaning
              </Link>
            </li>
            <li>
              <Link to="/AllCategory" className="hover:text-secondary">
                Handyman
              </Link>
            </li>
            <li>
              <Link to="/AllCategory" className="hover:text-secondary">
                Plumbing
              </Link>
            </li>
            <li>
              <Link to="/AllCategory" className="hover:text-secondary">
                Electrical
              </Link>
            </li>
            <li>
              <Link to="/AllCategory" className="hover:text-secondary">
                Moving Help
              </Link>
            </li>
            <li>
              <Link to="/AllCategory" className="hover:text-secondary">
                Painting
              </Link>
            </li>
            <li>
              <Link to="/AllCategory" className="hover:text-secondary">
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
              <li>Switzerland</li>
            </ul>
            <ul className="space-y-3 font-secondary text-sm">
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
      <div className="bg-tertiary text-primary font-primary py-4 mt-8 text-sm text-center">
        <p>
          Copyright © Task
          <span className="text-yellow-400">Mate</span>. 2024 All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
