export type PortfolioStat = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  enabled: boolean;
  /** Spoken form for screen readers, e.g. "15 million plus". */
  accessibleValue: string;
};

/**
 * Confirmed public metrics only — no null / incomplete development states.
 * Order and copy match the approved By the Numbers content.
 */
export const portfolioStats: PortfolioStat[] = [
  {
    id: "total-views",
    value: 15,
    suffix: "M+",
    label: "Total Views",
    description:
      "Across personal content channels and collaborative work.",
    accessibleValue: "15 million plus",
    enabled: true,
  },
  {
    id: "subscribers",
    value: 14,
    suffix: "K+",
    label: "Subscribers",
    description:
      "Built across different platforms, formats, and content communities.",
    accessibleValue: "14 thousand plus",
    enabled: true,
  },
  {
    id: "years-creating",
    value: 5,
    suffix: "+",
    label: "Years Creating",
    description:
      "From early social experiments to client, commercial, and documentary work.",
    accessibleValue: "5 plus",
    enabled: true,
  },
  {
    id: "brands-served",
    value: 10,
    suffix: "+",
    label: "Brands Served",
    description:
      "Across startups, restaurants, nonprofits, and personal media brands.",
    accessibleValue: "10 plus",
    enabled: true,
  },
];

export const statsConfig = {
  /**
   * Public site ships only confirmed metrics.
   */
  includeIncompleteMetrics: false,
  hideUntilAllEnabledHaveValues: false,
} as const;
