export function AppPreview() {
  return (
    <section className="section-shell py-10" id="app-preview">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flipzy-purple">App Preview</p>
        <h2 className="mt-2 text-3xl font-bold text-flipzy-ink sm:text-4xl">A feed that understands opportunity.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card-surface h-64 bg-gradient-to-br from-flipzy-purple/20 via-white to-flipzy-mint/30" />
        <div className="card-surface h-64 bg-gradient-to-br from-white via-flipzy-purple/10 to-flipzy-mint/25" />
        <div className="card-surface h-64 bg-gradient-to-br from-flipzy-mint/20 via-white to-flipzy-purple/25" />
      </div>
    </section>
  );
}
