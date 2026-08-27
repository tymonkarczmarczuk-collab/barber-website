import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Checkout endpoint — deliberately not implemented.
 *
 * Passage 01 is enquiry-only today. This route exists so the seam is
 * obvious: implement a provider here (Stripe Checkout session, Shopify
 * cart, or your own), set NEXT_PUBLIC_CHECKOUT_PROVIDER, and flip
 * product.availability to "sale".
 *
 * Reserve the edition serial inside this handler — see
 * lib/commerce/checkout.ts → allocateSerial — so a piece number is
 * held at payment rather than assigned by hand afterwards.
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "No checkout provider is connected. Passage 01 is currently available by enquiry only.",
    },
    { status: 501 },
  );
}
