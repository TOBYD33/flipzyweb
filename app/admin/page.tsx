import { promises as fs } from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";

type WaitlistEntry = {
  name: string;
  email: string;
  createdAt: string;
  source: string;
};

async function getSupabaseEntries(): Promise<WaitlistEntry[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data } = await supabase
      .from("waitlist")
      .select("name, email, created_at")
      .order("created_at", { ascending: false });

    return (data ?? []).map((row) => ({
      name: row.name,
      email: row.email,
      createdAt: row.created_at,
      source: "supabase"
    }));
  } catch {
    return [];
  }
}

async function getLocalEntries(): Promise<WaitlistEntry[]> {
  try {
    const filePath = path.join(process.cwd(), "landing", "mock", "waitlist.json");
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item?.name && item?.email)
      .map((item) => ({ name: item.name, email: item.email, createdAt: item.createdAt, source: "local" }));
  } catch {
    return [];
  }
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const secret = process.env.ADMIN_SECRET;

  if (!secret || params.key !== secret) {
    redirect("/");
  }

  const [supabaseEntries, localEntries] = await Promise.all([getSupabaseEntries(), getLocalEntries()]);

  // Merge, deduplicate by email (prefer supabase entries)
  const seen = new Set<string>();
  const all: WaitlistEntry[] = [];

  for (const entry of [...supabaseEntries, ...localEntries]) {
    if (!seen.has(entry.email)) {
      seen.add(entry.email);
      all.push(entry);
    }
  }

  all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <main className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flipzy Waitlist</h1>
            <p className="mt-1 text-sm text-gray-500">
              {all.length} {all.length === 1 ? "person" : "people"} signed up
              {supabaseEntries.length > 0 && localEntries.length > 0
                ? ` (${supabaseEntries.length} from Supabase, ${localEntries.length} local)`
                : supabaseEntries.length > 0
                  ? " (from Supabase)"
                  : localEntries.length > 0
                    ? " (local fallback)"
                    : ""}
            </p>
          </div>
          <a
            href={`/admin?key=${params.key}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Refresh
          </a>
        </div>

        {all.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            No signups yet. Share the link!
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Signed up</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Source</th>
                </tr>
              </thead>
              <tbody>
                {all.map((entry, i) => (
                  <tr key={entry.email} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{entry.name}</td>
                    <td className="px-4 py-3 text-gray-600">{entry.email}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          entry.source === "supabase"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {entry.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          To export, copy the email column or query Supabase directly.
        </p>
      </div>
    </main>
  );
}
