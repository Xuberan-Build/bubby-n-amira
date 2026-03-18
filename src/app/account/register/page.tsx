"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCustomer } from "@/context/CustomerContext";

export default function RegisterPage() {
  const { register } = useCustomer();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const err = await register(form.email, form.password, form.firstName, form.lastName);
    setIsLoading(false);
    if (err) {
      setError(err);
    } else {
      router.push("/account");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold mb-8 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={update("firstName")}
              className="border border-black/20 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-black w-full"
            />
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={update("lastName")}
              className="border border-black/20 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-black w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={update("email")}
            required
            className="border border-black/20 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={update("password")}
            required
            minLength={5}
            className="border border-black/20 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-black"
          />
          {error && (
            <p className="text-red-500 text-sm font-body">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white font-body font-medium py-3 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p className="text-center font-body text-sm mt-6 text-black/60">
          Already have an account?{" "}
          <Link href="/account/login" className="text-black underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
