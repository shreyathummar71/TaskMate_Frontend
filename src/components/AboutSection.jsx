import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="float-start w-full">
      {" "}
      <div className="text-white py-4 px-0 my-2">
        <div className="max-w-full mx-9 bg-primary p-8 rounded-2xl">
          {" "}
          <h2 className="text-2xl font-primary font-bold mb-6">About Us</h2>
          <div className="mb-8">
            <h3 className="text-xl font-bold font-primary text-secondary mb-4">
              Who We Are...
            </h3>
            <p className="text-lg font-secondary leading-relaxed">
              "TaskMate is your trusted platform for connecting customers with
              skilled local professionals for all types of home services. From
              cleaning and repairs to specialized tasks, our mission is to make
              finding reliable help easy, fast, and stress-free. We empower
              professionals with flexible job opportunities while giving
              homeowners peace of mind by ensuring top-quality service every
              time."
            </p>
          </div>
          <div className="relative">
            <h3 className="text-xl font-primary font-bold text-secondary mb-4">
              Why TaskMate?
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-lg font-primary">
              <li className="font-secondary">
                <strong>Trusted Professionals:</strong> All service providers
                are vetted and reviewed to ensure quality and reliability.
              </li>
              <li className="font-secondary">
                <strong>Easy to Use:</strong> Effortlessly book services and
                manage appointments from our user-friendly platform.
              </li>
              <li className="font-secondary">
                <strong>Support Local:</strong> By using TaskMate, you're
                supporting skilled professionals from your local community.
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              to="/aboutus"
              className="text-white hover:underline float-right font-primary underline text-right text-sm mb-5"
            >
              Learn More About Task<span className="text-secondary">Mate</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
