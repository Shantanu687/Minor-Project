import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getBidProductBySlug = async (slug: string) => {
    const BidPRODUCT_BY_ID_QUERY = defineQuery(`
    *[_type == "bidProduct" && slug.current == $slug] | order(name asc)[0]
    `);

try {
    const product = await sanityFetch({
        query: BidPRODUCT_BY_ID_QUERY,
        params: { slug, },
    });
    return product.data || null;
} catch (error) {
    console.error("Error fetching product by ID: ",error);
    return null;
}
};