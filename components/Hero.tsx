export function Hero() {
  return (
    <section className="section-shell grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
      <div className="fade-in space-y-7">
        <p className="inline-flex rounded-full border border-flipzy-purple/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-flipzy-purple">
          Your people. Your hustle. Your community.
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-flipzy-ink sm:text-5xl md:text-6xl">
          Buy. Sell. Connect. <span className="text-flipzy-purple">All in one swipe.</span>
        </h1>
        <p className="max-w-xl text-base text-flipzy-ink/75 sm:text-lg">
          Network, trade, and discover opportunities without the boring. Flipzy blends services, products, and real
          community in one scroll.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#waitlist-form"
            className="rounded-full bg-flipzy-purple px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#4f09ad]"
          >
            Join the Waitlist
          </a>
          <a
            href="#app-preview"
            className="rounded-full border border-flipzy-ink/15 bg-white px-7 py-3 text-sm font-semibold text-flipzy-ink transition hover:border-flipzy-purple/40"
          >
            Preview the vibe
          </a>
        </div>
      </div>

      <div className="fade-in card-surface relative mx-auto h-[520px] w-full max-w-[320px] overflow-hidden p-4">
        <div className="h-full rounded-[2rem] border border-flipzy-purple/10 bg-gradient-to-b from-white to-[#f1e9ff] p-5">
          <div className="mb-4 flex items-center justify-between text-xs font-semibold text-flipzy-ink/45">
            <span>Flipzy Feed</span>
            <span>Beta</span>
          </div>
          <div className="space-y-3">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-flipzy-purple/25 via-flipzy-purple/15 to-flipzy-mint/30" />
            <div className="h-16 rounded-2xl bg-white/85" />
            <div className="h-20 rounded-2xl bg-gradient-to-r from-flipzy-purple/20 to-flipzy-mint/25" />
            <div className="h-16 rounded-2xl bg-white/85" />
          </div>
        </div>
      </div>
    </section>
  );
}
