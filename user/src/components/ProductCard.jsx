import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
      <img
        src={product.image || "/placeholder.jpg"}
        alt={product.name}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-blue-600 font-bold">${product.price}</p>
      <Link
        to={`/products/${product._id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
