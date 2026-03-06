# Flipzy Email Waitlist Landing

Single-page Flipzy landing page inspired by BiteSight layout, built with Next.js App Router + Tailwind.

## What this page includes

- Two-column hero (headline + CTA + phone mockup)
- Flipzy branding (`#5E0CC8` + `#03FB89`)
- Inline email waitlist form with validation
- Success state: `You’re in. We’ll hit you up when Flipzy drops 💜`
- iOS / Android `Coming Soon` buttons
- Beta-safe placeholder stats row
- Footer links: Terms, Privacy, Contact

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Email storage behavior

The submit action is in:
- [`landing/actions/submitWaitlistEmail.ts`](/Users/tobydee/Documents/flipzywebsite/landing/actions/submitWaitlistEmail.ts)

Flow:
1. Validates email format server-side.
2. If Supabase env exists, tries insert into `waitlist` table.
3. If `waitlist` table is missing, falls back to existing `signup_waitlist` RPC.
4. If Supabase is unavailable, saves locally to:
   - [`landing/mock/waitlist.json`](/Users/tobydee/Documents/flipzywebsite/landing/mock/waitlist.json)

## Optional Supabase env vars

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... # optional
```

No secret key is exposed in client code.

## Main files

- Page route: [`app/page.tsx`](/Users/tobydee/Documents/flipzywebsite/app/page.tsx)
- Layout + metadata: [`app/layout.tsx`](/Users/tobydee/Documents/flipzywebsite/app/layout.tsx)
- Landing components: [`landing/components`](/Users/tobydee/Documents/flipzywebsite/landing/components)
