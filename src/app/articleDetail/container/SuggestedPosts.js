'use client'

import React from "react";
import Image from "next/image";


const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  return (
    <aside>
            <div className="bg-white shadow-lg border p-4 rounded-lg font-poppins">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest Article</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Image src="/img3.png" alt="Latest article 1" width={80} height={80} className="rounded-lg" />
                  <div className="ml-4">
                    <h4 className="text-blue-800 font-semibold">Help children get better education</h4>
                    <p className="text-gray-600 text-sm">Jan 27, 2022</p>
                  </div>
                </li>
                {/* Add more latest articles here */}
              </ul>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">Medical</span>
                  <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">Lifestyle</span>
                  <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">Learn</span>
                  {/* Add more tags here */}
                </div>
              </div>
            </div>
          </aside>
  );
};

export default SuggestedPosts;