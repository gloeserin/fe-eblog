"use client";

import Link from "next/link";
import React from "react";

const BreadCrumbs = ({ data }) => {
  return (
    <nav className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {data.map((item, index) => (
        <div key={index} className="text-black opacity-50 text-xs font-roboto md:text-sm">
          <Link href={item.link}>{item.name}</Link>
          {index !== data.length - 1 && <span className="px-3">/</span>}
        </div>
      ))}
    </nav>
  );
};

export default BreadCrumbs;
