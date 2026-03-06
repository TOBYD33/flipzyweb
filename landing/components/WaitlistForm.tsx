"use client";

import type { ReactNode } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFormStatus } from "react-dom";
import { initialEmailWaitlistState, submitWaitlistEmailAction } from "@/landing/actions/submitWaitlistEmail";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M16.76 12.39c.02 2.21 1.94 2.95 1.96 2.96-.02.05-.3 1.03-1 2.05-.6.88-1.22 1.76-2.2 1.78-.95.02-1.26-.57-2.35-.57-1.09 0-1.43.55-2.33.59-.95.04-1.68-.96-2.29-1.83-1.24-1.79-2.19-5.05-.92-7.27.63-1.1 1.76-1.79 2.98-1.81.93-.02 1.82.62 2.35.62.53 0 1.53-.77 2.58-.66.44.02 1.69.18 2.49 1.35-.06.04-1.49.86-1.47 2.79ZM14.64 6.76c.5-.61.84-1.46.75-2.3-.72.03-1.58.48-2.09 1.08-.46.53-.87 1.39-.76 2.2.8.06 1.6-.4 2.1-.98Z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M7.54 8.47 6.2 6.15a.5.5 0 1 1 .87-.5l1.39 2.4A8.13 8.13 0 0 1 12 7.3c1.27 0 2.47.29 3.54.8l1.39-2.4a.5.5 0 1 1 .87.5l-1.34 2.32a7.55 7.55 0 0 1 3.12 6.02H4.42a7.56 7.56 0 0 1 3.12-6.07ZM9.5 11.57a.73.73 0 1 0 0-1.46.73.73 0 0 0 0 1.46Zm5 0a.73.73 0 1 0 0-1.46.73.73 0 0 0 0 1.46ZM5.23 15.42h1.12v4.04c0 .62.5 1.12 1.12 1.12h.75v1.9a.88.88 0 1 0 1.76 0v-1.9h3.04v1.9a.88.88 0 1 0 1.76 0v-1.9h.75c.62 0 1.12-.5 1.12-1.12v-4.04h1.12a.87.87 0 1 0 0-1.74H5.23a.87.87 0 1 0 0 1.74Z" />
    </svg>
  );
}

function StoreButton({
  label,
  icon,
  onClick
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[1rem] bg-flipzy-purple px-4 text-sm font-bold text-white shadow-[0_16px_28px_rgba(94,12,200,0.18)] transition hover:bg-[#4f09ad] sm:h-14 sm:flex-1 sm:px-5"
    >
      <span>{label}</span>
      <span className="text-white">{icon}</span>
    </button>
  );
}

function ComingSoonModal({
  platform,
  onClose,
  onJoin
}: {
  platform: "iOS" | "Android";
  onClose: () => void;
  onJoin: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#130727]/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.5rem] bg-white p-6 shadow-[0_30px_90px_rgba(19,7,39,0.24)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-flipzy-purple">{platform} app</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-flipzy-ink">Coming soon.</h3>
        <p className="mt-3 text-sm leading-relaxed text-flipzy-ink/75">
          Enlist on the waitlist to be one of the first people to get the premium Flipzy app when it drops.
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onJoin}
            className="inline-flex h-11 items-center justify-center rounded-full bg-flipzy-purple px-5 text-sm font-semibold text-white transition hover:bg-[#4f09ad]"
          >
            Enlist to the waitlist
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-full border border-flipzy-ink/12 px-5 text-sm font-semibold text-flipzy-ink"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function JoinButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full bg-flipzy-purple px-5 text-sm font-semibold text-white transition hover:bg-[#4f09ad] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:min-w-[170px]"
    >
      {pending ? "Saving..." : "Join the Waitlist"}
    </button>
  );
}

export function WaitlistForm() {
  const [state, formAction] = useActionState(submitWaitlistEmailAction, initialEmailWaitlistState);
  const [modalPlatform, setModalPlatform] = useState<"iOS" | "Android" | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleJoinWaitlistFromModal() {
    setModalPlatform(null);
    nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    nameInputRef.current?.focus();
  }

  return (
    <div id="waitlist-form" className="mt-5 sm:mt-6">
      {state.status === "success" ? (
        <div className="rounded-2xl border border-[#03FB89]/40 bg-[#03FB89]/10 px-4 py-3 text-sm font-medium text-flipzy-ink">
          {state.message}
        </div>
      ) : (
        <form action={formAction} className="grid gap-2.5 md:grid-cols-[0.9fr_1.15fr_auto] md:items-center">
          <label htmlFor="name" className="sr-only">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            ref={nameInputRef}
            placeholder="Your name"
            className="h-11 w-full rounded-full border border-flipzy-ink/15 bg-white/90 px-4 text-sm text-flipzy-ink outline-none ring-flipzy-purple transition focus:ring-2"
          />

          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="h-11 w-full rounded-full border border-flipzy-ink/15 bg-white/90 px-4 text-sm text-flipzy-ink outline-none ring-flipzy-purple transition focus:ring-2"
          />
          <JoinButton />
        </form>
      )}

      {state.status === "error" ? <p className="mt-2 text-sm font-medium text-red-600">{state.message}</p> : null}

      <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
        <StoreButton label="Download Now" icon={<AppleIcon />} onClick={() => setModalPlatform("iOS")} />
        <StoreButton label="Download Now" icon={<AndroidIcon />} onClick={() => setModalPlatform("Android")} />
      </div>

      {isMounted && modalPlatform
        ? createPortal(
            <ComingSoonModal
              platform={modalPlatform}
              onClose={() => setModalPlatform(null)}
              onJoin={handleJoinWaitlistFromModal}
            />,
            document.body
          )
        : null}
    </div>
  );
}
