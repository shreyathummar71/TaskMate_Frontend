const Footer = () => {
  return (
    <footer className="bg-primary text-white">
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
            <li>
              <a href="/" className="hover:text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-secondary">
                Services
              </a>
            </li>
            <li>
              <a href="/aboutus" className="hover:text-secondary">
                About Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-secondary">
                FAQ
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-secondary">
                Blogs
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-secondary">
                Help
              </a>
            </li>
            <li>
              <a href="/contactus" className="hover:text-secondary">
                Contact Us
              </a>
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
              <a href="/services/cleaning" className="hover:text-secondary">
                Cleaning
              </a>
            </li>
            <li>
              <a href="/services/handyman" className="hover:text-secondary">
                Handyman
              </a>
            </li>
            <li>
              <a href="/services/plumbing" className="hover:text-secondary">
                Plumbing
              </a>
            </li>
            <li>
              <a href="/services/electrical" className="hover:text-secondary">
                Electrical
              </a>
            </li>
            <li>
              <a href="/services/moving" className="hover:text-secondary">
                Moving Help
              </a>
            </li>
            <li>
              <a href="/services/painting" className="hover:text-secondary">
                Painting
              </a>
            </li>
            <li>
              <a
                href="/services/furniture-assembly"
                className="hover:text-secondary"
              >
                Furniture Assembly
              </a>
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
          <a href="/contactus">
            <button className="bg-tertiary font-secondary bg-opacity-50 border border-secondary text-white px-6 py-2 rounded-md hover:bg-yellow-400 hover:text-white">
              Contact US
            </button>
          </a>
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
