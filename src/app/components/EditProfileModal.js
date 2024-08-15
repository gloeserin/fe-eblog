import { getCookie, setCookie } from "cookies-next";
import React, { useState } from "react";

const EditProfileModal = ({ closeModal }) => {
  const user = JSON.parse(getCookie("user"));
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [img, setImg] = useState();

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("img", img);
    await fetch(`http://localhost:8000/user/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCookie("user", JSON.stringify(data));
        closeModal();
      })
      .catch((error) => console.error("Error updating user:", error));
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4 font-poppins"> {/* Mengurangi padding dan mengurangi lebar maksimal */}
        <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2> {/* Mengurangi ukuran teks */}
        <div className="mt-4">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0">
            <img
              className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-bg-secondary" /* Mengurangi ukuran gambar */
              src={user.img == null ? `https://ui-avatars.com/api/?name=${user.name}` : `http://localhost:8000/uploads/${user.img}`}
              alt="Bordered avatar"
            />


            <div className="flex flex-col space-y-4 sm:ml-6"> {/* Mengurangi jarak */}
              <button
                onClick={() => document.getElementById("img").click()}
                type="button" className="py-2.5 px-6 text-sm font-medium text-indigo-100 bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900">
                Change picture
              </button>
              <input
                type="file"
                id="img"
                onChange={(e) => setImg(e.target.files[0])}
                className="hidden"
              />

            </div>
          </div>

          <div className="mt-6"> {/* Mengurangi margin atas */}
            <div className="flex flex-col space-y-3"> {/* Mengurangi jarak antar elemen */}
              <div>
                <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text" id="first_name" className=" border border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2" placeholder="Your first name" required />
              </div>

              <div>
                <label htmlFor="last_name" className="block mb-1 text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" id="last_name" className=" border border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2" placeholder="Your last name" required />
              </div>

            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="text-white bg-[#202142] hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
