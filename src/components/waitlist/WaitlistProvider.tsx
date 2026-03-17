"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import WaitlistModal, {
  type WaitlistSource,
} from "@/components/waitlist/WaitlistModal";

type WaitlistContextValue = {
  isOpen: boolean;
  source: WaitlistSource;
  openWaitlist: (source?: WaitlistSource) => void;
  closeWaitlist: () => void;
  markSubmitted: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

const DISMISSED_KEY = "bubby_waitlist_dismissed_at";
const SUBMITTED_KEY = "bubby_waitlist_submitted_at";
const COOLDOWN_MS = 1000 * 60 * 60 * 24 * 14;
const EXIT_INTENT_THRESHOLD = 24;

function isOnCooldown(storageKey: string) {
  if (typeof window === "undefined") return false;

  const value = window.localStorage.getItem(storageKey);
  if (!value) return false;

  const timestamp = Number(value);
  if (!Number.isFinite(timestamp)) return false;

  return Date.now() - timestamp < COOLDOWN_MS;
}

function setTimestamp(storageKey: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, String(Date.now()));
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<WaitlistSource>("manual");

  const openWaitlist = useCallback((nextSource: WaitlistSource = "manual") => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => {
    setIsOpen(false);
    setTimestamp(DISMISSED_KEY);
  }, []);

  const markSubmitted = useCallback(() => {
    setTimestamp(SUBMITTED_KEY);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    if (isOnCooldown(DISMISSED_KEY) || isOnCooldown(SUBMITTED_KEY)) return;
    if (typeof window === "undefined") return;

    function handleMouseOut(event: MouseEvent) {
      const relatedTarget = event.relatedTarget as Node | null;
      const leavingViewport =
        !relatedTarget && event.clientY <= EXIT_INTENT_THRESHOLD;

      if (!leavingViewport) return;

      openWaitlist("homepage-auto");
      window.removeEventListener("mouseout", handleMouseOut);
    }

    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [pathname, openWaitlist]);

  const value = useMemo<WaitlistContextValue>(
    () => ({
      isOpen,
      source,
      openWaitlist,
      closeWaitlist,
      markSubmitted,
    }),
    [closeWaitlist, isOpen, markSubmitted, openWaitlist, source]
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal
        isOpen={isOpen}
        source={source}
        onClose={closeWaitlist}
        onSubmitted={markSubmitted}
      />
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);

  if (!context) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }

  return context;
}
