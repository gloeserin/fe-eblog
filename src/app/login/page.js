"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {setCookie} from 'cookies-next';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const login = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const { user, token } = data;

      // Store the token and user data in localStorage or cookies
      console.log(data)
      setCookie('token', token)
      setCookie("user", JSON.stringify(user));

      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/dashboard-admin");
      } else {
        router.push("/dashboard-user");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-snow px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-lg font-poppins">
        <div className="flex justify-center mb-4 ">
          <div className="text-blue-500 text-2xl font-semibold">
            <span className="text-gray-800">Login </span>
            <span className="text-blue-500">E-Blog</span>
          </div>
        </div>       
        <p className="text-gray-600 mb-6 text-center ">
          Enter your email and password below
        </p>
        <form onSubmit={login} >
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name='email' onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email address"
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
              name='password' onChange={(e) => setPassword(e.target.value)}
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
            <a
              href="#"
              className="inline-block align-baseline font-light text-sm text-blue-500 hover:text-blue-700 ml-2"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex items-center justify-center ">
            <button
              onClick={login}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-24 shadow-md rounded-full focus:outline-none focus:shadow-outline"
            >
              Log In
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

