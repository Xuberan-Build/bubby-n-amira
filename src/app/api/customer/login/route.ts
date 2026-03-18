import { NextResponse } from "next/server";
import { customerAccessTokenCreate } from "@/lib/shopify";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const { accessToken, expiresAt, errors } = await customerAccessTokenCreate(email, password);

  if (errors.length > 0 || !accessToken) {
    return NextResponse.json({ error: errors[0]?.message ?? "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("shopify_customer_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt!),
    path: "/",
  });
  return res;
}
