"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal'; // Import your EditProfileModal component
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
const ProfileBanner = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const user = JSON.parse(getCookie("user"));


  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleEditProfileClick = () => {
    setIsModalOpen(true); // Open the modal
    closeDropdown(); // Close dropdown after clicking edit
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 sm:ml-64">      
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-white shadow-md border p-4 rounded-lg">
        <div className="font-semibold text-lg font-poppins sm:mb-0"></div>
        <div className="relative flex items-center">
          <div className="flex items-center">
            <img
              className="rounded-full w-8 h-8"
              src={user.img == null ? `https://ui-avatars.com/api/?name=${user.name}` : `http://localhost:8000/uploads/${user.img}`}
              alt="profile picture"
            />
            <span className="ml-2 font-medium text-gray-800 font-poppins">
              {user.name}
            </span>
            <button
              onClick={toggleDropdown}
              className="ml-2 focus:outline-none"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute font-poppins right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            >
              <ul>
                <li className="border-b border-gray-200">
                  <button
                    onClick={handleEditProfileClick}
                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaUserEdit className="mr-2" /> Edit Profile
                  </button>
                </li>
                <li>
                  <button

                    onClick={() => {
                      deleteCookie("user");
                      deleteCookie("token");
                      router.push("/login");
                    }}
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Render the EditProfileModal if isModalOpen is true */}
      {isModalOpen && <EditProfileModal closeModal={closeModal} />}
    </div>
  );
};

export default ProfileBanner;
