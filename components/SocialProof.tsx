const stats = [
  { label: "10,000+", value: "Early signups" },
  { label: "50+", value: "Campuses on watch" },
  { label: "20+", value: "Countries waiting in line" }
];

export function SocialProof() {
  return (
    <section className="section-shell py-6 sm:py-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.value} className="card-surface p-6 text-center">
            <p className="text-3xl font-extrabold text-flipzy-purple">{stat.label}</p>
            <p className="mt-1 text-sm font-medium text-flipzy-ink/60">{stat.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
