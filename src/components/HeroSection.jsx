const HeroSection = () => {
  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/hero_background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Overlay for better text visibility */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">
              Find <span className="text-yellow-400">Trusted</span>
              <br /> Local Service Providers!
            </h2>
            <div className="flex justify-center space-x-4">
              <button className="tertiary hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-lg">
                Get Started &raquo;
              </button>
              <button className="tertiary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-lg">
                Join as a Professional
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;
