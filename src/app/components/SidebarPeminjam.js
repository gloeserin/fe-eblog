"use client";

import Link from "next/link";
import { FaFolderOpen, FaBook } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SidebarPeminjam() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
            href="/dashboard-user"
            className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
          >
            <MdSpaceDashboard className="text-gray-300 text-xl" />
            <span className="text-gray-300 text-lg ">Home</span>
          </Link>
          <Link
            href="/articles"
            className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
          >
            <FaBook className="text-gray-300 text-xl" />
            <span className="text-gray-300 text-lg ">Articles</span>
          </Link>
          <div className="flex flex-col items-start justify-start h-16 py-96 space-y-3 border-gray-800">
            <button
              onClick={(e) => {
                deleteCookie("token");
                deleteCookie("user");
                router.push("/login");
              }}
              className="flex items-center space-x-4 w-full p-2 rounded hover:bg-gray-800"
            >
              <FiLogOut className="text-gray-300 text-xl" />
              <span className="text-gray-300 text-lg ">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarPeminjam;
