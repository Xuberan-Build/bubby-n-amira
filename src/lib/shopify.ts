const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION ?? "2026-01";

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? "Shopify error");
  return json.data as T;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  options: { name: string; values: string[] }[];
  variants: { edges: { node: ShopifyVariant }[] };
  images: { edges: { node: { url: string; altText: string | null } }[] };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: { title: string; handle: string };
    image: { url: string; altText: string | null } | null;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: { edges: { node: CartLine }[] };
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
};

// ─── Fragments ────────────────────────────────────────────────────────────────

const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product { title handle }
            image { url altText }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
`;

// ─── Product ──────────────────────────────────────────────────────────────────

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id title description tags
        priceRange { minVariantPrice { amount currencyCode } }
        options { name values }
        variants(first: 100) {
          edges {
            node {
              id title availableForSale
              price { amount currencyCode }
              selectedOptions { name value }
            }
          }
        }
        images(first: 10) {
          edges { node { url altText } }
        }
      }
    }
  `;
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>(query, { handle });
  return data.productByHandle;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FIELDS} }
    }
  `;
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(query, {
    cartId,
  });
  return data.cart;
}

export async function createCart(
  variantId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(mutation, { input: { lines: [{ merchandiseId: variantId, quantity }] } });
  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  return data.cartCreate.cart;
}

export async function addCartLine(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    mutation,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] }
  );
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    mutation,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    mutation,
    { cartId, lineIds: [lineId] }
  );
  return data.cartLinesRemove.cart;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(amount: string, currencyCode = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
