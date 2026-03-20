"use server";

import type { EmailWaitlistState } from "./waitlistTypes";

const SUPABASE_URL = "https://gkaortmgcfezkdlukvxo.supabase.co";
const SUCCESS_MESSAGE = "You\u2019re in. We\u2019ll hit you up when Flipzy drops \ud83d\udc9c";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitWaitlistEmailAction(
  _previousState: EmailWaitlistState,
  formData: FormData
): Promise<EmailWaitlistState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!name) {
    return { status: "error", message: "Add your name so we know who just grabbed a spot." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Drop a valid email so we can lock your spot." };
  }

  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
    const apiKey = serviceKey || anonKey;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,
        "Authorization": `Bearer ${apiKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ name, email }),
    });

    // 201 = created, 409 = duplicate (already signed up) — both are fine
    if (res.status === 201 || res.status === 409) {
      return { status: "success", message: SUCCESS_MESSAGE };
    }

    return { status: "error", message: "Could not save right now. Try again in a few seconds." };
  } catch {
    return { status: "error", message: "Could not save right now. Try again in a few seconds." };
  }
}
