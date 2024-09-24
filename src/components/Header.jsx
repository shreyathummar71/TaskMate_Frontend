import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="sticky top-0 z-50 bg-tertiary p-2 flex justify-between items-center">
        {/* Home link on the TaskMate logo */}
        <Link to="/" className="text-3xl font-tertiary mt-2">
          <span className="text-primary">TasK</span>
          <span className="text-secondary">Mate</span>
        </Link>
        <nav>
          <ul className="flex space-x-20">
            <li>
              <Link className="text-primary font-primary hover:text-yellow-400" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-primary font-primary hover:text-yellow-400" to="/AllCategory">
                Services
              </Link>
            </li>
            <li>
              <Link className="text-primary font-primary hover:text-yellow-400" to="/aboutus">
                About Us
              </Link>
            </li>
            <li>
              <Link className="text-primary font-primary hover:text-yellow-400" to="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="text-primary font-primary hover:text-yellow-400 mr-7" to="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
