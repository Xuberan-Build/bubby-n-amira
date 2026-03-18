"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCustomer } from "@/context/CustomerContext";

export default function LoginPage() {
  const { login } = useCustomer();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const err = await login(email, password);
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
        <h1 className="font-display text-3xl font-bold mb-8 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-black/20 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-center font-body text-sm mt-6 text-black/60">
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="text-black underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
