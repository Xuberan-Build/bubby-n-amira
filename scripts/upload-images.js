#!/usr/bin/env node
// Bubby n Amira — Upload local product images to Shopify
// Usage: node scripts/upload-images.js

const fs = require('fs');
const path = require('path');

// Load .env.local if present
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
  console.error('\n❌ Missing SHOPIFY_ADMIN_TOKEN — add it to .env.local\n');
  process.exit(1);
}

const STORE_DOMAIN = 'bubbys-faves.myshopify.com';
const API_VERSION = '2026-01';
const endpoint = `https://${STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

// Product IDs from the create-all-products run
const IMAGE_MAP = [
  {
    productId: 'gid://shopify/Product/9055422840995',
    name: 'The Wall Brush',
    images: ['public/images/products/thewallbrush1.webp'],
  },
  {
    productId: 'gid://shopify/Product/9055422873763',
    name: 'The Bubby Blanket',
    images: [
      'public/images/products/bubbyblanket1.webp',
      'public/images/products/bubbyblanket2.webp',
    ],
  },
  {
    productId: 'gid://shopify/Product/9055422906531',
    name: 'The Bubby Tee',
    images: ['public/images/products/bubbytshirt.webp'],
  },
];

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
  if (json.errors) throw new Error(`GraphQL: ${JSON.stringify(json.errors, null, 2)}`);
  return json.data;
}

async function stageUpload(filename, mimeType, fileSize) {
  const data = await shopifyAdmin(
    `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters { name value }
        }
        userErrors { field message }
      }
    }`,
    {
      input: [{
        filename,
        mimeType,
        resource: 'PRODUCT_IMAGE',
        fileSize: String(fileSize),
        httpMethod: 'POST',
      }],
    }
  );

  const { userErrors, stagedTargets } = data.stagedUploadsCreate;
  if (userErrors.length > 0) throw new Error(JSON.stringify(userErrors));
  return stagedTargets[0];
}

async function uploadToStage(target, filePath, mimeType) {
  const fileBuffer = fs.readFileSync(filePath);
  const formData = new FormData();

  // Shopify S3 requires all parameters before the file field
  for (const { name, value } of target.parameters) {
    formData.append(name, value);
  }
  formData.append('file', new Blob([fileBuffer], { type: mimeType }), path.basename(filePath));

  const res = await fetch(target.url, { method: 'POST', body: formData });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Stage upload failed (${res.status}): ${text}`);
  }
}

async function attachImageToProduct(productId, resourceUrl) {
  const data = await shopifyAdmin(
    `mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media {
          ... on MediaImage {
            id
            status
          }
        }
        userErrors { field message }
      }
    }`,
    {
      productId,
      media: [{ originalSource: resourceUrl, mediaContentType: 'IMAGE' }],
    }
  );

  const { userErrors, media } = data.productCreateMedia;
  if (userErrors.length > 0) throw new Error(JSON.stringify(userErrors));
  return media[0];
}

async function uploadImage(productId, imagePath) {
  const absPath = path.resolve(process.cwd(), imagePath);
  const filename = path.basename(absPath);
  const fileSize = fs.statSync(absPath).size;
  const mimeType = 'image/webp';

  process.stdout.write(`    → staging ${filename}... `);
  const target = await stageUpload(filename, mimeType, fileSize);

  process.stdout.write('uploading... ');
  await uploadToStage(target, absPath, mimeType);

  process.stdout.write('attaching... ');
  const media = await attachImageToProduct(productId, target.resourceUrl);

  console.log(`done (${media.id})`);
}

async function main() {
  console.log('\n🖼  Uploading product images to Shopify...\n');

  for (const product of IMAGE_MAP) {
    console.log(`📦 ${product.name}`);
    for (const imagePath of product.images) {
      try {
        await uploadImage(product.productId, imagePath);
      } catch (err) {
        console.error(`\n  ❌ Failed: ${err.message}`);
      }
    }
  }

  console.log('\n✅ Done. Check images in Shopify admin:');
  console.log('   https://admin.shopify.com/store/bubbys-faves/products\n');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
