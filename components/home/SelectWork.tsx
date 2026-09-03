import { WorkArchive } from "@/components/work/WorkArchive";

export function SelectWork() {
  return (
    <WorkArchive variant="home" limit={7} showExploreMore />
  );
}
