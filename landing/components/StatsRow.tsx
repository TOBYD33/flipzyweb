const stats = [
  {
    value: "2.1M+",
    label: "FLIP TRANSACTIONS",
    accent: false
  },
  {
    value: "19.5K+",
    label: "CONNECTIONS",
    accent: false
  },
  {
    value: "4.8★",
    label: "APP RATING",
    accent: true
  }
];

export function StatsRow() {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4 text-center sm:mt-10 sm:gap-6 sm:text-left">
      {stats.map((stat) => (
        <article key={stat.label} className="text-center sm:text-left">
          <p className="text-[clamp(0.95rem,2vw,1.45rem)] font-semibold leading-none tracking-[-0.03em] text-flipzy-ink">
            {stat.accent ? (
              <span className="inline-flex items-center justify-center gap-1 sm:justify-start">
                <span>4.8</span>
                <span className="text-[0.8em] text-flipzy-purple">★</span>
              </span>
            ) : (
              stat.value
            )}
          </p>
          <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.11em] text-flipzy-purple/90 sm:text-[9px]">
            {stat.label}
          </p>
        </article>
      ))}
    </div>
  );
}
