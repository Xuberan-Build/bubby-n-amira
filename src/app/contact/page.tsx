export default function ContactPage() {
  return (
    <div className="page-shell section-pad-lg">
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
  );
}
