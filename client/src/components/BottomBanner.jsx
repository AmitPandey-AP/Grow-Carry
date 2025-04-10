import React, { useEffect, useState } from "react";
import { assets, features } from "../assets/assets";
import { Link } from "react-router-dom";

function BottomBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full rounded-md hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner-sm"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold mb-6">
            Why we are the Best ?
          </h1>
          {features.map((feature, index) => {
            return (
              <div key={index} className="flex items-center gap-4 mt-2">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="md:w-11 w-9"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500/70 text-xs md:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
