const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION ?? "2026-01";
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN!;
const PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

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
        "X-Shopify-Storefront-Access-Token": PUBLIC_TOKEN,
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

// ─── Admin API fetch (server-only, never called from client) ──────────────────

async function shopifyAdminFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(
    `https://${domain}/admin/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error(`Shopify admin fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? "Shopify admin error");
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
  descriptionHtml: string;
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
      product(handle: $handle) {
        id title description descriptionHtml tags
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

  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    query,
    { handle }
  );

  return data.product;
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

// ─── Server-side fetch (private token, never called from client) ───────────────

export async function shopifyServerFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": PRIVATE_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error(`Shopify server fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? "Shopify error");
  return json.data as T;
}

// ─── Customer types ────────────────────────────────────────────────────────────

export type ShopifyCustomer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  orders: {
    edges: {
      node: {
        id: string;
        orderNumber: number;
        processedAt: string;
        financialStatus: string;
        fulfillmentStatus: string;
        currentTotalPrice: { amount: string; currencyCode: string };
        lineItems: {
          edges: {
            node: { title: string; quantity: number };
          }[];
        };
      };
    }[];
  };
};

export type CustomerUserError = { field: string[] | null; message: string };

// ─── Customer mutations ────────────────────────────────────────────────────────

export async function customerCreate(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<{ customer: { id: string } | null; errors: CustomerUserError[] }> {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { field message }
      }
    }
  `;
  const data = await shopifyServerFetch<{
    customerCreate: {
      customer: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { input: { email, password, firstName, lastName } });
  return {
    customer: data.customerCreate.customer,
    errors: data.customerCreate.customerUserErrors,
  };
}

export async function customerAccessTokenCreate(
  email: string,
  password: string
): Promise<{ accessToken: string | null; expiresAt: string | null; errors: CustomerUserError[] }> {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { field message }
      }
    }
  `;
  const data = await shopifyServerFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { input: { email, password } });
  return {
    accessToken: data.customerAccessTokenCreate.customerAccessToken?.accessToken ?? null,
    expiresAt: data.customerAccessTokenCreate.customerAccessToken?.expiresAt ?? null,
    errors: data.customerAccessTokenCreate.customerUserErrors,
  };
}

export async function customerAccessTokenDelete(
  accessToken: string
): Promise<void> {
  const mutation = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
      }
    }
  `;
  await shopifyServerFetch(mutation, { customerAccessToken: accessToken });
}

export async function getCustomer(
  accessToken: string
): Promise<ShopifyCustomer | null> {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id firstName lastName email phone
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id orderNumber processedAt financialStatus fulfillmentStatus
              currentTotalPrice { amount currencyCode }
              lineItems(first: 5) {
                edges { node { title quantity } }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyServerFetch<{ customer: ShopifyCustomer | null }>(
    query,
    { customerAccessToken: accessToken }
  );
  return data.customer;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(amount: string, currencyCode = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
