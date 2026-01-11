"use client"; // This is the key change

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";
        const response = await fetch(`${url}/products`);
        
        if (!response.ok) throw new Error("Failed to fetch products");
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Client fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <Navbar />
      {isLoading ? (
        /* Professional Loading State */
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500 animate-pulse">Loading products...</p>
        </div>
      ) : (
        <ProductList initialProducts={products} />
      )}
    </main>
  );
}