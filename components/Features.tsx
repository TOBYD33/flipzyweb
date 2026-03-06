const features = [
  {
    title: "People",
    copy: "Find collaborators, plug into your circle, and meet movers close to you."
  },
  {
    title: "Products",
    copy: "Buy and sell what matters with trust baked into the social layer."
  },
  {
    title: "Services",
    copy: "Book talent, offer your skills, and run your hustle from one app."
  },
  {
    title: "Map Discovery",
    copy: "See opportunities around you in real time and move first."
  }
];

export function Features() {
  return (
    <section className="section-shell py-12" id="features">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flipzy-purple">Features</p>
        <h2 className="mt-2 text-3xl font-bold text-flipzy-ink sm:text-4xl">Everything social commerce should be.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.title} className="card-surface p-6">
            <h3 className="text-lg font-semibold text-flipzy-ink">{feature.title}</h3>
            <p className="mt-2 text-sm text-flipzy-ink/70">{feature.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
