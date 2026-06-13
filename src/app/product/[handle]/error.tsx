"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductUnavailable from "@/components/product/ProductUnavailable";
import { getProduct, getShopifyHandle, shopifyOnlineStoreUrl } from "@/lib/products";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface in logs for observability
    console.error("Product page error:", error);
  }, [error]);

  // Derive the handle from /product/<handle>
  const pathname = usePathname() ?? "";
  const handle = pathname.split("/").filter(Boolean).pop() ?? "";
  const meta = getProduct(handle);
  const buyUrl = shopifyOnlineStoreUrl(getShopifyHandle(handle));

  return (
    <ProductUnavailable
      name={meta?.name ?? "this item"}
      role={meta?.role}
      buyUrl={buyUrl}
      onRetry={reset}
    />
  );
}
