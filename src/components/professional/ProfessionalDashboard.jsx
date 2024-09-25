import React from "react";
import { Link } from "react-router-dom";

const ProfessionalDashboard = () => {
  return (
    <div>
      ProfessionalDashboard
      <Link to="/faqProfessional" className="text-lg font-tertiary mt-2">
        <span className="text-primary">FAQ</span>
        <span className="text-secondary">Professional</span>
      </Link>
    </div>
  );
};

export default ProfessionalDashboard;
