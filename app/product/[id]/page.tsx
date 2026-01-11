"use client"; // Standardizing with your HomePage fix

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { Product } from "../../../types/product"; // Adjust path as needed

interface ProductProps {
  params: Promise<{ id: string }>;
}

export default function SingleProduct({ params }: ProductProps) {
  // Unwrap the params using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Category Color Logic
  const categoryColor: Record<string, string> = {
    electronics: "bg-blue-100 text-blue-800",
    jewelery: "bg-amber-100 text-amber-800",
    "men's clothing": "bg-slate-100 text-slate-800",
    "women's clothing": "bg-pink-100 text-pink-800",
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";
        const response = await fetch(`${baseUrl}/products/${id}`);
        
        if (!response.ok) throw new Error("Product not found");
        
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13C8EC]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/" className="text-blue-500 underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="p-6 lg:w-[30%] relative lg:left-[50%] md:w-[75%] md:left-[12.5%] lg:-translate-x-1/2">
      <Link
        href={"/"}
        className="border rounded-lg p-2 shadow-md hover:bg-black hover:text-white inline-block duration-200 active:scale-95 mb-8"
      >
        ← Back to Feeds
      </Link>

      <div className="group relative flex flex-col pt-20">
        {/* Product Image */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="w-48 h-48 object-contain bg-white rounded-2xl p-4 shadow-xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product details Card */}
        <div className="bg-gray-100 rounded-3xl pt-32 pb-6 px-6 flex flex-col shadow-lg space-y-4">
          <div className="flex justify-between items-start">
            <span
              className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-gray-300 ${
                categoryColor[product.category] || "bg-gray-200 text-gray-800"
              }`}
            >
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-sm bg-white px-2 py-1 rounded-lg shadow-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-bold">{product.rating?.rate}</span>
            </div>
          </div>

          <h1 className="font-extrabold text-2xl text-gray-800 leading-tight">
            {product.title}
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="flex justify-between items-center pt-4">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase font-semibold">Price</span>
              <span className="text-2xl font-black text-blue-600">
                ₹{Math.floor(product.price * 90)}
              </span>
            </div>
          </div>

          <button
            className="w-full bg-[#13C8EC] py-4 rounded-2xl text-white text-lg font-bold hover:bg-black transition-all duration-300 flex justify-center items-center gap-2 shadow-lg active:scale-95"
          >
            <IoCartOutline size={24} /> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}