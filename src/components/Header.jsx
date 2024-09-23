import HeroSection from "./HeroSection";

const Header = () => {
  return (
    <>
      <div className="tertiary p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">TaskMate</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a className="text-white hover:text-yellow-400" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="text-white hover:text-yellow-400" href="#">
                Services
              </a>
            </li>
            <li>
              <a className="text-white hover:text-yellow-400" href="#">
                About Us
              </a>
            </li>
            <li>
              <a className="text-white hover:text-yellow-400" href="#">
                FAQ
              </a>
            </li>
            <li>
              <a className="text-white hover:text-yellow-400" href="#">
                Blogs
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <HeroSection />
      </div>
    </>
  );
};

export default Header;
