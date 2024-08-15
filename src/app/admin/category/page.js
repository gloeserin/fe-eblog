"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { getCookie } from "cookies-next";

import AdminLayout from "../../layouts/dashboard-admin";

function CategoryTable({}) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
   getCategories();
  },[
  ]);

  const getCategories = async() => {
   await fetch("http://localhost:8000/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
  }

  function handleDelete(categoryId) {
    fetch(`http://localhost:8000/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      })
      .catch((error) => console.error("Error deleting category:", error));
  }

  return (
    <div className="relative">
      <table className="min-w-full bg-white border-gray-300 rounded-md shadow-sm">
        <thead className="bg-white border-b border-gray-300 font-poppins">
          <tr>
            <th className="p-4 text-left text-gray-600">Category</th>
            <th className="p-4 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody className="font-poppins">
                {categories.length > 0 && categories !== null ? categories.map((category) => (
                    <tr key={category.id} className="border-b border-gray-300 ">
                        <td className="p-4 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div>
                                    <h4 className="text-gray-700 font-medium">
                                        {category.name}
                                    </h4>
                                </div>
                            </div>
                        </td>
                        <td className="p-4">
                            <div className="flex flex-row gap-x-4">
                                <Link href={`/admin/category/edit/${category.id}`}>
                                    <FaEdit className="text-blue-500" />
                                </Link>
                                <button onClick={() => handleDelete(category.id)}>
                                    <MdDelete className="text-red-600" />
                                </button>
                            </div>
                        </td>
                    </tr>
                )) : 
                    <tr className="border-b border-gray-300 ">
                        <td colSpan="2" className="p-2 sm:p-4 text-center">
                            <div className="flex items-center gap-4 sm:gap-4">
                                <div>
                                    <h4 className="text-gray-700 font-medium">
                                        No Category
                                    </h4>
                                </div>
                            </div>
                        </td>
                        <td className="p-4">
                            <div className="flex flex-row gap-x-4">
                                <Link href="/admin/category/create">
                                    <FaEdit className="text-blue-500" />
                                </Link>
                            </div>
                        </td>   
                        </tr>
                    
                
                }
            </tbody>
      </table>

      
    </div>
  );
}



function App() {
  return (
    <AdminLayout>
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="bg-white border border-gray-300 rounded-md shadow-sm font-poppins">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h1 className="text-2xl font-semibold">All Articles</h1>
              <div className="flex gap-2">
              
                <Link href="/admin/category/create">
                  <button className="bg-sky-700  text-white px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
                    Create
                  </button>
                </Link>
              </div>
            </div>
            <CategoryTable  />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default App;
