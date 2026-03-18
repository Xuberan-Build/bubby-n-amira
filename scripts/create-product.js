#!/usr/bin/env node
// Bubby n Amira — Shopify Product Creator
// Usage: node scripts/create-product.js scripts/products/wall-brush.json

const fs = require('fs');
const path = require('path');

const STORE_DOMAIN = 'bubbys-faves.myshopify.com';
const API_VERSION = '2026-01';
// Load .env.local if present (avoids needing a manual export)
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

if (!ADMIN_TOKEN) {
  console.error('\n❌ Missing SHOPIFY_ADMIN_TOKEN — add it to .env.local or export it.\n');
  process.exit(1);
}

const endpoint = `https://${STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

async function shopifyAdmin(query, variables = {}) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors, null, 2)}`);
  }

  return json.data;
}

async function createProduct(productData) {
  // productCreate no longer accepts variants in 2024-07+ API.
  // productSet (synchronous) handles the full product + variants in one call.
  const mutation = `
    mutation productSet($synchronous: Boolean!, $input: ProductSetInput!) {
      productSet(synchronous: $synchronous, input: $input) {
        product {
          id
          title
          handle
          status
          variants(first: 10) {
            edges {
              node {
                id
                title
                price
              }
            }
          }
        }
        userErrors {
          field
          message
        }
        productSetOperation {
          id
          status
        }
      }
    }
  `;

  const variants = productData.variants || [];
  // Single-variant products use the "Title" option; multi-variant (e.g. sizes) use "Size"
  const optionName = variants.length > 1
    ? (productData.optionName || 'Size')
    : 'Title';

  // productSet requires productOptions declared explicitly — variants alone are not enough
  const input = {
    title: productData.title,
    descriptionHtml: productData.description,
    vendor: productData.vendor || 'Bubby n Amira',
    productType: productData.type || '',
    status: productData.status || 'DRAFT',
    tags: productData.tags || [],
    productOptions: [
      {
        name: optionName,
        values: variants.map(v => ({ name: v.title || 'Default Title' })),
      },
    ],
    variants: variants.map(v => ({
      optionValues: [{ optionName, name: v.title || 'Default Title' }],
      price: v.price.toString(),
      sku: v.sku || '',
      taxable: v.taxable !== false,
      inventoryPolicy: 'CONTINUE', // print on demand — never out of stock
      inventoryItem: {
        requiresShipping: v.requiresShipping !== false,
      },
    })),
  };

  const data = await shopifyAdmin(mutation, { synchronous: true, input });
  const result = data.productSet;

  if (result.userErrors.length > 0) {
    throw new Error(`User errors: ${JSON.stringify(result.userErrors, null, 2)}`);
  }

  return result.product;
}

async function publishProduct(productId) {
  const mutation = `
    mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        publishable {
          publishedOnCurrentPublication
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Get online store publication id first
  const pubQuery = `
    query {
      publications(first: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  const pubData = await shopifyAdmin(pubQuery);
  const onlineStore = pubData.publications.edges.find(
    e => e.node.name === 'Online Store'
  );

  if (!onlineStore) {
    console.log('⚠️  Could not find Online Store publication — product saved as draft.');
    return;
  }

  await shopifyAdmin(mutation, {
    id: productId,
    input: [{ publicationId: onlineStore.node.id }],
  });
}

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('\n❌ No product file specified.');
    console.error('Usage: node scripts/create-product.js scripts/products/my-product.json\n');
    process.exit(1);
  }

  const absPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absPath)) {
    console.error(`\n❌ File not found: ${absPath}\n`);
    process.exit(1);
  }

  const productData = JSON.parse(fs.readFileSync(absPath, 'utf8'));

  console.log(`\n🐱 Creating product: ${productData.title}...`);

  const product = await createProduct(productData);

  console.log(`✅ Product created: ${product.title}`);
  console.log(`   ID: ${product.id}`);
  console.log(`   Handle: ${product.handle}`);
  console.log(`   Status: ${product.status}`);
  console.log(`   Variants:`);
  product.variants.edges.forEach(({ node }) => {
    console.log(`     - ${node.title}: $${node.price}`);
  });

  if (productData.publish) {
    console.log('\n📢 Publishing to Online Store...');
    await publishProduct(product.id);
    console.log('✅ Published.');
  } else {
    console.log('\n📝 Product saved as DRAFT. Add "publish": true to auto-publish.');
  }

  console.log(`\n🔗 View in admin: https://admin.shopify.com/store/bubbys-faves/products\n`);
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
