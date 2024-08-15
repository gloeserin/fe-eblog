import React from "react";
import Image from "next/image";
import Search from "./Search";

const Hero = () => {
  return (
    <section id="home" className="container mx-auto flex flex-col items-center px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2 font-poppins">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most interesting articles
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
        Stay ahead of the curve with our curated selection of the most compelling articles. <br/>
        Our e-blog brings you the latest industry trends, expert opinions, and thought-provoking <br/>
        discussions that are shaping the future.
        </p>
        
      </div>
      <div className="hidden lg:block lg:w-1/2 lg:mt-0">
        <img
          className="w-full"
          src="/hero.png"
          alt="users are reading articles"
          width={600}
          height={400}
        />
      </div>
    </section>
  );
};

export default Hero;
