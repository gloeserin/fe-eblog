"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import Link from "next/link";

const SuggestedPosts = () => {
  const [latestArticles, setLatestArticles] = useState([]);

  const getLatestArticles = async () => {
    await fetch(`http://localhost:8000/article/latest?limit=3`, {
      method: "GET",
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLatestArticles(data);
      })
      .catch((error) =>
        console.error("Error fetching latest articles:", error)
      );
  };

  useEffect(() => {
    getLatestArticles();
  }, []);

  return (
    <aside>
      <div className="bg-white shadow-lg border p-4 rounded-lg font-poppins">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Latest Articles
        </h3>
        <ul className="space-y-4">
          {latestArticles.length > 0 && latestArticles !== null ? (
            latestArticles.map((latestArticles) => (
              <li key={latestArticles.id} className="">
                <Link href={`/post/${latestArticles.slug}`} className="flex items-start">
                <img
                  src={
                    latestArticles.cover
                    ? `http://localhost:8000/uploads/article/${latestArticles.cover}`
                    : "/img3.png"
                  }
                  alt={latestArticles.title}
                  width={80}
                  height={80}
                  className="rounded-lg"
                  />
                <div className="ml-4">
                  <h4 className="text-blue-800 font-semibold">{latestArticles.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {new Date(latestArticles.createdAt).toLocaleDateString()}
                  </p>
                </div>
                  </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No articles found</li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default SuggestedPosts;
