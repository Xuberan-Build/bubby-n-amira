import { notFound } from "next/navigation";
import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const products = {
  "bubbys-practical-tee": {
    name: "The Shirt We Made",
    description:
      "A shirt. 100% cotton. Fits like a shirt should. We put our logo on it. You can wear it or not. Up to you.",
    price: "$28",
    materials: "100% cotton",
    care: "Gentle wash",
    variants: ["Small", "Medium", "Large", "Extra Large"],
    colors: ["Bone", "Stone", "Soft Black"],
    specs: ["100% cotton", "Pre-shrunk", "Gentle wash"],
  },
  "amiras-tote": {
    name: "That Tote",
    description:
      "It's a tote bag. Canvas. Fits groceries or whatever else you carry around. Bubby's face is on it. That's the whole pitch.",
    price: "$24",
    materials: "Canvas",
    care: "Spot clean",
    variants: ["One size"],
    colors: ["Beige", "Olive"],
    specs: ["Canvas", '15" x 16"', "Reinforced handles"],
  },
  "quiet-mug": {
    name: "The Quiet Mug",
    description:
      "A mug. Ceramic. Holds coffee. Dishwasher safe. That's really it.",
    price: "$18",
    materials: "Ceramic",
    care: "Dishwasher safe",
    variants: ["12 oz"],
    colors: ["Cloud", "Ink"],
    specs: ["Ceramic", "Dishwasher safe", "Matte glaze"],
  },
  "notebook-of-mild-opinions": {
    name: "The Notebook",
    description:
      "A notebook. Lined pages. Soft cover. 120 pages. We didn't name it anything exciting. You're welcome.",
    price: "$16",
    materials: "Soft cover",
    care: "Don't get it wet",
    variants: ["One size"],
    colors: ["Sand", "Fog"],
    specs: ["120 pages", "Soft cover", "5.5 x 8.5 in"],
  },
  "lavender-sticker-sheet": {
    name: "The Sticker Sheet",
    description:
      "Stickers. Matte finish. Weather resistant. Peels cleanly. That's the spec.",
    price: "$12",
    materials: "Matte vinyl",
    care: "Weather resistant",
    variants: ["One sheet"],
    colors: ["Lavender", "Mint"],
    specs: ["Matte finish", "Weather resistant", "Sheet size 5 x 7 in"],
  },
};

const alsoLikes = [
  { name: "That Tote", href: "/product/amiras-tote" },
  { name: "The Quiet Mug", href: "/product/quiet-mug" },
  { name: "The Notebook", href: "/product/notebook-of-mild-opinions" },
];

type ProductPageProps = {
  params: { handle: string } | Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = products[resolvedParams.handle as keyof typeof products];

  if (!product) {
    notFound();
  }

  const otherProducts = alsoLikes.filter((p) => p.href !== `/product/${resolvedParams.handle}`).slice(0, 2);

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
                  {product.materials}
                </p>
              </div>
              <div className="soft-card bg-[var(--color-mint)]/70 p-5 tilt-right">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gray-500)]">
                  Care
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                  {product.care}
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
            </div>
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                Size
                <div className="flex items-center justify-between">
                  <select className="flex-1 rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)]">
                    {product.variants.map((variant) => (
                      <option key={variant}>{variant}</option>
                    ))}
                  </select>
                  <span className="ml-4 text-xs link-underline cursor-pointer whitespace-nowrap">
                    Figure out your size
                  </span>
                </div>
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
              <Button>Get One</Button>
              <Button variant="secondary" href="/available">
                Back to offerings
              </Button>
            </div>
            <div className="grid gap-3 text-xs text-[var(--color-gray-500)]">
              <p>Ships in 3–7 business days. Maybe faster.</p>
              <p>Something wrong? Let us know.</p>
            </div>
            <Card className="bg-[var(--color-gray-100)] perspective-slab">
              <h3 className="font-display text-lg">Specifications</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-gray-500)]">
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {otherProducts.length > 0 && (
        <section className="page-shell section-pad">
          <h2 className="font-display text-2xl">Other things Bubby likes</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {otherProducts.map((p) => (
              <Link key={p.href} href={p.href} className="text-sm link-underline">
                {p.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
