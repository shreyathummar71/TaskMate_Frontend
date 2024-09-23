const Header = () => {
  return (
    <>
      <div className="bg-tertiary p-4 flex justify-between items-center">
        <h1 className=" font-primary text-2xl font-bold">
          <span className="text-primary">Task</span>
          <span className="text-secondary">Mate</span>
        </h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="/Home"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="/services"
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="/aboutus"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="/faq"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="/blogs"
              >
                Blogs
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
