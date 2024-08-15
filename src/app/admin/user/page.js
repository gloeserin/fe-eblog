"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getCookie } from "cookies-next";

import AdminLayout from "../../layouts/dashboard-admin";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getUsers = async () => {
    await fetch("http://localhost:8000/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
     setShowPopup(true);
   };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getUsers();
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleConfirm = async(id) => {
    await switchRole(id);
     setShowPopup(false);
   };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const switchRole = async (id) => {
    await fetch(`http://localhost:8000/user/role/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getUsers();
      })
      .catch((error) => console.error("Error updating user role:", error));
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full bg-white border-gray-300 rounded-md shadow-sm">
        <thead className="bg-white border-b border-gray-300 font-poppins">
          <tr>
            <th className="p-4 text-left text-gray-600">Name</th>
            <th className="p-4 text-left text-gray-600">Username</th>
            <th className="p-4 text-left text-gray-600">Email</th>
            <th className="p-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="font-poppins">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div>
                      <h4 className="text-gray-700 font-medium">{user.name}</h4>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div>
                      <h4 className="text-gray-700 font-medium">
                        {user.username}
                      </h4>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="text-gray-700 font-medium">
                        {user.email}
                      </h4>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-row gap-x-4">
                    <button onClick={() => handleEditClick(user)}>
                      <FaEdit className="cursor-pointer" />                            
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      <MdDelete className="text-red-600 cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Apakah Anda yakin ingin membuat {selectedUser?.name} menjadi
              { selectedUser.role == "user" ? "admin?" : "user"}
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Tidak
              </button>
              <button
                onClick={()=>handleConfirm(selectedUser.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AdminLayout>
      <div className="flex flex-col p-4 space-y-4">
        <div className="bg-white border border-gray-300 rounded-md shadow-sm font-poppins">
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h1 className="text-2xl font-semibold">All User</h1>
            <div className="flex gap-2">           
              {/* Uncomment to add 'Create' button
              <Link href="/admin/articles/create">
                <button className="bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
                  Create
                </button>
              </Link>
              */}
            </div>
          </div>
          <UserTable />
        </div>
      </div>
    </AdminLayout>
  );
}

export default App;
