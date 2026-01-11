import { Product } from "../types/product";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";

export const dynamic = "force-dynamic";

//Function to fetch the products from fakestore and will send it to ProductList
async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      cache: 'no-store',
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // Force fresh data
    });

    // Error handling for response which will come from fakestoreapi
    if (!response.ok) throw new Error(`Failed to fetch products`);

    // returing the response back
    return response.json();
  } catch (error) {
    console.error("Build-time fetch failed: ", error); // added because while deploying to netlify build is failed
    return []; // now if there is error during api fetch it will give the empty array and build will be successfull
  }
}

export default async function HomePage() {
  // calling the getProducts function
  const products: Product[] = await getProducts();

  return (
    <>
      <main className="">
        <Navbar />
        <ProductList initialProducts={products} />
      </main>
    </>
  );
}
