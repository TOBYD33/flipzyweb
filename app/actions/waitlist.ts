"use server";

import { redirect } from "next/navigation";
import { signupWaitlist, type WaitlistFormState } from "@/lib/waitlist";

export async function signupWaitlistAction(
  _prevState: WaitlistFormState,
  formData: FormData
): Promise<WaitlistFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  const result = await signupWaitlist({
    email,
    university: String(formData.get("university") ?? ""),
    country: String(formData.get("country") ?? ""),
    referredBy: String(formData.get("referred_by") ?? "")
  });

  if (result.error) {
    return result;
  }

  redirect(`/waitlist?email=${encodeURIComponent(email)}`);
}
