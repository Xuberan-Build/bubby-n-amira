import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { customerAccessTokenDelete } from "@/lib/shopify";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (token) {
    await customerAccessTokenDelete(token).catch(() => {});
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.delete("shopify_customer_token");
  return res;
}
