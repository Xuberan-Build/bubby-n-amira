import Image from "next/image";
import Link from "next/link";
import WaitlistButton from "@/components/waitlist/WaitlistButton";

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
  },
  {
    name: "The Wall Brush",
    role: "Grooming station — professional",
    note: "Installed without notice.",
    href: "/product/wall-brush",
  },
  {
    name: "The Sticker Sheet",
    role: "Practice certifications — issued by Bubby",
    note: "Display yours accordingly.",
    href: "/product/sticker-sheet",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        <Image
          src="/images/home/home_section1.webp"
          alt="Bubby's Health & Wellness Practice"
          fill
          className="object-cover object-[50%_75%] md:object-[48%_82%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 page-shell pb-10 pt-0">
          <p className="text-xs uppercase tracking-[0.18em] text-white/70 mb-2">
            Bubby&apos;s Health &amp; Wellness Practice
          </p>
          <h1 className="font-display text-4xl font-light leading-snug text-white md:text-5xl">
            Accepting new clients.<br />He will decide if you qualify.
          </h1>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <div className="border-b border-[var(--color-gray-100)]">
        <div className="page-shell grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--color-gray-100)]">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gray-500)] mb-1">
                {s.label}
              </p>
              <p className="font-display text-base font-light">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section className="page-shell section-pad">
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
      </section>

      {/* ── Social proof strip ── */}
      <div className="border-y border-[var(--color-gray-100)]">
        <div className="page-shell py-10">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-6 text-center">
            Practice reach
          </p>
          <div className="grid grid-cols-2 gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-4">
            {[
              { stat: "445K", label: "TikTok followers" },
              { stat: "58.4M", label: "TikTok likes" },
              { stat: "4+", label: "Years in practice" },
              { stat: "∞", label: "Bubby's confidence" },
            ].map((item) => (
              <div key={item.label} className="bg-[var(--color-white)] px-6 py-8 text-center">
                <p className="font-display text-4xl font-light mb-2">{item.stat}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Amira / Meet the team ── */}
      <section className="page-shell section-pad">
        <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-2">
          <div className="relative bg-[var(--color-gray-100)] min-h-[340px]">
            <Image
              src="/images/meet-us/meetus_section1.webp"
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
      </section>

      {/* ── Practice Equipment ── */}
      <section className="border-t border-[var(--color-gray-100)]">
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
                <div className="h-44 bg-[var(--color-gray-100)]" />
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
      <div className="border-y border-[var(--color-gray-100)]">
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

      {/* ── Waitlist ── */}
      <div className="page-shell py-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-4">
          Join the client waitlist
        </p>
        <p className="font-display text-xl font-light mb-7">
          Bubby will be in touch when he decides you are ready.
        </p>
        <WaitlistButton source="homepage-cta">sure i like you, add me</WaitlistButton>
      </div>
    </div>
  );
}
