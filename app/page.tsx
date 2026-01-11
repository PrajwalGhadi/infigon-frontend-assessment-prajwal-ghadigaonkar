import { Product } from "../types/product";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";

//Function to fetch the products from fakestore and will send it to ProductList
async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");

  // Error handling for response which will come from fakestoreapi
  if (!response.ok) throw new Error(`Failed to fetch products`);

  // returing the response back
  return response.json();
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
