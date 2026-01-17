import { notFound } from "next/navigation";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const products = {
  "bubbys-practical-tee": {
    name: "Bubby's Practical Tee",
    description:
      "Bubby said this shirt was \"fine, I guess.\" It is cotton, unbothered, and comes in a few quiet colors.",
    price: "$28",
    story:
      "He keeps one folded on the third shelf. It's the one he wears when he wants to look like he didn't think about it.",
    variants: ["Small", "Medium", "Large", "Extra Large"],
    colors: ["Bone", "Stone", "Soft Black"],
    specs: ["100% cotton", "Pre-shrunk", "Gentle wash"],
  },
  "amiras-tote": {
    name: "Amira's Tote",
    description:
      "Amira needed a new tote because the last one \"mysteriously vanished\". Canvas, reinforced handles, quiet beige.",
    price: "$24",
    story:
      "It can hold groceries, books, or an inexplicable number of receipts. It does not ask questions.",
    variants: ["One size"],
    colors: ["Beige", "Olive"],
    specs: ["Canvas", '15" x 16"', "Reinforced handles"],
  },
  "quiet-mug": {
    name: "The Quiet Mug",
    description:
      "A mug that does not interrupt. Ceramic, matte finish, keeps the conversation short.",
    price: "$18",
    story: "Bubby uses it for tea. Amira uses it for the silence.",
    variants: ["12 oz"],
    colors: ["Cloud", "Ink"],
    specs: ["Ceramic", "Dishwasher safe", "Matte glaze"],
  },
  "notebook-of-mild-opinions": {
    name: "Notebook of Mild Opinions",
    description:
      "A soft-cover notebook for thoughts that do not need a stage. Lined pages, quiet spine, no pressure.",
    price: "$16",
    story:
      "Bubby keeps one in the drawer marked \"misc.\" He writes in it when nobody is asking.",
    variants: ["One size"],
    colors: ["Sand", "Fog"],
    specs: ["120 pages", "Soft cover", "5.5 x 8.5 in"],
  },
  "lavender-sticker-sheet": {
    name: "Lavender Sticker Sheet",
    description:
      "A calm set of stickers in Amira's palette. Peels cleanly, sticks politely.",
    price: "$12",
    story:
      "Amira uses these to label jars and occasionally friends. No pressure.",
    variants: ["One sheet"],
    colors: ["Lavender", "Mint"],
    specs: ["Matte finish", "Weather resistant", "Sheet size 5 x 7 in"],
  },
};

type ProductPageProps = {
  params: { handle: string } | Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = products[resolvedParams.handle as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden">
      <Blob
        className="blob-slow left-[-80px] top-20 h-72 w-72"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #fff4cc, #ffe5ec 60%, #fefefe 100%)",
        }}
      />
      <section className="page-shell section-pad-lg relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="grid gap-5">
            <div className="soft-card bg-[var(--color-gray-100)] p-6 perspective-slab">
              <div className="aspect-square rounded-2xl bg-[var(--color-gray-500)]/10" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl bg-[var(--color-gray-500)]/10"
                />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="soft-card bg-[var(--color-peach)]/60 p-5 tilt-left">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gray-500)]">
                  Materials
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                  {product.specs[0]}
                </p>
              </div>
              <div className="soft-card bg-[var(--color-mint)]/70 p-5 tilt-right">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gray-500)]">
                  Care
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                  {product.specs[2]}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                Offering
              </p>
              <h1 className="font-display text-4xl">{product.name}</h1>
              <p className="mt-3 text-base text-[var(--color-gray-500)]">
                {product.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold">{product.price}</span>
              <span className="text-sm text-[var(--color-gray-500)]">
                In stock, quietly.
              </span>
            </div>
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                Size
                <select className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)]">
                  {product.variants.map((variant) => (
                    <option key={variant}>{variant}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                Color
                <select className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)]">
                  {product.colors.map((color) => (
                    <option key={color}>{color}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                Quantity
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-[var(--color-gray-100)] text-lg text-[var(--color-gray-500)]"
                  >
                    -
                  </button>
                  <span className="text-sm text-[var(--color-charcoal)]">1</span>
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-[var(--color-gray-100)] text-lg text-[var(--color-gray-500)]"
                  >
                    +
                  </button>
                </div>
              </label>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button>Add to cart</Button>
              <Button variant="secondary" href="/available">
                Back to offerings
              </Button>
            </div>
            <Card className="bg-[var(--color-gray-100)] perspective-slab-right">
              <h2 className="font-display text-lg">Product story</h2>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                {product.story}
              </p>
            </Card>
            <Card className="bg-[var(--color-gray-100)] perspective-slab">
              <h3 className="font-display text-lg">Specifications</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-gray-500)]">
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
                <li>Shipping: 5-7 business days.</li>
              </ul>
            </Card>
            <Card className="bg-[var(--color-gray-100)] perspective-slab-right">
              <h3 className="font-display text-lg">Shipping notes</h3>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                We hand it off to people who know what they&apos;re doing. You
                get tracking, no extra drama.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
