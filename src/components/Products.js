import React, { useRef } from "react";
import ProductCard from "./ProductCard";

const Products = React.memo(({ products }) => {
  const ref = useRef(0);
  return (
    <div className="products">
      <h2>Render: {ref.current++}</h2>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
});

export default Products;
