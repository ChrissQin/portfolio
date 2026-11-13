import { WorkArchive } from "@/components/work/WorkArchive";

export function SelectWork() {
  return (
    <WorkArchive variant="home" limit={10} showExploreMore />
  );
}
