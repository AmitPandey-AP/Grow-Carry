import React from "react";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/Appcontext";
import { ProductCard } from "./ProductCard";
const BestSeller = () => {
  const { navigate, products } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => {
            return <ProductCard product={product} key={index}/>;
          })}
      </div>
    </div>
  );
};

export default BestSeller;
