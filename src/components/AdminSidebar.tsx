import React, { useState } from "react";
import {
  FaBars,
  FaHamburger,
  FaClipboardList,
  FaUsers,
  FaUtensils,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white text-[#3D2C2E] border-r border-gray-200 flex flex-col transition-all duration-300 min-h-screen shadow-md`}
    >
  
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FaHamburger className="text-[#E63946]" size={24} />
          {isOpen && <span className="font-bold text-lg">StreetBites</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#3D2C2E]">
          <FaBars />
        </button>
      </div>

      <nav className="flex flex-col gap-2 p-4 mt-4 font-medium flex-1">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#FFF5E1] hover:text-[#E63946] transition"
        >
          <FaClipboardList />
          {isOpen && <span>Dashboard</span>}
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#FFF5E1] hover:text-[#E63946] transition"
        >
          <FaUtensils />
          {isOpen && <span>Menu</span>}
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#FFF5E1] hover:text-[#E63946] transition"
        >
          <FaUsers />
          {isOpen && <span>Customers</span>}
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#FFF5E1] hover:text-[#E63946] transition"
        >
          <FaClipboardList />
          {isOpen && <span>Orders</span>}
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#FFF5E1] hover:text-[#E63946] transition"
        >
          <FaCog />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>

     
      <div className="p-4 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#FFF5E1] hover:text-[#E63946] transition"
        >
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
