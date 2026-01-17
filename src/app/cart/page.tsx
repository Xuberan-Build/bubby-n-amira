import Button from "@/components/ui/Button";

export default function CartPage() {
  const hasItems = false;

  return (
    <div className="page-shell section-pad-lg">
      <h1 className="font-display text-4xl">Cart</h1>
      {hasItems ? (
        <div className="mt-8 grid gap-6">
          <div className="soft-card bg-[var(--color-gray-100)] p-6">
            Line items go here.
          </div>
          <div className="soft-card bg-[var(--color-gray-100)] p-6">
            Summary goes here.
          </div>
          <Button>Proceed to checkout</Button>
        </div>
      ) : (
        <div className="mt-8 soft-card bg-[var(--color-gray-100)] p-10 text-center">
          <p className="text-sm text-[var(--color-gray-500)]">
            Nothing here yet. It&apos;s okay. We can keep it quiet.
          </p>
          <div className="mt-6">
            <Button href="/available">See what&apos;s available</Button>
          </div>
        </div>
      )}
    </div>
  );
}
