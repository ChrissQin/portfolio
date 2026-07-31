export type PortfolioStat = {
  id: string;
  value: number | null;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  enabled: boolean;
};

/**
 * Only confirmed values may ship publicly.
 * Null placeholders are for local layout development.
 */
export const portfolioStats: PortfolioStat[] = [
  {
    id: "years-editing",
    value: 5,
    suffix: "+",
    label: "Years Editing",
    description: "Creating and editing with Adobe creative software",
    enabled: true,
  },
  {
    id: "videos-edited",
    value: null,
    label: "Videos Edited",
    description: "Short-form, YouTube, and social cuts",
    enabled: true,
  },
  {
    id: "views-across-work",
    value: null,
    label: "Views Across Edited Work",
    description: "Combined reach across published edits",
    enabled: true,
  },
  {
    id: "creators-brands",
    value: null,
    label: "Creators / Brands / Organizations",
    description: "People and teams collaborated with",
    enabled: true,
  },
];

export const statsConfig = {
  /**
   * When true, null metrics render as an intentional dash for layout testing.
   * When false, incomplete metrics are excluded from the grid.
   */
  includeIncompleteMetrics: process.env.NODE_ENV !== "production",
  /**
   * When true, hide the entire section unless every enabled metric has a value.
   * Prefer excluding incomplete metrics (default) when at least one confirmed
   * figure exists; set this when the section should stay private until complete.
   */
  hideUntilAllEnabledHaveValues: false,
} as const;
