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
    name: "The Sticker Sheet",
    href: "/product/sticker-sheet",
    status: "coming-soon",
    images: [],
    role: "Practice Certifications — Issued by Bubby",
    detail:
      "Artist being sourced. Display yours when available. Eligibility is assumed if you are reading this.",
    note: "Display yours accordingly.",
    tagline: "Coming Soon",
    materials: "Matte vinyl",
    care: "Weather resistant",
    specs: ["Matte finish", "Weather resistant", "Multiple stickers per sheet"],
    shipping: "Available soon.",
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
