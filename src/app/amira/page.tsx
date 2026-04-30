import Image from "next/image";
import Button from "@/components/ui/Button";
import PhotoCarousel from "@/components/ui/PhotoCarousel";
import Blob from "@/components/ui/Blob";

const socialStats = [
  { stat: "445K", label: "TikTok followers" },
  { stat: "89K", label: "Facebook followers" },
  { stat: "56K", label: "Instagram followers" },
  { stat: "∞", label: "Bubby's demands" },
];

export default function MeetUsPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── Hero ── */}
      <section className="relative page-shell section-pad">
        <Blob id="amira-hero-r" variant={2} fill="var(--color-pink)"
          style={{ width: 380, height: 380, top: -60, right: -180, opacity: 0.5 }}
          className="blob-slow"
        />
        <Blob id="amira-hero-l" variant={4} fill="var(--color-lavender)"
          style={{ width: 300, height: 300, bottom: -80, left: -150, opacity: 0.45 }}
        />
        <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] lg:grid-cols-[1.1fr_0.9fr]">
          {/* Photo carousel */}
          <PhotoCarousel
            slides={[
              { src: "/images/meet-us/meetus_section1.webp",   alt: "Bubby and Amira", pos: "50% 28%" },
              { src: "/images/meet-us/meetus_section1_1.webp", alt: "Bubby and Amira", pos: "50% 22%" },
              { src: "/images/meet-us/meetus_section1_2.webp", alt: "Bubby and Amira", pos: "50% 32%" },
            ]}
            interval={3800}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="min-h-[420px]"
          />

          {/* Intro text */}
          <div className="bg-[var(--color-white)] px-10 py-12 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
              Meet Us
            </p>
            <h1 className="font-display text-4xl font-light leading-snug mb-6 md:text-5xl">
              A cat and his person.<br />That&apos;s the whole thing.
            </h1>
            <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-10">
              Bubby showed up and never left. Amira adapted. Somewhere in there,
              a brand happened. Nobody planned this. It is thriving anyway.
            </p>
            <Button href="/available">See what he&apos;s into</Button>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <div className="border-t border-[var(--color-gray-100)]">
        <div className="page-shell py-14">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
            The team
          </p>
          <h2 className="font-display text-3xl font-light mb-10">
            One runs the practice. One manages the admin.
          </h2>
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-[1.4fr_1fr]">
            {/* Bubby — more space, top billing */}
            <div className="bg-[var(--color-white)] px-8 py-10">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] mb-3">
                Practitioner
              </p>
              <p className="font-display text-3xl font-light mb-2">Bubby</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-gray-500)] mb-6 pb-6 border-b border-[var(--color-gray-100)]">
                Wellness Practitioner &amp; Chief Decision-Maker
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-3">
                Cat. Esthetician (self-appointed). Deeply attached to Amira in a
                way that is, at times, a lot. Has opinions about blankets,
                sleeping arrangements, and your face.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)]">
                He decides when the practice is open. He decides who is seen.
                He has never been wrong, as far as he is concerned.
              </p>
            </div>

            {/* Amira — clearly doing all the work */}
            <div className="bg-[var(--color-gray-100)] px-8 py-10">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] mb-3">
                Office Manager
              </p>
              <p className="font-display text-3xl font-light mb-2">Amira</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-gray-500)] mb-6 pb-6 border-b border-[var(--color-gray-500)]/20">
                Operations, Content, Logistics &amp; Everything Else
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)] mb-3">
                Bubby&apos;s person. Did not apply for this role. There was no
                interview. The practice simply existed one day and she was
                running it.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)]">
                Handles scheduling, content, communications, logistics, and
                Bubby. She is very tired. The practice is thriving.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Relationship — full-width editorial ── */}
      <div className="relative border-t border-[var(--color-gray-100)]">
        <Blob id="amira-love-r" variant={1} fill="var(--color-mint)"
          style={{ width: 360, height: 360, top: -60, right: -160, opacity: 0.45 }}
        />
        <Blob id="amira-love-l" variant={3} fill="var(--color-peach)"
          style={{ width: 300, height: 300, bottom: -60, left: -140, opacity: 0.4 }}
          className="blob-slow"
        />
        <div className="page-shell py-14">
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-2">
            <div className="bg-[var(--color-white)] px-10 py-14 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-6">
                The dynamic
              </p>
              <p className="font-display text-4xl font-light leading-snug mb-6 md:text-5xl">
                Unconditional.<br />Uncontrollable.<br />Love.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)] max-w-sm">
                Bubby follows Amira everywhere. He supervises everything.
                He has opinions about her schedule, her sleep, and her posture.
                She did not ask for any of this. She would not trade it.
              </p>
            </div>
            <div className="relative min-h-[400px] bg-[var(--color-gray-100)]">
              <Image
                src="/images/meet-us/meetus_sleeping.webp"
                alt="Bubby and Amira sleeping"
                fill
                className="object-cover object-[45%_42%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Social proof ── */}
      <div className="border-t border-[var(--color-gray-100)]">
        <div className="page-shell py-14">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
            Practice reach
          </p>
          <h2 className="font-display text-3xl font-light mb-10">
            The numbers. Bubby is not impressed by them.
          </h2>
          <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-4">
            {socialStats.map((item) => (
              <div key={item.label} className="bg-[var(--color-white)] px-8 py-10 text-center">
                <p className="font-display text-5xl font-light mb-3">{item.stat}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
