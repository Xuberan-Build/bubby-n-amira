import { NextResponse } from "next/server";
import { customerCreate, customerAccessTokenCreate } from "@/lib/shopify";

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const { errors } = await customerCreate(email, password, firstName, lastName);

  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0].message }, { status: 422 });
  }

  // Auto-login after registration
  const { accessToken, expiresAt } = await customerAccessTokenCreate(email, password);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("shopify_customer_token", accessToken!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt!),
    path: "/",
  });
  return res;
}
