import React from 'react';
import { HandIcon } from '../constants';

const Header = () => {
  return (
    <header className="bg-[#192a4d] text-white flex items-center justify-between p-4 shadow-md z-20">
      <div className="flex items-center space-x-3">
        <HandIcon className="w-8 h-8 text-[#00b8d4]" />
        <h1 className="text-2xl font-bold">SignLink</h1>
      </div>
      <div>
        <button className="text-white focus:outline-none">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;