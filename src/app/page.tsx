import Image from "next/image";
import Link from "next/link";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import PhotoCarousel from "@/components/ui/PhotoCarousel";
import HeroVideo from "@/components/ui/HeroVideo";
import Blob from "@/components/ui/Blob";

const stats = [
  { label: "Established", value: "Without notice" },
  { label: "Services offered", value: "Six (and growing)" },
  { label: "Practitioner", value: "Bubby" },
  { label: "Office Manager", value: "Not by choice" },
];

const services = [
  {
    num: "01",
    name: "Facial Treatments",
    desc: "Kneading technique. Results guaranteed by Bubby. Amira has no input on outcomes.",
  },
  {
    num: "02",
    name: "Sound Healing",
    desc: "Purring. Non-negotiable frequency. Available when Bubby decides to provide it.",
  },
  {
    num: "03",
    name: "Sleep Therapy",
    desc: "He selects your sleeping position. This is the treatment. Resistance is noted.",
  },
  {
    num: "04",
    name: "Weight Management",
    desc: "He sits on you. Duration determined by Bubby. Results are ongoing.",
  },
  {
    num: "05",
    name: "Breathwork",
    desc: "His face directly on yours. This is the method. Sessions are unscheduled.",
  },
  {
    num: "06",
    name: "Emotional Support",
    desc: "Available when he decides. Not before. Eligibility criteria are internal.",
  },
];

const products = [
  {
    name: "The Bubby Blanket",
    role: "Kneading blanket — official",
    note: "He selected this. You did not.",
    href: "/product/bubby-blanket",
    image: "/images/products/bubbyblanket1.webp",
  },
  {
    name: "The Wall Brush",
    role: "Grooming station — professional",
    note: "Installed without notice.",
    href: "/product/wall-brush",
    image: "/images/products/thewallbrush1.webp",
  },
  {
    name: "The Sticker Sheet",
    role: "Practice certifications — issued by Bubby",
    note: "Display yours accordingly.",
    href: "/product/sticker-sheet",
    image: null,
  },
];

export default function Home() {
  return (
    // overflow-x:hidden on the root prevents horizontal scroll
    // overflow-y is visible so blobs bleed freely across section boundaries
    <div style={{ overflowX: "hidden" }}>
      {/* ── Hero ── */}
      <HeroVideo />

      {/* ── Stat strip ── */}
      <div className="border-b border-[var(--color-gray-100)]">
        <div className="page-shell grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--color-gray-100)]">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] mb-1 md:text-[10px] md:text-[var(--color-gray-500)] md:tracking-[0.16em]">
                {s.label}
              </p>
              <p className="font-display text-base font-light">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section className="relative">
        {/* lavender cluster, top-right, bleeds into stat strip above */}
        <Blob id="svc-r" variant={2} fill="var(--color-lavender)"
          style={{ width: 440, height: 440, top: -160, right: -160, opacity: 0.55 }}
          className="blob-slow"
        />
        {/* mint cluster, bottom-left, bleeds into practice reach below */}
        <Blob id="svc-l" variant={4} fill="var(--color-mint)"
          style={{ width: 380, height: 380, bottom: -140, left: -160, opacity: 0.45 }}
        />
        <div className="page-shell section-pad">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
            Our services
          </p>
          <h2 className="font-display text-3xl font-light leading-snug mb-10 md:text-4xl">
            A full suite of wellness offerings.<br />Bubby determines your eligibility.
          </h2>
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-3">
            {services.map((s) => (
              <div key={s.num} className="bg-[var(--color-white)] px-7 py-8">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] mb-3">
                  {s.num}
                </p>
                <p className="font-display text-xl font-light mb-3">{s.name}</p>
                <p className="text-sm leading-relaxed text-[var(--color-gray-500)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <div className="border-y border-[var(--color-gray-100)]">
        <div className="page-shell py-10">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-6 text-center">
            Practice reach
          </p>
          <div className="grid grid-cols-2 gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-4">
            {[
              { stat: "445K", label: "TikTok followers",   bg: "var(--color-pink)" },
              { stat: "89K",  label: "Facebook followers", bg: "var(--color-lavender)" },
              { stat: "56K",  label: "Instagram followers", bg: "var(--color-peach)" },
              { stat: "∞",    label: "Bubby's confidence", bg: "var(--color-mint)" },
            ].map((item) => (
              <div key={item.label} className="px-6 py-8 text-center" style={{ background: item.bg }}>
                <p className="font-display text-4xl font-light mb-2 text-[var(--color-charcoal)]">
                  {item.stat}
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Moments carousel ── */}
      <PhotoCarousel
        slides={[
          { src: "/images/home/home_section1.webp",      alt: "Bubby in practice" },
          { src: "/images/home/home_section1_2.webp",    alt: "Bubby smushing Amira" },
          { src: "/images/home/home_section1_3.webp",    alt: "Bubby on the job" },
          { src: "/images/home/home_section1_alt1.webp", alt: "Bubby at work" },
          { src: "/images/home/home_section1_alt2.webp", alt: "Bubby and Amira" },
        ]}
        interval={4000}
        sizes="100vw"
        className="h-[480px] md:h-[580px]"
      />

      {/* ── Amira / Meet the team ── */}
      <section className="relative">
        {/* pink cluster, left side */}
        <Blob id="amira-l" variant={1} fill="var(--color-pink)"
          style={{ width: 400, height: 400, top: 20, left: -180, opacity: 0.6 }}
          className="blob-slow"
        />
        {/* lavender cluster, right side */}
        <Blob id="amira-r" variant={3} fill="var(--color-lavender)"
          style={{ width: 340, height: 340, bottom: -80, right: -160, opacity: 0.45 }}
        />
        <div className="page-shell section-pad">
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-2">
            <div className="relative bg-[var(--color-gray-100)] min-h-[340px]">
              <Image
                src="/images/home/aboutus_section1.webp"
                alt="Amira"
                fill
                className="object-cover object-[50%_30%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="bg-[var(--color-white)] px-10 py-12 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
                Office management
              </p>
              <h2 className="font-display text-3xl font-light mb-5">Not Bubby</h2>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-2">
                Amira manages operations for the practice. Scheduling, communications,
                documentation, and content. She did not apply. There was no interview.
                One day the practice existed and she was running it.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-8">
                She is very tired. The practice is thriving.
              </p>
              <Link
                href="/amira"
                className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] link-underline self-start"
              >
                Meet Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice Store ── */}
      <section className="relative border-t border-[var(--color-gray-100)]">
        {/* peach cluster, right side */}
        <Blob id="store-r" variant={2} fill="var(--color-peach)"
          style={{ width: 460, height: 460, top: -120, right: -180, opacity: 0.5 }}
        />
        {/* yellow cluster, left side */}
        <Blob id="store-l" variant={1} fill="var(--color-yellow)"
          style={{ width: 360, height: 360, bottom: -100, left: -160, opacity: 0.5 }}
          className="blob-slow"
        />
        <div className="page-shell section-pad">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
            Practice store
          </p>
          <h2 className="font-display text-3xl font-light leading-snug mb-10 md:text-4xl">
            Official practice equipment.<br />Approved by Bubby.
          </h2>
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className="bg-[var(--color-white)] flex flex-col">
                <div className="relative h-44 bg-[var(--color-gray-100)]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                        Coming soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="px-6 py-5 flex-1">
                  <p className="font-display text-lg font-light mb-1">{p.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-gray-500)] mb-3">
                    {p.role}
                  </p>
                  <p className="text-sm text-[var(--color-gray-500)]">{p.note}</p>
                </div>
                <Link
                  href={p.href}
                  className="block text-center border-t border-[var(--color-gray-100)] px-6 py-3 text-[10px] uppercase tracking-[0.12em] text-[var(--color-gray-500)] hover:bg-[var(--color-gray-100)] transition-colors"
                >
                  View in store
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <div className="relative border-y border-[var(--color-gray-100)]">
        <Blob id="quote-r" variant={3} fill="var(--color-lavender)"
          style={{ width: 300, height: 300, top: -60, right: -120, opacity: 0.45 }}
          className="blob-slow"
        />
        <Blob id="quote-l" variant={1} fill="var(--color-pink)"
          style={{ width: 260, height: 260, bottom: -60, left: -100, opacity: 0.4 }}
        />
        <div className="page-shell py-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-8">
            Client testimonials
          </p>
          <blockquote className="font-display text-2xl font-light italic leading-relaxed max-w-2xl mx-auto mb-4 md:text-3xl">
            &ldquo;He assessed me. I passed. I don&apos;t know the criteria.
            I&apos;m displaying my certification.&rdquo;
          </blockquote>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gray-500)]">
            Verified client — certified by Bubby
          </p>
        </div>
      </div>

      {/* ── Waitlist CTA ── */}
      <div className="relative">
        {/* large coral cluster centered — warmest, most inviting, primary CTA */}
        <Blob id="wl-c" variant={2} fill="var(--color-coral)"
          style={{ width: 560, height: 560, top: "50%", left: "50%", marginTop: -280, marginLeft: -280, opacity: 0.2 }}
          className="blob-slow"
        />
        <Blob id="wl-r" variant={4} fill="var(--color-pink)"
          style={{ width: 300, height: 300, top: -80, right: -120, opacity: 0.4 }}
        />
        <Blob id="wl-l" variant={1} fill="var(--color-peach)"
          style={{ width: 260, height: 260, bottom: -60, left: -100, opacity: 0.4 }}
          className="blob-slow"
        />
        <div className="page-shell py-14 text-center relative">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-4">
            Join the client waitlist
          </p>
          <p className="font-display text-xl font-light mb-7">
            Bubby will be in touch when he decides you are ready.
          </p>
          <WaitlistButton source="homepage-cta">Join His Waitlist</WaitlistButton>
        </div>
      </div>
    </div>
  );
}
