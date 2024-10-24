import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <nav className="bg-wine-red shadow-md fixed bottom-0 w-full">
      <div className="flex justify-around items-center py-2">
        <Link to="/" className="flex flex-col items-center text-white hover:text-wine-light transition-all">
          <div className="p-3 rounded-full bg-white flex items-center justify-center mb-2">
            <img src="home.png" alt="Home" className="w-6 h-6" />
          </div>
        </Link>
        <Link to="/scanner" className="flex flex-col items-center text-white hover:text-wine-light transition-all">
          <div className="p-3 rounded-full bg-white flex items-center justify-center mb-2">
            <img src="scan.png" alt="Scan" className="w-6 h-6" />
          </div>
        </Link>
        <Link to="/login" className="flex flex-col items-center text-white hover:text-wine-light transition-all">
          <div className="p-3 rounded-full bg-white flex items-center justify-center mb-2">
            <img src="logout.png" alt="Logout" className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
