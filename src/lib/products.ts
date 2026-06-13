export type ProductStatus = "available" | "coming-soon";

export type ProductMeta = {
  handle: string;
  shopifyHandle?: string;
  name: string;
  href: string;
  status: ProductStatus;
  images: string[];
  imagePos?: string;
  role: string;
  detail: string;
  note: string;
  tagline: string;
  materials: string;
  care: string;
  specs: string[];
  shipping: string;
};

export const products: ProductMeta[] = [
  {
    handle: "grooming-brush",
    name: "The Grooming Brush",
    href: "/product/grooming-brush",
    status: "available",
    images: ["/images/products/thewallbrush2.webp"],
    imagePos: "50% 35%",
    role: "Grooming Station — Professional Grade",
    detail:
      "Bubby's actual grooming brush. The one that started this. Installed without notice. Results speak for themselves.",
    note: "Installed without notice.",
    tagline: "Practice Equipment",
    materials: "Self-cleaning bristles, cream finish",
    care: "Press button to release fur. Wipe clean.",
    specs: ["Self-cleaning button", "Steel bristles", "Cat-tested"],
    shipping: "Ships in 3–7 business days.",
  },
  {
    handle: "bubby-blanket",
    name: "The Bubby Blanket",
    href: "/product/bubby-blanket",
    status: "available",
    images: [
      "/images/products/bubbyblanket1.webp",
      "/images/products/bubbyblanket2.webp",
    ],
    imagePos: "60% 50%",
    role: "Treatment Table — Official",
    detail:
      "Soft. He approves. That's the whole review. He selected this. You did not. It is available to you anyway.",
    note: "He selected this. You did not.",
    tagline: "Practice Equipment",
    materials: "Soft fleece blend",
    care: "Machine wash cold, tumble dry low",
    specs: ["Fleece blend", "Generous size", "Cat-approved warmth"],
    shipping: "Ships in 3–7 business days.",
  },
  {
    handle: "bubby-tee",
    shopifyHandle: "unisex-garment-dyed-t-shirt",
    name: "The Bubby Tee",
    href: "/product/bubby-tee",
    status: "available",
    images: ["/images/products/bubbytshirt.webp"],
    role: "Practice Apparel — Client-Issued",
    detail:
      "100% cotton. Made for you when you order. Pre-shrunk. Bubby on it. Wear it accordingly.",
    note: "100% cotton. Made for you.",
    tagline: "Practice Equipment",
    materials: "100% ring-spun cotton, garment-dyed",
    care: "Machine wash cold inside out, tumble dry low",
    specs: [
      "100% ring-spun cotton",
      "Garment-dyed finish",
      "Relaxed unisex fit",
      "Machine wash cold",
    ],
    shipping: "Made for you when you order. Ships in 5–10 business days.",
  },
  {
    handle: "sticker-sheet",
    shopifyHandle:
      "cute-cat-cuddles-sticker-sheet-cozy-kitten-sleep-nap-scene-stickers",
    name: "The Sticker Sheet",
    href: "/product/sticker-sheet",
    status: "available",
    images: ["/images/products/stickersheet.webp"],
    imagePos: "50% 45%",
    role: "Practice Certifications — Issued by Bubby",
    detail:
      "Bubby has expanded into lifestyle goods. Amira was not consulted. Four die-cut stickers documenting his off-hours. Choose your finish. Display accordingly.",
    note: "Amira was not consulted.",
    tagline: "Practice Equipment",
    materials: "Premium water-resistant vinyl, matte UV laminate",
    care: "Wipe gently from the center outward with a soft, dry cloth.",
    specs: [
      "Four die-cut stickers per sheet",
      "White, holographic, or transparent vinyl",
      'Two sizes — 6×4" or 11×8.5"',
      "Water-resistant, rated 5+ years",
      "Assembled in the USA",
    ],
    shipping: "Made for you when you order. Ships in 5–10 business days.",
  },
];

export function getProduct(handle: string): ProductMeta | undefined {
  return products.find((p) => p.handle === handle);
}

export function getShopifyHandle(handle: string): string {
  return getProduct(handle)?.shopifyHandle ?? handle;
}

export function getLocalImages(handle: string): string[] {
  return getProduct(handle)?.images ?? [];
}

export function shopifyOnlineStoreUrl(shopifyHandle: string): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  return `https://${domain}/products/${shopifyHandle}`;
}
