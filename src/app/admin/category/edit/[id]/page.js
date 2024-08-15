"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/app/layouts/dashboard-admin";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from 'next/navigation';

export default function editCategory() {
  const params = useParams();
  const [category, setCategory] = useState(null)
  const router = useRouter();

  const getCategory = async () => {
    await fetch(`http://localhost:8000/category/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.name)
      })
      .catch((error) => console.error("Error fetching category:", error));
  };

  useEffect(() => {
    getCategory();

  }, []); 

  const updateCategory = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/category/${params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: category }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        router.push("/admin/category");
      })
      .catch((error) => console.error("Error updating category:", error));
  }
  return (
    <AdminLayout>
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="bg-white border border-gray-300 rounded-md shadow-sm font-plusJakarta">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h1 className="text-2xl font-semibold font-poppins">
                Edit Category
              </h1>
            </div>
            <form className="p-4" onSubmit={(e)=>updateCategory(e)}>             
              
              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-gray-900 text-sm font-medium mb-2"
                >
                  CATEGORY
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
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
