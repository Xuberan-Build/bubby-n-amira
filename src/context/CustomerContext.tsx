"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ShopifyCustomer } from "@/lib/shopify";
import { klaviyoIdentify } from "@/lib/klaviyo";

type CustomerContextType = {
  customer: ShopifyCustomer | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const CustomerContext = createContext<CustomerContextType | null>(null);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customer/me")
      .then((r) => r.json())
      .then(({ customer }) => {
        setCustomer(customer);
        if (customer) {
          klaviyoIdentify({ email: customer.email, first_name: customer.firstName ?? undefined, last_name: customer.lastName ?? undefined });
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return data.error as string;
    const me = await fetch("/api/customer/me").then((r) => r.json());
    setCustomer(me.customer);
    if (me.customer) {
      klaviyoIdentify({ email: me.customer.email, first_name: me.customer.firstName ?? undefined, last_name: me.customer.lastName ?? undefined });
    }
    return null;
  }, []);

  const register = useCallback(async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    const res = await fetch("/api/customer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    const data = await res.json();
    if (!res.ok) return data.error as string;
    const me = await fetch("/api/customer/me").then((r) => r.json());
    setCustomer(me.customer);
    if (me.customer) {
      klaviyoIdentify({ email: me.customer.email, first_name: me.customer.firstName ?? undefined, last_name: me.customer.lastName ?? undefined });
    }
    return null;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/customer/logout", { method: "POST" });
    setCustomer(null);
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, isLoading, login, register, logout }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
}
