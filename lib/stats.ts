import { portfolioStats, statsConfig, type PortfolioStat } from "@/data/stats";

export function getVisibleStats(
  stats: PortfolioStat[] = portfolioStats,
  includeIncomplete = statsConfig.includeIncompleteMetrics,
): PortfolioStat[] {
  return stats.filter((stat) => {
    if (!stat.enabled) {
      return false;
    }
    if (includeIncomplete) {
      return true;
    }
    return stat.value !== null;
  });
}

export function shouldRenderStatsSection(
  stats: PortfolioStat[],
  allEnabled: PortfolioStat[] = portfolioStats.filter((stat) => stat.enabled),
): boolean {
  if (stats.length === 0) {
    return false;
  }

  if (statsConfig.hideUntilAllEnabledHaveValues) {
    return allEnabled.every((stat) => stat.value !== null);
  }

  return true;
}
