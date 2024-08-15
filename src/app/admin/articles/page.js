"use client";

import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getCookie } from "cookies-next";

import AdminLayout from "../../layouts/dashboard-admin";

function AdminArticleTable({ }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [articles, setArticles] = useState([]);
  const [categoryId, setCategoryId] = useState("");

 

  const getArticles = async () => {
    await fetch("http://localhost:8000/article", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }

  useEffect(() => {
    getArticles();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/article/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getArticles();
      })
      .catch((error) => console.error("Error deleting article:", error));
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }


  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full bg-white border-gray-300 rounded-md shadow-sm">
        <thead className="bg-white border-b border-gray-300 font-poppins">
          <tr>
            <th className="p-4 text-left text-gray-600">Title</th>
            <th className="p-4 text-left text-gray-600">Category</th>
            <th className="p-4 text-left text-gray-600">Cover</th>
            <th className="p-4 text-left text-gray-600">Created At</th>
            <th className="p-4 text-left text-gray-600">User</th>
            <th className="p-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="font-poppins">
          {articles.length > 0 && articles !== null ?
            articles.map((article) => (
              <tr key={article.id} className="border-b border-gray-300 ">
                <td className="p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <div>
                      <h4 className="text-gray-700 font-medium text-base md:text-lg">{article.title}</h4>
                      <p className="text-gray-500 text-sm sm:block">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <div>
                      <h4 className="ext-gray-700 font-medium text-base md:text-lg">{article.category.name}</h4>
                    </div>
                  </div>
                </td>
                <td className="p-4 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 overflow-hidden">
                    <img
                      src={`http://localhost:8000/uploads/article/${article.cover}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <h4 className="text-gray-700 font-medium md:text-lg">{formatDate(article.createdAt)}</h4>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <h4 className="text-gray-700 font-medium md:text-lg">{article.user.username}</h4>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-row gap-x-2 sm:gap-x-4 justify-center">
                  <Link href={`/admin/articles/edit/${article.id}`}>
                      <FaEdit className='cursor-pointer' />
                    </Link>
                    <MdDelete className='cursor-pointer' onClick={() => handleDelete(article.id)} />
                  </div>
                </td>
              </tr>)
            ) : <tr><td colSpan="5" className="p-4 text-center">No Articles</td></tr>
          }
        </tbody>
      </table>

      
    </div>
  );
}



function App() {


  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4">
          <div className="bg-white border border-gray-300 rounded-md shadow-sm font-poppins">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h1 className="text-xl sm:text-2xl font-semibold">All Articles</h1>
              <div className="flex gap-2">
               
                <Link href="/admin/articles/create">
                  <button className="bg-sky-700  text-white px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
                    Create
                  </button>
                </Link>
              </div>
            </div>
            <AdminArticleTable />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default App;
