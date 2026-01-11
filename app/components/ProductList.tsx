"use client";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/types/product";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import Image from "next/image";

interface Props {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // --------------------------------------------------------------------------------
  // variable to handle the filter logic for high to low and low to high price filter
  const [filterBtnClick, setFilterBtnClick] = useState(false);
  const [sortBy, setSortBy] = useState<string>("");

  // filtering the product on the basis category and search
  let filterProducts = initialProducts.filter((items) => {
    const matchSearch = items.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "all" || items.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  //Array to store the unique category.
  const category = [
    "all",
    ...new Set(initialProducts.map((product) => product.category)),
  ];

  // ---------------------------------------------------------------------------------
  // variable to store the favorite and track the mount and unmount of the component
  const [favorite, setFavorite] = useState<number[]>([]);
  const [hasMounted, setHasMounted] = useState(false); // using hasMount to get the localstorage at first mount

  useEffect(() => {
    const saved = localStorage.getItem("favorite");
    if (saved) {
      setFavorite(JSON.parse(saved));
    }
    setHasMounted(true);
  }, []); // using empty dependency so that it will check for once after mount and make the mounted flag true

  // toggle functionality favorite product
  function toggleFavorite(id: number) {
    setFavorite(
      (prev) =>
        prev.includes(id)
          ? prev.filter((favId) => favId !== id) // Remove logic
          : [...prev, id] // Add logic
    );
  }

  // storing the favorite to localstorage if component is already mounted.
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("favorite", JSON.stringify(favorite));
    }
    // else {
    //   const saved = localStorage.getItem('favorite')
    //   setFavorite(saved ? JSON.parse(saved) : [])
    //   setHasMounted(true);
    // }
  }, [favorite, hasMounted]);

  // sorting functionality
  filterProducts = [...filterProducts].sort((a, b) => {
    if (sortBy === "low") return a.price - b.price;
    if (sortBy === "high") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <section className="p-5 space-y-4 lg:w-[50%] lg:relative lg:left-[25%]">
        {/* Search Bar */}
        <div className="h-35 fixed top-18 z-11 w-[90%] lg:w-[48%] md:w-[95%] bg-[#fffdfd]">
          <div className="px-4 w-full flex justify-between items-center gap-6">
            <input
              type="text"
              placeholder="Search Product by title or category"
              className="w-full border border-gray-400 shadow-md py-3 px-5 rounded-full focus:outline-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <IoFilter
              className="text-4xl"
              onClick={() => {
                setFilterBtnClick(!filterBtnClick);
              }}
            />

            {/* Filter options on the basis of priced */}
            {filterBtnClick && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 shadow-xl rounded-lg z-50 flex flex-col py-2">
                <span className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Sort by Price
                </span>
                <button
                  onClick={() => setSortBy("low")}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-100 transition"
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => setSortBy("high")}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-100 transition"
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => setSortBy("default")}
                  className="px-4 py-2 text-sm text-left text-red-500 hover:bg-red-50 transition border-t"
                >
                  Reset Sort
                </button>
              </div>
            )}
          </div>

          {/* Category Filter Options */}
          <div className="w-full flex justify-between items-center overflow-auto gap-4 p-4 ">
            {category.map((cat, index) => (
              <h3
                key={index}
                className="w-full whitespace-nowrap text-md bg-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-[#13C8EC] duration-200 delay-10 transition-all text-center uppercase"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </h3>
            ))}
          </div>
        </div>

        {/* List of clothes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 px-4 py-5 relative top-40">
          {filterProducts.length > 0 ? (
            filterProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col pt-12"
              >
                {/* Product Image */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-8">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-32 h-32 object-contain bg-white rounded-2xl p-4 shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product details Card */}
                <div className="bg-gray-100 rounded-2xl pt-24 pb-4 px-4 flex flex-col h-full shadow-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {product.category}
                    </span>

                    <IoMdHeartEmpty
                      className={`text-xl ${
                        favorite.includes(product.id) ? "text-blue-400" : ""
                      } active:scale-95`}
                      onClick={() => toggleFavorite(product.id)}
                    />
                  </div>
                  <h2 className="font-bold text-sm line-clamp-2 mt-1 grow">
                    {product.title}
                  </h2>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{Math.floor(product.price * 90)}{" "}
                      {/* converted dollar to ruppee*/}
                    </span>
                    <div className="flex items-center gap-1 text-sm bg-white px-2 py-1 rounded-lg shadow-inner">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating.rate}</span>
                    </div>
                  </div>

                  {/* Action Button - Link to Details */}
                  <Link
                    href={`/product/${product.id}`}
                    className="mt-3 w-full text-center bg-white py-2 rounded-xl text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            // Fallback when product not found {Note- Design this fallback with the help of AI}
            <div className="w-[200%] mt-20 md:mx-30 lg:mx-60 flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              {/* A simple SVG search icon with a slash or question mark */}
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <h2 className="text-2xl font-semibold text-gray-700">
                No products found
              </h2>
              <p className="text-gray-500 mt-2 text-center max-w-xs">
                We couldn't find any products matching your current filters or
                search terms.
              </p>

              {/* This button is key for UX - it lets users recover easily */}
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all active:scale-95 shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* pages */}
      </section>
    </>
  );
}
