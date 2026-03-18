"use server";

import { createClient } from "@supabase/supabase-js";
import type { EmailWaitlistState } from "./waitlistTypes";

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
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { error } = await supabase.from("waitlist").insert({ name, email });

    if (!error || error.code === "23505") {
      return { status: "success", message: SUCCESS_MESSAGE };
    }

    return { status: "error", message: "Could not save right now. Try again in a few seconds." };
  } catch {
    return { status: "error", message: "Could not save right now. Try again in a few seconds." };
  }
}
