import type { Metadata } from "next";

import { WorkArchive } from "@/components/work/WorkArchive";

export const metadata: Metadata = {
  title: "Work",
  description: "Versatile work that creates a resonant experience — strategy, design, and video.",
};

export default function WorkPage() {
  return <WorkArchive variant="page" />;
}
