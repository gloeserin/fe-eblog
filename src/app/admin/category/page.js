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

      <div className="flex flex-row items-end justify-end mt-4 space-x-2">
        <div className="flex items-center justify-between w-full max-w-xs mb-2">
          <button
            className="text-gray-500 p-2 rounded-md"
            // onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage === 1}
          >
            <IoIosArrowBack className="text-gray-600 -mr-1" />{" "}
            {/* Reduced margin-right */}
          </button>
          <span className="text-gray-600 text-sm mx-1">
            {/* {indexOfFirstTicket + 1}-{Math.min(indexOfLastTicket, tickets.length)} of {tickets.length} */}
          </span>
          <button
            className="text-gray-500 p-2 rounded-md"
            // onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage === totalPages}
          >
            <IoIosArrowForward className="text-gray-600 -ml-1" />{" "}
            {/* Reduced margin-left */}
          </button>
        </div>

        <div className="flex items-center font-poppins">
          <select
            className="p-2 border rounded-md text-gray-600 mr-2"
            // value={rowsPerPage}
            // onChange={handleRowsPerPageChange}
          >
            <option value={8}>8 rows per page</option>
            <option value={16}>16 rows per page</option>
            <option value={32}>32 rows per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between mb-6 bg-white shadow-sm p-4 rounded-lg">
      <div className="font-semibold text-lg font-plusJakarta">Tickets</div>
      <div className="flex items-center">
        <div className="flex items-center mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
          </svg>
        </div>
        <div className="flex items-center mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 10a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </div>
        <div className="flex items-center">
          <img
            className="rounded-full w-8 h-8"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
          />
          <span className="ml-2 font-medium text-gray-800">
            Jones Ferdinand
          </span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  return (
    //ke layout terus flex-gorw nya hapus
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
