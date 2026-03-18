"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/context/CustomerContext";
import { formatPrice } from "@/lib/shopify";

export default function AccountPage() {
  const { customer, isLoading, logout } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !customer) {
      router.replace("/account/login");
    }
  }, [customer, isLoading, router]);

  if (isLoading || !customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-black/40">Loading…</p>
      </div>
    );
  }

  const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ") || customer.email;

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <div className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl font-bold">Hey, {customer.firstName ?? "friend"}</h1>
          <p className="font-body text-black/50 mt-1">{customer.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="font-body text-sm text-black/40 hover:text-black underline transition-colors"
        >
          Sign out
        </button>
      </div>

      <h2 className="font-display text-xl font-semibold mb-4">Orders</h2>

      {customer.orders.edges.length === 0 ? (
        <p className="font-body text-black/50">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {customer.orders.edges.map(({ node: order }) => (
            <div key={order.id} className="border border-black/10 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="font-display font-semibold">Order #{order.orderNumber}</span>
                <span className="font-body text-sm font-medium">
                  {formatPrice(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}
                </span>
              </div>
              <p className="font-body text-sm text-black/50 mb-3">
                {new Date(order.processedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {order.fulfillmentStatus.replace(/_/g, " ").toLowerCase()}
              </p>
              <ul className="font-body text-sm text-black/70 flex flex-col gap-1">
                {order.lineItems.edges.map(({ node: item }, i) => (
                  <li key={i}>
                    {item.quantity}× {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
