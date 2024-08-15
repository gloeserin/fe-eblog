"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

const ArticleCard = () => {
  const [articles, setArticles] = useState([]);
  const [oldArticles, setOldArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Function to truncate text
  function truncateText(text, limit) {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  }

  // Function to format date
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  // Search function
  const searchArticle = (e) => {
    e.preventDefault();
    const query = e.target.elements[0].value.toLowerCase();

    const filteredArticles = oldArticles.filter((article) => {
      const title = article.title?.toLowerCase() || "";
      const description = article.description?.toLowerCase() || "";
      const author = article.author?.toLowerCase() || "";
      return title.includes(query) || description.includes(query) || author.includes(query);
    });

    setArticles(filteredArticles);
    setSearchQuery(query);

    if (query === "") {
      setArticles(oldArticles);
      setCurrentPage(1); // Reset to the first page if search query is cleared
    }
  };

  // Fetch articles
  const getArticles = async () => {
    try {
      const response = await fetch("http://localhost:8000/article", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      const data = await response.json();
      setArticles(data);
      setOldArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section id="article" className="container mx-auto px-4 sm:px-6 md:px-8 py-10 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Articles</h2>
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2 mb-6">
        <form className="flex flex-col gap-y-2.5 relative" onSubmit={searchArticle}>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
            <input
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              type="text"
              placeholder="Search article"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-bg-secondary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-wrap gap-5">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
            <Link
              href={`/post/${article.slug}`}
              key={article.id}
              className="w-full sm:w-[48%] lg:w-[32%] xl:w-[24%] bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={`http://localhost:8000/uploads/article/${article.cover}`}
                alt={article.title}
                className="w-full object-cover h-48"
              />
              <div className="p-5">
                <h1 className="text-lg font-semibold mt-3">{article.title}</h1>
                <h2 className="text-sm text-blue-600 font-semibold mt-3">
                  {article.category.name}
                </h2>
                <p className="text-gray-500 mt-3 text-sm">
                  {truncateText(article.description, 100)}
                </p>
                <div className="flex items-center justify-between mt-5">
                  <p className="text-gray-500">{article.user.name}</p>
                  <p className="text-gray-500">{formatDate(article.createdAt)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center w-full">No articles found.</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => setCurrentPage(number)}
                  className={`px-4 py-2 rounded-lg ${
                    number === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default ArticleCard;
