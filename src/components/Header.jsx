const Header = () => {
  return (
    <>
      <div className="sticky  top-0 z-50 bg-tertiary p-7 flex justify-between items-center">
        <h1 className="text-4xl font-tertiary">
          <span className="text-primary">TasK</span>
          <span className="text-secondary">Mate</span>
        </h1>
        <nav>
          <ul className="flex space-x-20">
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-primary font-primary hover:text-yellow-400"
                href="/AllCategory"
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
                className="text-primary font-primary hover:text-yellow-400 mr-7"
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
