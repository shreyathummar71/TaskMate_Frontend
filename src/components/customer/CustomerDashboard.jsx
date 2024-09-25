import React, {  useState } from "react";
import CustAllCategory from "./CustAllCategory";
import CustMyBooking from "./CustMyBooking";
import CustBookService from "./CustBookService";
import CustFavorites from "./CustFavorites";
import CustFAQ from "./CustMyBooking";
import CustHelpCenter from "./CustHelpCenter";


const CustomerDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard'); 


  return (
    <div className="flex bg-white p-8 mb-20">
      {/* Sidebar */}
      <div className="w-96 bg-tertiary rounded-2xl h-auto">
        <ul className="p-8 text-center text-white font-primary">
          {/* Dashboard item is always styled as active */}
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'dashboard' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'book-service' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('book-service')}
          >
            Book a Service
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'my-bookings' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('my-bookings')}
          >
            My Bookings
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'favorites' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('favorites')}
          >
            Favorites
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'faq' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('faq')}
          >
            FAQ
          </li>
          <li
            className={`cursor-pointer p-2 mb-9 rounded-xl text-16px bg-primary ${activeMenu === 'help-center' ? 'text-secondary' : 'hover:text-secondary'}`}
            onClick={() => setActiveMenu('help-center')}
          >
            Help Center
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow pl-10">
        {activeMenu === 'dashboard' &&  <CustAllCategory />}
        {activeMenu === 'book-service' && <CustBookService />}
        {activeMenu === 'my-bookings' && <CustMyBooking />}
        {activeMenu === 'favorites' && <CustFavorites />}
        {activeMenu === 'faq' && <CustFAQ />}
        {activeMenu === 'help-center' && <CustHelpCenter />}
      </div>
    </div>
  );
};

export default CustomerDashboard;


