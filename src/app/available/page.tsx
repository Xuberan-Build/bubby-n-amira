import Image from "next/image";
import Link from "next/link";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import Blob from "@/components/ui/Blob";

const offerings = [
  {
    name: "The Grooming Brush",
    role: "Grooming Station — Professional Grade",
    detail: "Bubby's actual grooming brush. The one that started this. Installed without notice. Results speak for themselves.",
    href: "/product/grooming-brush",
    status: "available",
    image: "/images/products/thewallbrush2.webp",
  },
  {
    name: "The Bubby Blanket",
    role: "Treatment Table — Official",
    detail: "Soft. He approves. That's the whole review. He selected this. You did not. It is available to you anyway.",
    href: "/product/bubby-blanket",
    status: "available",
    image: "/images/products/bubbyblanket1.webp",
  },
  {
    name: "The Bubby Tee",
    role: "Practice Apparel — Client-Issued",
    detail: "100% cotton. Made for you when you order. Pre-shrunk. Bubby on it. Wear it accordingly.",
    href: "/product/bubby-tee",
    status: "available",
    image: "/images/products/bubbytshirt.webp",
  },
  {
    name: "The Sticker Sheet",
    role: "Practice Certifications — Issued by Bubby",
    detail: "Artist being sourced. Display yours when available. Eligibility is assumed if you are reading this.",
    href: "/product/sticker-sheet",
    status: "coming-soon",
    image: null,
  },
];

export default function AvailablePage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── Page header ── */}
      <section className="relative page-shell section-pad">
        <Blob id="store-hero-r" variant={2} fill="var(--color-peach)"
          style={{ width: 400, height: 400, top: -80, right: -180, opacity: 0.5 }}
        />
        <Blob id="store-hero-l" variant={1} fill="var(--color-yellow)"
          style={{ width: 320, height: 320, bottom: -60, left: -160, opacity: 0.45 }}
          className="blob-slow"
        />
        <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] lg:grid-cols-[1fr_1fr]">
          <div className="bg-[var(--color-white)] px-10 py-14 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
              Practice store
            </p>
            <h1 className="font-display text-4xl font-light leading-snug mb-6 md:text-5xl">
              Official practice equipment.<br />Sourced and approved by Bubby.
            </h1>
            <p className="text-sm leading-relaxed text-[var(--color-gray-500)] max-w-md">
              Amira was not consulted on any of these selections. If it is on
              this page, Bubby has approved it. If it is not on this page, he
              has not approved it yet. Check back.
            </p>
          </div>
          <div className="relative min-h-[340px] bg-[var(--color-gray-100)]">
            <Image
              src="/images/shop/shopall_section1.webp"
              alt="Bubby n Amira — Practice Store"
              fill
              className="object-cover object-[50%_38%]"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Product grid ── */}
      <div className="border-t border-[var(--color-gray-100)]">
        <div className="page-shell py-14">
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-2">
            {offerings.map((item) => (
              <div key={item.name} className="bg-[var(--color-white)] flex flex-col relative group cursor-pointer">
                <div className="relative h-64 bg-[var(--color-gray-100)]">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  {item.status === "coming-soon" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-[var(--color-white)] px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                        Coming soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="px-8 py-8 flex-1 flex flex-col">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] mb-2">
                    {item.role}
                  </p>
                  <p className="font-display text-2xl font-light mb-3">{item.name}</p>
                  <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-8 flex-1">
                    {item.detail}
                  </p>
                  <div className="flex items-center gap-6">
                    <Link
                      href={item.href}
                      className="absolute inset-0 z-[1]"
                      aria-label={`View details for ${item.name}`}
                    />
                    <span className="relative z-[2] text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] link-underline pointer-events-none">
                      View details →
                    </span>
                    {item.status === "coming-soon" && (
                      <span className="relative z-[2]">
                        <WaitlistButton source="coming-soon" variant="secondary">
                          notify me
                        </WaitlistButton>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quote ── */}
      <div className="border-t border-[var(--color-gray-100)]">
        <div className="page-shell py-14 text-center">
          <blockquote className="font-display text-2xl font-light italic leading-relaxed max-w-2xl mx-auto mb-4 md:text-3xl">
            &ldquo;He selected it. That&apos;s the whole endorsement.
            I bought it. I don&apos;t regret it.&rdquo;
          </blockquote>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gray-500)]">
            Verified client — certified by Bubby
          </p>
        </div>
      </div>
    </div>
  );
}
