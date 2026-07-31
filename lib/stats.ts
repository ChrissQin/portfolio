import { portfolioStats, statsConfig, type PortfolioStat } from "@/data/stats";

export function getVisibleStats(
  stats: PortfolioStat[] = portfolioStats,
): PortfolioStat[] {
  return stats.filter((stat) => stat.enabled);
}

export function shouldRenderStatsSection(
  stats: PortfolioStat[],
  allEnabled: PortfolioStat[] = portfolioStats.filter((stat) => stat.enabled),
): boolean {
  if (stats.length === 0) {
    return false;
  }

  if (statsConfig.hideUntilAllEnabledHaveValues) {
    return allEnabled.every((stat) => stat.enabled);
  }

  return true;
}
