"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import UserLayout from "@/app/layouts/dashboard-user";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const params = useParams();
  const router = useRouter();

  const getCategories = async () => {
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



  useEffect(() => {
    getCategories();
  }, [

  ]);

  useEffect(() => {
    const getArticle = async () => {
      await fetch(`http://localhost:8000/article/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setContent(data.content);
        })
        .catch((error) => console.error("Error fetching article:", error));
    }
    getArticle();
  }, [params.id])

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleCoverChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("category_id", categoryId);
    formData.append("cover", file);
    try {
      const res = await fetch("http://localhost:8000/article/" + params.id, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to edit article");
      }

      const data = await res.json();
      router.push("/articles")  

    } catch (error) {
      console.log('error.message', error.message)
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-center p-4">
        <div className="w-[60vw] bg-white border border-gray-300 rounded-md shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h1 className="text-2xl font-semibold">Create Articles</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.length > 0 && categories !== null ? categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )) : <option value="">No Category</option>}
            </select>
            <input
              type="file"
              onChange={handleCoverChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="mt-4 h-full bg-white">
              <QuillEditor
                value={content}
                onChange={handleEditorChange}
                modules={quillModules}
                formats={quillFormats}
                className="h-[70%] bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-sky-700 rounded-lg hover:bg-cyan-600"
            >
              Save
            </button>
            {/* {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {successMessage && (
              <div className="text-green-500">{successMessage}</div>
            )} */}
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
