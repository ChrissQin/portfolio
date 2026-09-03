/**
 * Confirmed collaborators and work contexts only.
 * Do not invent client names or logo marks.
 */
export type CollaboratorEntry = {
  label: string;
  kind: "client" | "context";
};

export const collaborators: CollaboratorEntry[] = [
  { label: "Uni Uni Bubble Tea", kind: "client" },
  { label: "GA Painting Company", kind: "client" },
  { label: "Startups", kind: "context" },
  { label: "Restaurants", kind: "context" },
  { label: "Nonprofits", kind: "context" },
  { label: "Creators", kind: "context" },
  { label: "Personal Brands", kind: "context" },
];
