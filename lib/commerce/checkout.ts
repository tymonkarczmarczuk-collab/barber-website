/**
 * COMMERCE ARCHITECTURE
 * ------------------------------------------------------------------
 * Passage 01 does not sell from the site today: the CTA opens an
 * enquiry. This module exists so that switching a first edition on
 * later is a configuration change rather than a rebuild.
 *
 * TO CONNECT A CHECKOUT
 *   1. Implement a provider below (Stripe Checkout, Shopify, or your own).
 *   2. Set CHECKOUT_PROVIDER in .env.
 *   3. Set product.availability to "sale" in lib/config/product.ts.
 *
 * The serial-allocation hook is declared here on purpose: a numbered
 * edition needs the piece number reserved at the moment of payment,
 * not assigned by hand afterwards.
 */

import { product } from "@/lib/config/product";

export type CheckoutProvider = "none" | "stripe" | "shopify" | "custom";

export type CheckoutLineItem = {
  sku: string;
  name: string;
  quantity: number;
  unitAmount: number;
  currency: string;
};

export type CheckoutSession = {
  ok: boolean;
  url?: string;
  message?: string;
};

export const checkoutProvider: CheckoutProvider =
  (process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER as CheckoutProvider) ?? "none";

export const passageLineItem = (): CheckoutLineItem => ({
  sku: "SARVEON-PASSAGE-01",
  name: `${product.fullName} — ${product.editionName}`,
  quantity: 1,
  unitAmount: product.price * 100,
  currency: product.currency,
});

/**
 * Starts a checkout for one piece.
 *
 * Returns a structured result rather than throwing, so the button can
 * show a real state instead of a dead click. With no provider
 * configured it reports exactly that — it never fakes a success.
 */
export async function startCheckout(): Promise<CheckoutSession> {
  if (checkoutProvider === "none") {
    return {
      ok: false,
      message: "No checkout provider is connected. Passage 01 is currently enquiry-only.",
    };
  }

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [passageLineItem()] }),
    });
    const data = (await response.json()) as CheckoutSession;
    if (!response.ok || !data.url) {
      return { ok: false, message: data.message ?? "Checkout could not be started." };
    }
    return { ok: true, url: data.url };
  } catch {
    return { ok: false, message: "Checkout could not be reached. Please try again." };
  }
}

/**
 * INVENTORY & SERIAL ALLOCATION (not yet connected)
 * -----------------------------------------------------------------
 * Implement against whatever record system holds the edition — a
 * database table, a Shopify metafield, or a spreadsheet-backed API.
 * `remaining` drives the availability copy; `allocateSerial` reserves
 * the next number in the run at the moment of purchase.
 */
export type EditionInventory = {
  total: number;
  remaining: number | null;
  /** Ordered list of serials already issued, if the source can report it. */
  issued?: string[];
};

export async function getEditionInventory(): Promise<EditionInventory> {
  return { total: product.edition.size, remaining: null };
}

export async function allocateSerial(): Promise<string | null> {
  return null;
}
