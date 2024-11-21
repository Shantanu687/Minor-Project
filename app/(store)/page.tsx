import BidProductsView from "@/components/BidProductsView";
import ProductsView from "@/components/ProductsView";
import SaleBanner from "@/components/SaleBanner";
import { getAllBidProducts } from "@/sanity/lib/products/getAllBidProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const bidProducts = await getAllBidProducts();

  return (
    <div>
      <SaleBanner />
      <div className="flex flex-col items-center justify-top bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
      <div className="flex flex-col items-center justify-top bg-gray-100 p-4">
        <BidProductsView products={bidProducts} />
      </div>
      <div>
    <footer className="bg-gray-800 text-white py-6 mt-4 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h5 className="font-bold mb-2">About Us</h5>
        <p className="text-sm">
          We are a leading e-commerce platform providing a wide range of products at competitive prices.
        </p>
      </div>
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h5 className="font-bold mb-2">Customer Service</h5>
        <ul className="text-sm">
          <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Returns</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Shipping</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">FAQs</a></li>
        </ul>
      </div>
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h5 className="font-bold mb-2">Follow Us</h5>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">LinkedIn</a>
        </div>
      </div>
        </div>
        <div className="text-center mt-6">
      <p className="text-sm">&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
    </div>
  );
}