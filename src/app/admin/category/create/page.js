"use client";

import { useState } from "react";
import React from "react";
import AdminLayout from "@/app/layouts/dashboard-admin";
import Link from 'next/link'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'; //gitu bener gak

export default function Category() {
    const [name, setName] = useState("");
    const router = useRouter();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = getCookie("token")
        fetch("http://localhost:8000/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('token')}`,
          },
          body: JSON.stringify({ name }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle successful data submission
            console.log("Category created:", data);
            router.push("/admin/category");
            // Optionally, you can reset the form or update the state to reflect the new category
            setName("");
          })
          .catch((error) => console.error("Error creating category:", error)); //we dimana jadi grogi

      };

    
  return (
    <AdminLayout>
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="bg-white border border-gray-300 rounded-md shadow-sm font-plusJakarta">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h1 className="text-2xl font-semibold font-poppins">
                Create Category
              </h1>
            </div>
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-gray-900 text-sm font-medium mb-2"
                >
                  CATEGORY
                </label>
                <input
                  type="text"
                  value={name}
                  id="category"
                  onChange={(e)=>handleNameChange(e)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter the category"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
