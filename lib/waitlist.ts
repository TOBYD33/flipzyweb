import { getSupabaseServerClient } from "@/lib/supabase/server";

export type WaitlistFormState = {
  error?: string;
};

export type WaitlistSummary = {
  email: string;
  referralCode: string;
  referralsCount: number;
  rank: number;
  createdAt: string;
};

export type LeaderboardEntry = {
  referralCode: string;
  referralsCount: number;
};

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function sanitizeText(value: string): string | null {
  const text = value.trim();
  return text.length > 0 ? text : null;
}

function sanitizeReferralCode(value: string): string | null {
  const code = value.trim().toUpperCase();
  if (!code) {
    return null;
  }
  return /^[A-Z0-9]{6,10}$/.test(code) ? code : null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type SignupWaitlistInput = {
  email: string;
  university?: string;
  country?: string;
  referredBy?: string;
};

export async function signupWaitlist(input: SignupWaitlistInput): Promise<WaitlistFormState> {
  const email = normalizeEmail(input.email);
  const university = sanitizeText(input.university ?? "");
  const country = sanitizeText(input.country ?? "");
  const referredBy = sanitizeReferralCode(input.referredBy ?? "");

  if (!isValidEmail(email)) {
    return { error: "Enter a valid email so we can lock your spot." };
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.rpc("signup_waitlist", {
    p_email: email,
    p_university: university,
    p_country: country,
    p_referred_by: referredBy
  });

  if (error) {
    return { error: "Signup failed right now. Please try again in a few seconds." };
  }

  return {};
}

type RankRow = {
  email: string;
  referral_code: string;
  referrals_count: number;
  created_at: string;
  rank: number | string;
};

export async function getWaitlistUserSummary(emailRaw: string): Promise<WaitlistSummary | null> {
  const email = normalizeEmail(emailRaw);
  if (!email || !isValidEmail(email)) {
    return null;
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_waitlist_rank", { p_email: email });

  if (error) {
    throw new Error(`Failed to fetch waitlist rank: ${error.message}`);
  }

  const row = (data as RankRow[] | null)?.[0];
  if (!row) {
    return null;
  }

  return {
    email: row.email,
    referralCode: row.referral_code,
    referralsCount: Number(row.referrals_count ?? 0),
    rank: Number(row.rank ?? 0),
    createdAt: row.created_at
  };
}

type LeaderboardRow = {
  referral_code: string;
  referrals_count: number;
};

export async function getLeaderboardPreview(limit = 10): Promise<LeaderboardEntry[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_waitlist_leaderboard", { p_limit: limit });

  if (error || !data) {
    return [];
  }

  return (data as LeaderboardRow[]).map((entry) => ({
    referralCode: entry.referral_code,
    referralsCount: Number(entry.referrals_count ?? 0)
  }));
}
