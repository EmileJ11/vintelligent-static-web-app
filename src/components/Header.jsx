import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 fixed top-0 w-full z-10">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-wine-red">Vintelligent</h1>
      </nav>
    </header>
  );
};

export default Header;