"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white">
      <header className="container mx-auto px-5 flex justify-between py-5 items-center">
        <div>
          <Image src="/logoblog.png" alt="logo" width={100} height={50} />
        </div>
        <div className="flex items-center font-poppins">
          {/* Navigation links */}
          <ul
            className={`flex-col lg:flex-row lg:flex gap-x-10 absolute lg:static left-0 w-full lg:w-auto top-16 lg:top-0 bg-white lg:bg-transparent transition-all duration-300 ease-in-out ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            <li className="lg:ml-4 my-4 lg:my-0">
              <a
                href="/"
                className="block lg:inline-block hover:text-blue-500"
              >
                Home
              </a>
            </li>
            <li className="lg:ml-4 my-4 lg:my-0">
              <a
                href="#article"
                className="block lg:inline-block hover:text-blue-500"
              >
                Articles
              </a>
            </li>
            <li className="lg:ml-4 my-4 lg:my-0">
              <a
                href="#contact"
                className="block lg:inline-block hover:text-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>
          {/* Sign In Button and Hamburger Menu Icon */}
          <div className="flex items-center gap-x-4 lg:hidden">
            <div className="lg:gap-x-12">
              <Link href="/login">
                <button className="border-2 border-blue-500 px-4 py-1 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>
            <button
              onClick={toggleMenu}
              className="text-2xl text-blue-500 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {/* Sign In Button for larger screens */}
          <Link href="/login" className="hidden lg:block">
            <button className="border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 sm:ml-4 md:ml-5 lg:ml-6">
              Sign In
            </button>
          </Link>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
