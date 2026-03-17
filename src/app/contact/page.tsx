import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="page-shell section-pad-lg">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div>
          <h1 className="font-display text-4xl">Contact</h1>
          <p className="mt-4 max-w-xl text-sm text-[var(--color-gray-500)]">
            You can email us. We&apos;ll probably respond.
          </p>
          <p className="mt-1 text-xs text-[var(--color-gray-500)]">
            We try to respond within a couple days. No promises.
          </p>

          <form className="mt-10 grid max-w-xl gap-5">
        <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
          Your name
          <input
            type="text"
            name="name"
            className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
          />
        </label>
        <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
          Email
          <input
            type="email"
            name="email"
            className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
          />
        </label>
        <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
          What&apos;s up
          <textarea
            name="message"
            rows={5}
            className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none resize-none"
          />
        </label>
        <div>
          <button
            type="submit"
            className="rounded-2xl bg-[var(--color-charcoal)] px-8 py-3 text-sm text-white transition hover:opacity-80"
          >
            Send It
          </button>
          </div>
        </form>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl lg:sticky lg:top-28">
          <Image
            src="/images/contact/contactus_section1_priority.webp"
            alt="Bubby and Amira"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </div>
  );
}
