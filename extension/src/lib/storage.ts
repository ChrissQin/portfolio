import type { ResultTab, ScanResult } from "./types";

const SCAN_KEY = "ig_unfollow_last_scan";

export async function saveScan(result: ScanResult): Promise<void> {
  await chrome.storage.local.set({ [SCAN_KEY]: result });
}

export async function loadScan(): Promise<ScanResult | null> {
  const data = await chrome.storage.local.get(SCAN_KEY);
  const value = data[SCAN_KEY];
  if (!value || typeof value !== "object") {
    return null;
  }
  return value as ScanResult;
}

export async function clearScan(): Promise<void> {
  await chrome.storage.local.remove(SCAN_KEY);
}

export function exportJson(result: ScanResult): void {
  downloadBlob(
    JSON.stringify(result, null, 2),
    `ig-unfollow-${result.username}-${dateStamp()}.json`,
    "application/json",
  );
}

export function exportCsv(
  result: ScanResult,
  tab: ResultTab,
): void {
  const keyMap: Record<
    ResultTab,
    "notFollowingBack" | "notFollowedBack" | "mutual"
  > = {
    not_following_back: "notFollowingBack",
    not_followed_back: "notFollowedBack",
    mutual: "mutual",
  };
  const list = keyMap[tab];
  const rows = result[list];
  const header = "username,full_name,id,profile_url";
  const lines = rows.map((u) =>
    [
      csvEscape(u.username),
      csvEscape(u.full_name),
      csvEscape(u.id),
      csvEscape(`https://www.instagram.com/${u.username}/`),
    ].join(","),
  );
  downloadBlob(
    [header, ...lines].join("\n"),
    `ig-unfollow-${list}-${result.username}-${dateStamp()}.csv`,
    "text/csv",
  );
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function dateStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

function downloadBlob(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
