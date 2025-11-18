import React, { useState } from "react";
import { FaHamburger, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";
import { colors } from "../constant/color";
import { LuCircleUser } from "react-icons/lu";
import { RiHistoryFill } from "react-icons/ri";
import { useCartStore } from "../store/Cart";



const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.items);
  const total = cart.reduce((sum, item)=> sum+item.quantity, 0)
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-4 flex items-center justify-between">
        
      
        <div className="flex items-center gap-2 font-bold text-2xl text-red-500">
          <FaHamburger size={28} style={{ color: colors.accent }} />
          <span>StreetBites</span>
        </div>

       
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 font-medium text-red-500">
            <li>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-[#E63946] font-semibold" : "hover:text-[#E63946]"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/menu"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-[#E63946] font-semibold" : "hover:text-[#E63946]"}`
                }
              >
                Menu
              </NavLink>
            </li>
            
          </ul>

          <NavLink to="/user/cart">
            <button className="relative">
              <FaShoppingCart size={22} className="text-[#3D2C2E]" style={{ color: colors.accent }} />
              <span className="absolute -top-2 -right-2 bg-red-500 font-bold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {total}
              </span>
            </button>
          </NavLink>

          <button className=" text-red-600 font-bold relative">
            <RiHistoryFill size={24} />
          </button>

          
        </div>

        <button className=" text-red-600 relative">
            <LuCircleUser size={32} />
          </button>

      
        <div className="md:hidden flex items-center gap-4">
          <NavLink to="/user/cart">
            <button className="relative">
              <FaShoppingCart size={22} className="text-[#3D2C2E]" style={{ color: colors.accent }} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </button>
          </NavLink>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

     
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md w-full absolute top-full left-0 z-40">
          <ul className="flex flex-col gap-4 py-4 px-6 font-medium text-red-500">
            <li>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-[#E63946] font-semibold" : "hover:text-[#E63946]"}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/menu"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-[#E63946] font-semibold" : "hover:text-[#E63946]"}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/about" className="hover:text-[#E63946] transition" onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/contact" className="hover:text-[#E63946] transition" onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
            <li>
              <button className="w-full bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition font-semibold">
                Order Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
