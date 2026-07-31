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
   * Keep incomplete metrics in the editorial grid as intentional dashes.
   * Never invent numeric values — null always renders as a placeholder.
   */
  includeIncompleteMetrics: true,
  /**
   * When true, hide the entire section unless every enabled metric has a value.
   */
  hideUntilAllEnabledHaveValues: false,
} as const;
