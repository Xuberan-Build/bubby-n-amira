import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="page-shell section-pad-lg">
      <h1 className="font-display text-4xl">That page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-sm text-[var(--color-gray-500)]">
        Not sure what you were looking for, but it&apos;s not here. Maybe it
        never was.
      </p>
      <div className="mt-8">
        <Button href="/">Go home</Button>
      </div>
    </div>
  );
}
