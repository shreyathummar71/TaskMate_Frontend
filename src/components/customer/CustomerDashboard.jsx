import React from "react";

const CustomerDashboard = () => {
  return (
    <div>
      CustomerDashboard
      <Link to="/faqCustomer" className="text-lg font-tertiary mt-2">
        <span className="text-primary">FAQ</span>
        <span className="text-secondary">Customer</span>
      </Link>
    </div>
  );
};

export default CustomerDashboard;
