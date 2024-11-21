import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllBidProducts = async () => {
    const ALL_BID_PRODUCTS_QUERY = defineQuery(`*[ _type == "bidProduct" ] | order(name asc)`);

    try {
        
        const products = await sanityFetch({
            query: ALL_BID_PRODUCTS_QUERY,
        });
        return products.data || [];

    } catch (error) {
        console.error("Error fetching all products: "+error);
        return [];
    }
}