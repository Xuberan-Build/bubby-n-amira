import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomer } from "@/lib/shopify";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (!token) {
    return NextResponse.json({ customer: null });
  }

  const customer = await getCustomer(token).catch(() => null);
  return NextResponse.json({ customer });
}
