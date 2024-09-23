const HeroSection = () => {
  return (
    <div>
      <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-400 text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Find Trusted
            <br /> Local Service Providers!
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded">
              Get Started
            </button>
            <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Join as a Professional
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;
