import { imageUrl } from "@/lib/imageUrl";
import { getBidProductBySlug } from "@/sanity/lib/products/getBidProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import BidForm from "@/components/BidForm";
import BidsList from "@/components/BidsList";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const product = await getBidProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg`}>
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product Image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              Bidding Start From ₹{product.startingBid?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
            <BidForm product={product} />
            <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Bids</h2>
        <BidsList productId={product._id} />
      </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Page;