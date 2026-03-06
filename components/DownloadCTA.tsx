export function DownloadCTA() {
  return (
    <section className="section-shell pb-16 pt-6">
      <div className="card-surface flex flex-col items-center justify-between gap-6 p-8 text-center md:flex-row md:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flipzy-purple">Download</p>
          <h3 className="mt-2 text-2xl font-bold text-flipzy-ink">App Store + Google Play dropping soon.</h3>
          <p className="mt-2 text-sm text-flipzy-ink/65">Be first in line. Be first in market.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-flipzy-ink/20 px-6 py-3 text-sm font-semibold text-flipzy-ink">
            App Store (Coming Soon)
          </button>
          <button className="rounded-full border border-flipzy-ink/20 px-6 py-3 text-sm font-semibold text-flipzy-ink">
            Google Play (Coming Soon)
          </button>
        </div>
      </div>
    </section>
  );
}
