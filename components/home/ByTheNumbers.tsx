import { StatCounter } from "@/components/home/StatCounter";
import { getVisibleStats, shouldRenderStatsSection } from "@/lib/stats";

export function ByTheNumbers() {
  const stats = getVisibleStats();

  if (!shouldRenderStatsSection(stats)) {
    return null;
  }

  return (
    <section className="by-numbers" aria-labelledby="by-numbers-heading">
      <div className="container">
        <div className="by-numbers__header">
          <p className="section-kicker">By the numbers</p>
          <h2 id="by-numbers-heading" className="section-heading">
            The work, in numbers.
          </h2>
          <p className="by-numbers__lede">
            A few numbers behind the edits, shoots, and projects — not the whole
            story, but useful context.
          </p>
        </div>

        <div className="by-numbers__grid" data-count={stats.length}>
          {stats.map((stat, index) => (
            <StatCounter key={stat.id} stat={stat} delayMs={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
