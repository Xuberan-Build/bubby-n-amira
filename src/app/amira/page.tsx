import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function MeetUsPage() {
  return (
    <div className="relative overflow-hidden">
      <Blob
        className="blob-slow right-[-60px] top-20 h-72 w-72"
        style={{
          background:
            "radial-gradient(circle at 60% 30%, #e5d9f2, #d5f4e6 60%, #fefefe 100%)",
        }}
      />

      <section className="page-shell section-pad-lg relative">
        <div className="fade-up space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
            Meet Us
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            A cat and his person. That&apos;s the whole thing.
          </h1>
          <p className="max-w-xl text-base text-[var(--color-gray-500)] md:text-lg">
            Bubby showed up and never left. Amira adapted. Somewhere in there, a
            brand happened.
          </p>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid gap-7 md:grid-cols-2">
          <Card className="bg-[var(--color-peach)]/70 perspective-slab">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Bubby
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-gray-500)]">
              Cat. Esthetician (self-appointed). Deeply attached to Amira in a
              way that is, at times, a lot. Has opinions about blankets.
            </p>
          </Card>
          <Card className="bg-[var(--color-mint)]/80 perspective-slab-right">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Amira
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-gray-500)]">
              Bubby&apos;s person. Did not sign up for this but here she is.
              Handles the creative side and tries to keep Bubby from running the
              business into the ground.
            </p>
          </Card>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="soft-card bg-[var(--color-gray-100)] p-10 md:p-14 perspective-slab">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="font-display text-2xl">What we make</h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-gray-500)]">
                Stuff Bubby likes. Products that feel like they belong in his
                world. Nothing we&apos;d be embarrassed to put our name on.
                Nothing we&apos;d be embarrassed to admit he picked.
              </p>
            </div>
            <div>
              <Button href="/available">See what he&apos;s into</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
