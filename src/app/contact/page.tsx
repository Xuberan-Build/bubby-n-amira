import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="page-shell section-pad-lg">
      <h1 className="font-display text-4xl">Say hi</h1>
      <p className="mt-4 max-w-xl text-sm text-[var(--color-gray-500)]">
        Email works best. We answer in 24-48 hours, unless there&apos;s tea.
      </p>
      <div className="mt-6">
        <Button href="mailto:hello@bubbynamira.com">Email us</Button>
      </div>
    </div>
  );
}
