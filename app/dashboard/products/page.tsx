"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/cart-context";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default function ProductsPage() {
  const { addToCart, cart } = useCart();
console.log("Cart now:", cart);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  function handleAddToCart(p: Product) {
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
    });
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="mt-4">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="mt-4 text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Products</h1>

      {/* TABLE */}
      <div className="mt-6 overflow-x-auto border rounded-md bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Image</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                <td className="px-4 py-2">{p.rating?.rate ?? 0}</td>
                <td className="px-4 py-2">{p.rating?.count ?? 0}</td>
                <td className="px-4 py-2">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-10 w-10 object-contain"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARDS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Product Cards</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border rounded-lg p-4 bg-white">
              <img
                src={p.image}
                alt={p.title}
                className="h-40 w-full object-contain mb-4"
              />

              <h3 className="font-medium text-sm mb-1">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{p.category}</p>
              <p className="font-semibold mb-1">${p.price.toFixed(2)}</p>
              <p className="text-sm">Rating: {p.rating?.rate ?? 0}</p>

              <button
                onClick={() => handleAddToCart(p)}
                className="mt-3 w-full rounded-md bg-black text-white py-2 text-sm"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}