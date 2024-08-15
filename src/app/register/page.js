"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          username,
          password,
        }),
      });

      if (res.ok) {
        // Redirect to login page after successful registration
        router.push("/login");
      } else {
        const { error } = await res.json();
        setError(error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-white-snow px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-lg font-poppins">
        <div className="flex justify-center mb-4 ">
          <div className="text-blue-500 text-2xl font-semibold">
            <span className="text-gray-800">Dashboard </span>
            <span className="text-blue-500">Kit</span>
          </div>
        </div>
        <h2 className="text-xl font-medium mb-4 text-center ">
          Register to Ganapatih Blog
        </h2>
        <form onSubmit={register} >
          <div className="mb-4 ">
            <label
              htmlFor="email"
              value="email"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              required value={email} onChange={(e) => setEmail(e.target.value)}             
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email address"
            />
            {/* {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )} */}
          </div>
          <div className="mb-4 ">
            <label
              htmlFor="email"
              value="email"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              NAME
            </label>
            <input
              type="text"
              id="name"
              required value={name} onChange={(e) => setName(e.target.value)}             
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email address"
            />
            {/* {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )} */}
          </div>
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              required value={username} onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="enter your username"
            />
            {/* {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )} */}
          </div>
          <div className="mb-6  relative">
            <label
              htmlFor="password"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              PASSWORD
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              required value={password} onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </div>
            {/* {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )} */}
            
          </div>
          <div className="flex items-center justify-center ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-24 shadow-md rounded-full focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          {/* {errors.form && (
            <div className="text-center mt-4 text-red-500">
              {errors.form}
            </div>
          )} */}
          <div className="text-center mt-4 ">
            <p className="text-gray-600">
              Dont have an account?
              <a href="/register" className="text-blue-500 hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

