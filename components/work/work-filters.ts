import type { WorkCategory } from "@/data/placeholders";

export type WorkFilter = "all" | WorkCategory;

export const WORK_FILTERS: { id: WorkFilter; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "narrative", label: "Narrative" },
  { id: "short-form", label: "Short-form" },
  { id: "all", label: "All works" },
];
