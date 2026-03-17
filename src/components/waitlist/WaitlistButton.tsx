"use client";

import Button from "@/components/ui/Button";
import { useWaitlist } from "@/components/waitlist/WaitlistProvider";

type WaitlistButtonProps = {
  source?: "homepage-cta" | "footer-cta" | "coming-soon" | "manual";
  children: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export default function WaitlistButton({
  source = "manual",
  children,
  className,
  variant = "primary",
}: WaitlistButtonProps) {
  const { openWaitlist } = useWaitlist();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => openWaitlist(source)}
    >
      {children}
    </Button>
  );
}
