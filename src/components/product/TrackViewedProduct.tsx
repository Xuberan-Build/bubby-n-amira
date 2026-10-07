"use client";

import { useEffect } from "react";
import { klaviyoTrack, klaviyoTrackViewedItem } from "@/lib/klaviyo";

type TrackViewedProductProps = {
  productId: string;
  name: string;
  handle: string;
  price: number;
  imageUrl?: string;
};

// Klaviyo's standard browse event, used for browse-abandonment flows and
// "viewed but didn't buy" segments. klaviyo.js only records it for visitors
// it has identified (waitlist signup, login, or a Klaviyo email click).
export default function TrackViewedProduct({
  productId,
  name,
  handle,
  price,
  imageUrl,
}: TrackViewedProductProps) {
  useEffect(() => {
    const url = `${window.location.origin}/product/${handle}`;
    // Local gallery images are site-relative; emails need absolute URLs.
    const image = imageUrl?.startsWith("/") ? `${window.location.origin}${imageUrl}` : imageUrl;
    klaviyoTrack("Viewed Product", {
      ProductName: name,
      ProductID: productId,
      URL: url,
      ImageURL: image,
      Price: price,
      $value: price,
    });
    klaviyoTrackViewedItem({
      Title: name,
      ItemId: productId,
      Url: url,
      ImageUrl: image,
      Metadata: { Price: price },
    });
  }, [productId, name, handle, price, imageUrl]);

  return null;
}
