// src/components/Navbar.tsx
import React from "react";
import { FaHamburger, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#FFF5E1] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2 text-[#E63946] font-bold text-xl">
          <FaHamburger className="text-yellow-400" size={28} />
          <span>StreetBites</span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-[#3D2C2E] font-medium">
          <NavLink to={'/user'}>  <li className="hover:text-[#E63946] transition">Home</li></NavLink>
        
          <NavLink to={'/user/menu'}> <li className="hover:text-[#E63946] transition">Menu</li></NavLink>
         
          <li className="hover:text-[#E63946] transition">About</li>
          <li className="hover:text-[#E63946] transition">Contact</li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="relative">
            <FaShoppingCart size={22} className="text-[#3D2C2E] hover:text-[#E63946] transition" />
            <span className="absolute -top-2 -right-2 bg-[#E63946] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </button>

          <button className="bg-[#E63946] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#F4A261] transition font-semibold">
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
