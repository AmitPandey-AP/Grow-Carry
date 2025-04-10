import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function MainBanner() {
  const pictures = [];
  for (let i = 1; i <= 7; i++) {
    pictures.push(assets[`main_banner_bg_${i}`]);
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [pictures.length]);

  return (
    <div className="relative">
      <img
        src={pictures[currentIndex]}
        alt="banner"
        className="rounded-md w-full h-100 hidden md:block transition-all duration-700 ease-in-out object-cover"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner-sm"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
          Freshness You can Trust, Savings You will Love!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            to={"/products"}
            className="group flex item-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
          >
            Shop now
            <img
              className="md:hidden transition  group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to={"/products"}
            className="text-white group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore deals
            <img
              className="transition  group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
