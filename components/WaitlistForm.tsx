"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signupWaitlistAction } from "@/app/actions/waitlist";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-flipzy-purple px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4f09ad] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving your spot..." : "Secure My Spot"}
    </button>
  );
}

export function WaitlistForm({ referralCode }: { referralCode?: string }) {
  const [state, formAction] = useActionState(signupWaitlistAction, {});

  return (
    <section className="section-shell py-16" id="waitlist-form">
      <div className="card-surface mx-auto w-full max-w-2xl p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flipzy-purple">Join the Waitlist</p>
        <h2 className="mt-2 text-3xl font-bold text-flipzy-ink">Get early access to Flipzy.</h2>
        <p className="mt-2 text-sm text-flipzy-ink/65">
          Drop your details and grab your referral link to climb the list faster.
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <input type="hidden" name="referred_by" value={referralCode ?? ""} />

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-flipzy-ink">Email *</span>
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-flipzy-ink/15 px-4 py-3 text-sm outline-none ring-flipzy-purple transition focus:ring-2"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-flipzy-ink">University (optional)</span>
              <input
                name="university"
                type="text"
                placeholder="University of Lagos"
                className="w-full rounded-2xl border border-flipzy-ink/15 px-4 py-3 text-sm outline-none ring-flipzy-purple transition focus:ring-2"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-flipzy-ink">Country (optional)</span>
              <input
                name="country"
                type="text"
                placeholder="Nigeria"
                className="w-full rounded-2xl border border-flipzy-ink/15 px-4 py-3 text-sm outline-none ring-flipzy-purple transition focus:ring-2"
              />
            </label>
          </div>

          {state.error ? <p className="text-sm font-medium text-red-600">{state.error}</p> : null}
          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
