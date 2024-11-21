import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (categorySlug: string) => {
  const ALL_PRODUCTS_BY_QUERY = defineQuery(`
  *[ 
    _type == "product"
    && references(*[_type == "category" && slug.current == $categorySlug]._id)
    ] | order(name asc)
    `);

  try {
    const products = await sanityFetch({
      query: ALL_PRODUCTS_BY_QUERY,
      params: { categorySlug },
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products: " + error);
    return [];
  }
};
