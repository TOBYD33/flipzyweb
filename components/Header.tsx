export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/85 backdrop-blur">
      <div className="section-shell flex items-center justify-between py-4">
        <a href="#top" className="text-xl font-extrabold tracking-tight text-flipzy-purple">
          Flipzy
        </a>
        <a
          href="#waitlist-form"
          className="rounded-full bg-flipzy-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f09ad]"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}
