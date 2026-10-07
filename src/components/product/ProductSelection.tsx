"use client";

import { createContext, useContext, useState } from "react";

// Shared variant-option selection so the gallery can follow the picker
// (e.g. choosing "Black" shows the black mockup) and vice versa.
type Selection = {
  selected: Record<string, string>;
  setOption: (name: string, value: string) => void;
};

const ProductSelectionContext = createContext<Selection | null>(null);

export function ProductSelectionProvider({
  initial,
  children,
}: {
  initial: Record<string, string>;
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState(initial);
  const setOption = (name: string, value: string) =>
    setSelected((prev) => ({ ...prev, [name]: value }));
  return (
    <ProductSelectionContext.Provider value={{ selected, setOption }}>
      {children}
    </ProductSelectionContext.Provider>
  );
}

export function useProductSelection(): Selection {
  const ctx = useContext(ProductSelectionContext);
  if (!ctx) throw new Error("useProductSelection needs ProductSelectionProvider");
  return ctx;
}
