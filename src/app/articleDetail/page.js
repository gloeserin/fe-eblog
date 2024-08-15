"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BreadCrumbs from "../components/BreadCrumbs";
import Navbar from "../components/Navbar";
import SuggestedPosts from "./container/SuggestedPosts";
import Footer from "../components/Footer";
import CommentSection from "./container/CommentSection";

const breadCrumbsData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Articles",
    link: "/articles",
  },
  {
    name: "Article Detail",
    link: "/articles/1",
  },
];

const ArticleDetailPage = () => {
  return (
    <div>
      <Navbar />
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
          <BreadCrumbs data={breadCrumbsData} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <article className="md:col-span-2">
            <Image
              src="/img3.png"
              alt="Article image"
              width={800}
              height={450}
              className="w-full rounded-lg"
            />
            <div className="mt-6 font-poppins">
              <h2 className="text-xl text-blue-800 font-semibold">Education</h2>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                Help children get better education
              </h1>
              <p className="text-gray-600 mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi.
              </p>
              <p className="text-gray-600 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi.
              </p>
              <p className="text-gray-600 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi.
              </p>
            </div>

            <div className="mt-12 font-poppins">
              <h3 className="text-lg font-semibold text-gray-800">
                Leave a comment
              </h3>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg mt-4"
                rows="4"
                placeholder="Leave your comment here..."
              ></textarea>
              <button className="bg-blue-800 text-white px-6 py-2 rounded-lg mt-4">
                Send
              </button>
              <CommentSection />
            </div>
          </article>
          <SuggestedPosts />
        </div>
      </section>
        <Footer />
    </div>
  );
};

export default ArticleDetailPage;
