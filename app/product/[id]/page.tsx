import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";

interface ProductProps {
  params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";

async function getProductById(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

    const response = await fetch(`${baseUrl}/products/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // Force fresh data
    });

    if (!response.ok) throw new Error(`Post not found by id: ${id}`);

    return response.json();
  } catch (error) {
    console.error("Build-time fetch failed: ", error);
    return [];
  }
}

export default async function SingleProduct({ params }: ProductProps) {
  const response = await params;
  const id = response.id;

  const product = await getProductById(id);

  // Extra feature to distinguish the color of the catogory tag
  const categoryColor: Record<string, string> = {
    electronics: "bg-blue-100 text-blue-800",
    jewelery: "bg-amber-100 text-amber-800",
    "men's clothing": "bg-slate-100 text-slate-800",
    "women's clothing": "bg-pink-100 text-pink-800",
  };

  return (
    <>
      <div className="p-6 lg:w-[25%] relative lg:left-[50%] md:w-[75%] md:left-[12.5%] lg:-translate-x-1/2">
        <Link
          href={"/"}
          className="border rounded-lg p-2 shadow-md hover:bg-black hover:text-white inline-block duration-200 delay-10 active:scale-95"
        >
          ← Back to Feeds
        </Link>

        <div className="grid grid-cols-1 gap-x-4 gap-y-10 px-4 py-5">
          <div key={product.id} className="group relative flex flex-col pt-12">
            {/* Product Image */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="w-35 h-35 aspect-square object-contain bg-white rounded-2xl p-4 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product details Card */}
            <div className="bg-gray-100 rounded-2xl pt-28 pb-4 px-4 flex flex-col h-full shadow-sm lg:shadow-md space-y-4">
              <div className="flex justify-between">
                <span
                  className={`text-md border border-gray-400 shadow-md p-2 rounded-xl uppercase tracking-wider ${
                    categoryColor[product.category] ||
                    "bg-gray-100 text-gray-800"
                  } font-bold`}
                >
                  {product.category}
                </span>

                {/* <IoMdHeartEmpty
                    className={`text-xl ${
                      favorite.includes(product.id) ? "text-blue-400" : ""
                    } active:scale-95`}
                    onClick={() => toggleFavorite(product.id)}
                  /> */}
              </div>
              <h2 className="font-bold text-lg line-clamp-2 mt-1 grow">
                {product.title}
              </h2>

              <p className="text-gray-500">{product.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-blue-600">
                  ₹{Math.floor(product.price * 90)}{" "}
                  {/* price are in dollar so converted to rupee*/}
                </span>
                <div className="flex items-center gap-1 text-sm bg-white px-2 py-1 rounded-lg shadow-inner">
                  <span className="text-yellow-500">★</span>
                  <span>{product.rating.rate}</span>
                </div>
              </div>

              {/* Action Button - Link to Details */}
              <Link
                href={`/product/${product.id}`}
                className="mt-3 w-full text-center bg-[#13C8EC] py-2 rounded-xl text-lg font-semibold hover:bg-black hover:text-white transition-colors duration-200 flex justify-center items-center gap-2 shadow-lg active:scale-95"
              >
                <IoCartOutline /> Add To Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
