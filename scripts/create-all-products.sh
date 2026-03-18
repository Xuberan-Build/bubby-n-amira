#!/usr/bin/env bash
# Bubby n Amira — create all products in Shopify (as DRAFTs)
# Usage: bash scripts/create-all-products.sh

set -e

# Load from .env.local if token not already in environment
if [ -z "$SHOPIFY_ADMIN_TOKEN" ] && [ -f ".env.local" ]; then
  export $(grep '^SHOPIFY_ADMIN_TOKEN=' .env.local | xargs)
fi

if [ -z "$SHOPIFY_ADMIN_TOKEN" ]; then
  echo ""
  echo "❌ Missing SHOPIFY_ADMIN_TOKEN — add it to .env.local or export it."
  echo ""
  exit 1
fi

PRODUCTS=(
  "scripts/products/wall-brush.json"
  "scripts/products/bubby-blanket.json"
  "scripts/products/bubby-tee.json"
  "scripts/products/sticker-sheet.json"
)

for f in "${PRODUCTS[@]}"; do
  node scripts/create-product.js "$f"
done

echo ""
echo "🎉 All products created. Review and adjust prices/images in Shopify admin before publishing."
echo "🔗 https://admin.shopify.com/store/bubbys-faves/products"
echo ""
