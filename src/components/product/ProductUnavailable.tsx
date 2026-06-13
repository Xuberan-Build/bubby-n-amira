import Link from "next/link";
import Button from "@/components/ui/Button";

export type ProductUnavailableProps = {
  name: string;
  role?: string;
  buyUrl: string;
  onRetry?: () => void;
};

export default function ProductUnavailable({
  name,
  role,
  buyUrl,
  onRetry,
}: ProductUnavailableProps) {
  return (
    <section className="page-shell section-pad">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)]">
        Front desk note
      </p>

      <h1 className="font-display text-4xl font-light text-[var(--color-charcoal)] mt-3">
        Bubby stepped away from the desk.
      </h1>

      <p className="text-[var(--color-gray-500)] mt-4 max-w-xl">
        The live listing for{" "}
        <span className="text-[var(--color-charcoal)]">{name}</span>
        {role ? ` (${role})` : ""} didn&apos;t load just now. The item is still
        very much available — Bubby simply wasn&apos;t at the front desk to pull
        the file. You can complete your order directly on the store.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href={buyUrl}>Buy {name} →</Button>
        <Button variant="secondary" href="/available">
          Back to the store
        </Button>
        {onRetry ? (
          <Button variant="ghost" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </div>

      <p className="text-[var(--color-gray-500)] mt-6 text-sm">
        Something wrong?{" "}
        <Link href="/contact" className="link-underline">
          Let us know.
        </Link>
      </p>
    </section>
  );
}
