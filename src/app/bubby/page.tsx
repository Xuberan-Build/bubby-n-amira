import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PhotoCarousel from "@/components/ui/PhotoCarousel";
import Blob from "@/components/ui/Blob";

const credentials = [
  { label: "Specialty", value: "Facial Kneading & Purr Therapy" },
  { label: "Certification", value: "Self-Issued, 2021" },
  { label: "Accepting clients", value: "At his discretion" },
  { label: "Languages", value: "Meow. Some body language." },
  { label: "Education", value: "Observational. Extensive." },
  { label: "Approach", value: "Unilateral" },
];

const timeline = [
  {
    year: "2019",
    title: "Joined the practice",
    desc: "Arrived without notice. Established residency. No paperwork was signed.",
  },
  {
    year: "2020",
    title: "Opened the wellness division",
    desc: "Began offering facial treatments during the lockdown period. Clients were captive. Results were mixed.",
  },
  {
    year: "2021",
    title: "Self-certified",
    desc: "Issued his own credentials. The process was internal. The standards are not publicly available.",
  },
  {
    year: "2023",
    title: "Expanded to social media",
    desc: "Amira began documenting the practice. Bubby did not consent but has not objected.",
  },
  {
    year: "2024",
    title: "Launched the practice store",
    desc: "Approved a curated selection of equipment. Amira handled the logistics. She was not thanked.",
  },
];

const philosophy = [
  {
    num: "I",
    title: "Presence is the treatment",
    body: "Bubby does not schedule sessions. He arrives when the client requires intervention, as determined solely by Bubby. Advance notice is not part of the methodology.",
  },
  {
    num: "II",
    title: "The client does not know what they need",
    body: "Eligibility is assessed silently. Criteria are not disclosed. If Bubby has selected you, you have been selected. This is sufficient.",
  },
  {
    num: "III",
    title: "Results are guaranteed",
    body: "Outcomes are determined by Bubby. All results are correct by definition. Client feedback is received but not incorporated.",
  },
];

export default function BubbyPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── Bio header ── */}
      <section className="relative page-shell section-pad">
        <Blob id="bubby-hero-r" variant={2} fill="var(--color-lavender)"
          style={{ width: 400, height: 400, top: -80, right: -180, opacity: 0.5 }}
          className="blob-slow"
        />
        <Blob id="bubby-hero-l" variant={4} fill="var(--color-pink)"
          style={{ width: 320, height: 320, bottom: -60, left: -160, opacity: 0.45 }}
        />
        <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[480px] bg-[var(--color-gray-100)]">
            <Image
              src="/images/meet-bubby/meetbubby_section1.webp"
              alt="Bubby — Practitioner"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div className="bg-[var(--color-white)] px-10 py-12 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
              Meet the practitioner
            </p>
            <h1 className="font-display text-5xl font-light mb-2">Bubby</h1>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] mb-8 pb-8 border-b border-[var(--color-gray-100)]">
              Licensed Wellness Practitioner &amp; Facial Specialist — Est. whenever he decided
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-4">
              Bubby is a cat with a rich inner life and an esthetician practice that
              nobody asked about. He is deeply committed to Amira and completely
              indifferent to everyone else.
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-10">
              He has favorites. He will let you know. He is accepting new clients
              on a rolling basis, subject to his own eligibility criteria, which
              are not publicly available.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/available">View practice equipment</Button>
              <Button href="/amira" variant="secondary">Meet the office manager</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo carousel ── */}
      <section className="page-shell pb-16">
        <PhotoCarousel
          slides={[
            { src: "/images/meet-bubby/meetbubby_section1_1.webp", alt: "Bubby in practice",      pos: "50% 15%" },
            { src: "/images/meet-bubby/meetbubby_section1_2.webp", alt: "Bubby assessing a client", pos: "50% 30%" },
            { src: "/images/meet-bubby/meetbubby_section1_2b.webp", alt: "Bubby at rest",          pos: "50% 20%" },
            { src: "/images/meet-bubby/meetbubby_section1_3.webp", alt: "Bubby considering you",  pos: "45% 22%" },
            { src: "/images/meet-bubby/meetbubby_section1_4.webp", alt: "Bubby in session",       pos: "50% 50%" },
          ]}
          interval={3200}
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="aspect-[3/1] min-h-[240px] border border-[var(--color-gray-100)]"
        />
      </section>

      {/* ── Credentials ── */}
      <div className="relative border-t border-[var(--color-gray-100)]">
        <Blob id="bubby-cred-r" variant={1} fill="var(--color-mint)"
          style={{ width: 360, height: 360, top: -80, right: -160, opacity: 0.45 }}
        />
        <div className="page-shell py-14">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
            Credentials &amp; qualifications
          </p>
          <h2 className="font-display text-3xl font-light mb-10">
            Fully certified. By himself.
          </h2>
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-3">
            {credentials.map((c) => (
              <div key={c.label} className="bg-[var(--color-white)] px-7 py-8">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] mb-3">
                  {c.label}
                </p>
                <p className="font-display text-lg font-light">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Practice Philosophy (new) ── */}
      <div className="relative border-t border-[var(--color-gray-100)]">
        <Blob id="bubby-phil-l" variant={3} fill="var(--color-peach)"
          style={{ width: 340, height: 340, top: -60, left: -160, opacity: 0.45 }}
          className="blob-slow"
        />
        <div className="page-shell py-14">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
            Practice philosophy
          </p>
          <h2 className="font-display text-3xl font-light mb-10">
            The methodology. It is not up for discussion.
          </h2>
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-3">
            {philosophy.map((p) => (
              <div key={p.num} className="bg-[var(--color-white)] px-7 py-8">
                <p className="font-display text-4xl font-light text-[var(--color-gray-100)] mb-4">
                  {p.num}
                </p>
                <p className="font-display text-xl font-light mb-4">{p.title}</p>
                <p className="text-sm leading-relaxed text-[var(--color-gray-500)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="border-t border-[var(--color-gray-100)]">
        <div className="page-shell py-14">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
            Practice history
          </p>
          <h2 className="font-display text-3xl font-light mb-10">
            A distinguished career.
          </h2>
          <div className="border border-[var(--color-gray-100)]">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`grid grid-cols-[80px_1fr] gap-6 px-7 py-7 ${i < timeline.length - 1 ? "border-b border-[var(--color-gray-100)]" : ""}`}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] pt-1">
                  {item.year}
                </p>
                <div>
                  <p className="font-display text-lg font-light mb-2">{item.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--color-gray-500)]">{item.desc}</p>
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
            &ldquo;He assessed me. I passed. I don&apos;t know the criteria.
            I&apos;m displaying my certification.&rdquo;
          </blockquote>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gray-500)]">
            Verified client — certified by Bubby
          </p>
          <div className="mt-10">
            <Link href="/available" className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] link-underline">
              View practice equipment →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
