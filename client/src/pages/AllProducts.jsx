import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { ProductCard } from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    if (searchQuery.length) {
      setFilterProduct(
        products.filter((product) => {
          return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    } else {
      setFilterProduct(products);
    }
  }, [products, searchQuery]);
  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filterProduct
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
