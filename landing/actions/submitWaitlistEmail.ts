import { promises as fs } from "node:fs";
import path from "node:path";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { EmailWaitlistState } from "./waitlistTypes";

const SUCCESS_MESSAGE = "You\u2019re in. We\u2019ll hit you up when Flipzy drops \ud83d\udc9c";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistRecord = {
  name: string;
  email: string;
  createdAt: string;
  source: "local-fallback";
};

function hasSupabaseEnv(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function upsertLocalSubmission(name: string, email: string): Promise<void> {
  const filePath = path.join("/tmp", "waitlist.json");
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  let existing: WaitlistRecord[] = [];

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed.filter(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          typeof item.name === "string" &&
          typeof item.email === "string" &&
          typeof item.createdAt === "string"
      ) as WaitlistRecord[];
    }
  } catch {
    existing = [];
  }

  if (existing.some((entry) => entry.email === email)) {
    return;
  }

  existing.push({
    name,
    email,
    createdAt: new Date().toISOString(),
    source: "local-fallback"
  });

  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
}

async function insertSupabaseWaitlist(name: string, email: string): Promise<boolean> {
  if (!hasSupabaseEnv()) {
    return false;
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("waitlist").insert({ name, email });

  if (!error) return true;
  if (error.code === "23505") return true; // duplicate — already on list

  return false;
}

export async function submitWaitlistEmailAction(
  _previousState: EmailWaitlistState,
  formData: FormData
): Promise<EmailWaitlistState> {
  "use server";
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!name) {
    return { status: "error", message: "Add your name so we know who just grabbed a spot." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Drop a valid email so we can lock your spot." };
  }

  try {
    const savedToSupabase = await insertSupabaseWaitlist(name, email);
    if (savedToSupabase) {
      return { status: "success", message: SUCCESS_MESSAGE };
    }
  } catch {
    // Supabase unavailable — fall through to local backup
  }

  try {
    await upsertLocalSubmission(name, email);
    return { status: "success", message: SUCCESS_MESSAGE };
  } catch {
    return { status: "error", message: "Could not save right now. Try again in a few seconds." };
  }
}
