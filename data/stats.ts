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
 */
export const portfolioStats: PortfolioStat[] = [
  {
    id: "total-views",
    value: 15,
    suffix: "M+",
    label: "Total Views",
    description: "Across personal content channels and collaborative work",
    accessibleValue: "15 million plus",
    enabled: true,
  },
  {
    id: "years-editing",
    value: 5,
    suffix: "+",
    label: "Years Editing",
    description: "Creating and editing with Adobe creative software",
    accessibleValue: "5 plus",
    enabled: true,
  },
  {
    id: "subscribers",
    value: 14,
    suffix: "K+",
    label: "Subscribers",
    description: "Across personal content channels",
    accessibleValue: "14 thousand plus",
    enabled: true,
  },
  {
    id: "brands-served",
    value: 10,
    suffix: "+",
    label: "Brands Served",
    description: "Across editing, social, and creative collaborations",
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
