export declare const internalGroqTypeReferenceTo: unique symbol;

export interface bidProduct {
    _id: string;
    _type: "bidProduct";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
    slug: string;
    description: string;
    // image: { asset: { url: string } };
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    startingBid: number;
    visibilityDuration: number;
    isActive: boolean;
  }
  
  export interface Bid {
    user: string;
    product: string;
    amount: number;
    timestamp: string;
  }
  
  export type SanityImageHotspot = {
    _type: "sanity.imageHotspot";
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };

  export type SanityImageCrop = {
    _type: "sanity.imageCrop";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };