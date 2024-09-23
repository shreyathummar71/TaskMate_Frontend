import HeroSection from "./HeroSection";

const Header = () => {
  return (
    <>
      <div className="bg-tertiary p-4 flex justify-between items-center">
        <h1 className=" font-primary text-2xl font-bold">
          <span className="text-primary">Task</span>
          <span className="text-secondary">Mate</span>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="#"
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="#"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="#"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="#"
              >
                Blogs
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Hero />
      </div>
    </>
  );
};

export default Header;
