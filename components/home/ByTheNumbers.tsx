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
          <p className="by-numbers__eyebrow">
            <span className="by-numbers__mark" aria-hidden="true" />
            By the numbers
          </p>
          <div className="by-numbers__intro">
            <h2 id="by-numbers-heading" className="by-numbers__heading">
              The work,
              <br />
              in numbers.
            </h2>
            <p className="by-numbers__lede">
              A few numbers behind the edits, shoots, and projects—{" "}
              <strong>not the whole story, but useful context.</strong>
            </p>
          </div>
        </div>

        <div className="by-numbers__grid" data-count={stats.length}>
          {stats.map((stat, index) => (
            <StatCounter key={stat.id} stat={stat} delayMs={index * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}
