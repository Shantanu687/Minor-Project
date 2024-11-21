// import { Product } from "@/sanity.types";
// import { set } from "sanity";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export interface BasketItem {
//   product: Product;
//   quantity: number;
// }

// interface BasketState {
//   items: BasketItem[];
//   addItem: (product: Product) => void;
//   removeItem: (product: Product) => void;
//   clearBasket: () => void;
//   getTotalPrice: () => number;
//   getItemCount: (productId: string) => number;
//   getGroupedItems: () => BasketItem[];
// }

// export const useBasketStore = create<BasketState>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (product) =>
//         set((state) => {
//           const existingItem = state.items.find(
//             item => item.product._id === product._id
//           );
//           if (existingItem) {
//             return {
//               items: state.items.map(item =>
//                 item.product._id === product._id
//                   ? { ...item, quantity: item.quantity + 1 }
//                   : item
//               )
//             };
//           } else {
//             return { items: [...state.items, { product, quantity: 1 }] };
//           }
//         }),
//       removeItem: (productId) =>
//         set((state) => ({
//           items: state.items.reduce((acc, item) => {
//             if (item.product._id === productId) {
//               if (item.quantity > 1) {
//                 acc.push({ ...item, quantity: item.quantity - 1 });
//               }
//             } else {
//               acc.push(item);
//             }
//             return acc;
//           }, [] as BasketItem[]),
//         })),
//       clearBasket: () => set({ items: [] }),
//       getTotalPrice: () => {
//         return get().items.reduce(
//           (total, item) => total + (item.product.price ?? 0) * item.quantity,
//           0
//         );
//       },
//       getItemCount: (productId) => {
//         const item = get().items.find(item => item.product._id === productId);
//         return item ? item.quantity : 0;
//       },
//       getGroupedItems: () => get().items,
//     }),
//     {
//       name: "basket-store",
//     }
//   )
// );

import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface BidProduct {
  _id: string;
  name: string;
  startingBid: number;
  currentBid?: number;
  isActive: boolean;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: {
    _type: string;
    style: string;
    _key: string;
    children: {
      _type: string;
      text: string;
    }[];
  }[];
  categories: {
    _type: string;
    _key: string;
    _ref: string;
  }[];
  slug: {
    current: string;
    _type: string;
  };
  visibilityDuration: number;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: string;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
  bidProducts: BidProduct[];
  addBidProduct: (product: BidProduct) => void;
  placeBid: (productId: string, bidAmount: number) => void;
  getHighestBid: (productId: string) => number | undefined;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      bidProducts: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),
      clearBasket: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
      addBidProduct: (product) =>
        set((state) => ({
          bidProducts: [...state.bidProducts, product],
        })),
      placeBid: (productId, bidAmount) =>
        set((state) => ({
          bidProducts: state.bidProducts.map((product) =>
            product._id === productId && bidAmount > (product.currentBid ?? product.startingBid)
              ? { ...product, currentBid: bidAmount }
              : product
          ),
        })),
      getHighestBid: (productId) => {
        const product = get().bidProducts.find((product) => product._id === productId);
        return product?.currentBid ?? product?.startingBid;
      },
    }),
    {
      name: "basket-store",
    }
  )
);