"use client";

import Link from "next/link";
import { FaFolderOpen, FaBook } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

function Sidebar({}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        className="fixed top-4 left-4 z-[1000] text-gray-300 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>

      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 z-[999] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        style={{ width: "256px" }}
      >
        {" "}
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <div className="bg-blue-500 rounded-full p-2">
            <FaFolderOpen className="text-xl text-white" />
          </div>
          <div className="text-white text-lg font-semibold font-poppins ml-2">
            Dashboard Kit
          </div>
        </div>
        <div className="flex flex-col items-start mt-10 p-4 space-y-2 font-poppins">
          <Link
            href="/dashboard-admin"
            className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
          >
            <MdSpaceDashboard className="text-gray-300 text-xl" />
            <span className="text-gray-300 text-lg ">Home</span>
          </Link>
          <Link
            href="/admin/articles"
            className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
          >
            <FaBook className="text-gray-300 text-xl" />
            <span className="text-gray-300 text-lg ">All Articles</span>
          </Link>
          <Link
            href="/admin/user"
            className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
          >
            <FaUser className="text-gray-300 text-xl" />
            <span className="text-gray-300 text-lg ">All User</span>
          </Link>
          <Link
            href="/admin/category"
            className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
          >
            <BiSolidCategory className="text-gray-300 text-xl" />
            <span className="text-gray-300 text-lg ">All Category</span>
          </Link>
          <div className="flex flex-col items-start justify-start h-16 py-96 space-y-3 border-gray-800">
            <button
              onClick={(e) => {
                deleteCookie("token");
                deleteCookie("user");
                router.push("/login");
              }}
              href="/subscription"
              className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
            >
              <FiLogOut className="text-gray-300 text-xl" />
              <span className="text-gray-300 text-lg ">Logout</span>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-[998] lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
    </>
  );
}

export default Sidebar;
