"use client";

import { useMemo, useState } from "react";
import type { LeaderboardEntry } from "@/lib/waitlist";

type WaitlistShareCardProps = {
  referralLink: string;
  rank: number;
  referralsCount: number;
  milestone: number;
  leaderboard: LeaderboardEntry[];
};

export function WaitlistShareCard({
  referralLink,
  rank,
  referralsCount,
  milestone,
  leaderboard
}: WaitlistShareCardProps) {
  const [copied, setCopied] = useState(false);

  const progress = useMemo(() => {
    if (milestone <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((referralsCount / milestone) * 100));
  }, [milestone, referralsCount]);

  async function copyLink() {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function shareTo(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const shareText = encodeURIComponent("I just joined Flipzy. Skip the line with my invite:");
  const encodedLink = encodeURIComponent(referralLink);

  return (
    <main className="min-h-screen bg-hero-glow pb-14">
      <section className="section-shell py-14">
        <div className="mx-auto max-w-3xl space-y-5">
          <article className="card-surface p-8 text-center sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-flipzy-purple">You&apos;re in 🎉</p>
            <h1 className="mt-2 text-4xl font-extrabold text-flipzy-ink">Your current spot: #{rank}</h1>
            <p className="mt-3 text-flipzy-ink/70">Share your link. Watch your rank move. Early movers eat first.</p>

            <div className="mt-7 rounded-2xl border border-flipzy-ink/10 bg-white p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-flipzy-ink/55">Your unique referral link</p>
              <p className="mt-2 break-all text-sm font-medium text-flipzy-ink">{referralLink}</p>
              <button
                onClick={copyLink}
                className="mt-4 rounded-full bg-flipzy-purple px-5 py-2 text-sm font-semibold text-white"
              >
                {copied ? "Copied" : "Copy Link"}
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <button
                onClick={() => shareTo(`https://wa.me/?text=${shareText}%20${encodedLink}`)}
                className="rounded-full border border-flipzy-ink/15 px-4 py-2 text-sm font-semibold text-flipzy-ink"
              >
                WhatsApp
              </button>
              <button
                onClick={() => shareTo(`https://x.com/intent/tweet?text=${shareText}%20${encodedLink}`)}
                className="rounded-full border border-flipzy-ink/15 px-4 py-2 text-sm font-semibold text-flipzy-ink"
              >
                X
              </button>
              <button
                onClick={() => shareTo(`https://t.me/share/url?url=${encodedLink}&text=${shareText}`)}
                className="rounded-full border border-flipzy-ink/15 px-4 py-2 text-sm font-semibold text-flipzy-ink"
              >
                Telegram
              </button>
              <button
                onClick={copyLink}
                className="rounded-full border border-flipzy-ink/15 px-4 py-2 text-sm font-semibold text-flipzy-ink"
              >
                Copy
              </button>
            </div>
          </article>

          <article className="card-surface p-6 sm:p-8">
            <div className="flex items-center justify-between text-sm font-medium text-flipzy-ink">
              <p>
                Refer {milestone} friends to unlock your early access badge
              </p>
              <p>
                {referralsCount}/{milestone}
              </p>
            </div>
            <div className="mt-3 h-3 rounded-full bg-flipzy-ink/10">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-flipzy-purple to-flipzy-mint transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-flipzy-ink/70">Current referrals: {referralsCount}</p>
          </article>

          <article className="card-surface p-6 sm:p-8">
            <h2 className="text-xl font-bold text-flipzy-ink">Leaderboard Preview</h2>
            <p className="mt-1 text-sm text-flipzy-ink/65">Top referrers right now.</p>

            <div className="mt-4 space-y-2">
              {leaderboard.length === 0 ? (
                <p className="text-sm text-flipzy-ink/60">Leaderboard is warming up.</p>
              ) : (
                leaderboard.map((entry, index) => (
                  <div
                    key={`${entry.referralCode}-${index}`}
                    className="flex items-center justify-between rounded-2xl border border-flipzy-ink/10 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-flipzy-ink">
                      #{index + 1} <span className="text-flipzy-purple">{entry.referralCode}</span>
                    </p>
                    <p className="text-sm font-medium text-flipzy-ink/75">{entry.referralsCount} referrals</p>
                  </div>
                ))
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
