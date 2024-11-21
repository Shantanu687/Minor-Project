import BidProductGrid from "./BidProductGrid";
import { BidProduct } from "@/sanity.types";

interface ProductsViewProps {
  products: BidProduct[];
}

const BidProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-4xl bg-blue-600 text-center font-bold text-white rounded-xl p-2">
        Bidding Products
      </div>
      <div className="flex-1">
        <div>
          <BidProductGrid products={products} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default BidProductsView;