import React, { useEffect, useState } from "react";
import Product from "../product/Product.jsx";
import ProductSkeleton from "../product/ProductSkeleton.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://dummyjson.com/products?limit=100&skip=0"
      );
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {isLoading
        ? Array.from({ length: 100 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        : products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
    </div>
  );
};

export default Products;
