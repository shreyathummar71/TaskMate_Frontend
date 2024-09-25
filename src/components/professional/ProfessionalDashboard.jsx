import React, { useState } from "react";
import TopJobListing from "./profTopJobListing"
import ProfJobListing from "./ProfJobListing"
import ProfManageBooking from "./ProfManageBooking"
import ProfSchedule from "./ProfSchedule"
import ProfEarning from "./ProfEarning"
import FAQProfessional from "./FAQProfessional"
import ProfHelpCenter from "./ProfHelpCenter"

const ProfessionalDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard'); // Set default menu

  return (
    <div className="flex bg-white p-8 mb-20">
      {/* Sidebar */}
      <div className="w-80 bg-tertiary rounded-2xl h-auto">
        <ul className="p-8 text-center text-white font-primary">
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'dashboard' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'JobListing' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('JobListing')}
          >
            Job Listings
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'ManageBooking' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('ManageBooking')}
          >
            Manage Booking
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'Schedule' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('Schedule')}
          >
            Schedule
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'Earnings' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('Earnings')}
          >
            Earnings
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'FAQ' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('FAQ')}
          >
            FAQ
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'HelpCenter' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('HelpCenter')}
          >
            Help Center
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow pl-10 w-2/4">
        {activeMenu === 'dashboard' && <TopJobListing /> }
        {activeMenu === 'JobListing' && <ProfJobListing />}
        {activeMenu === 'ManageBooking' && <ProfManageBooking />}
        {activeMenu === 'Schedule' && <ProfSchedule />}
        {activeMenu === 'Earnings' && <ProfEarning />}
        {activeMenu === 'FAQ' && <FAQProfessional />}
        {activeMenu === 'HelpCenter' && <ProfHelpCenter />}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
