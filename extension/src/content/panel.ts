import { computeDiff } from "../lib/diff";
import {
  fetchUserList,
  getCurrentUser,
  IgApiError,
  isLoggedIn,
} from "../lib/ig-api";
import {
  exportCsv,
  exportJson,
  loadScan,
  saveScan,
} from "../lib/storage";
import type { IgUser, ResultTab, ScanProgress, ScanResult } from "../lib/types";
import "./panel.css";

const ROOT_ID = "iguc-root";

let root: HTMLElement | null = null;
let result: ScanResult | null = null;
let activeTab: ResultTab = "not_following_back";
let searchQuery = "";
let scanning = false;
let stopRequested = false;
let progress: ScanProgress = {
  phase: "idle",
  followersFetched: 0,
  followingFetched: 0,
};

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | boolean | undefined> = {},
  children: Array<Node | string> = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === false) continue;
    if (key === "className") {
      node.className = String(value);
      continue;
    }
    if (value === true) {
      node.setAttribute(key, "");
      continue;
    }
    node.setAttribute(key, String(value));
  }
  for (const child of children) {
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

function listForTab(tab: ResultTab): IgUser[] {
  if (!result) return [];
  if (tab === "not_following_back") return result.notFollowingBack;
  if (tab === "not_followed_back") return result.notFollowedBack;
  return result.mutual;
}

function filteredUsers(): IgUser[] {
  const q = searchQuery.trim().toLowerCase();
  const users = listForTab(activeTab);
  if (!q) return users;
  return users.filter(
    (u) =>
      u.username.toLowerCase().includes(q) ||
      u.full_name.toLowerCase().includes(q),
  );
}

function setStatus(
  text: string,
  tone: "neutral" | "ok" | "error" = "neutral",
): void {
  const status = root?.querySelector<HTMLElement>(".iguc-status");
  if (!status) return;
  status.textContent = text;
  status.dataset.tone = tone === "neutral" ? "" : tone;
}

function setProgressBar(pct: number): void {
  const bar = root?.querySelector<HTMLElement>(".iguc-progress-bar > span");
  if (bar) bar.style.width = `${Math.max(0, Math.min(100, pct))}%`;
}

function updateStats(): void {
  if (!root) return;
  const followers = root.querySelector('[data-stat="followers"]');
  const following = root.querySelector('[data-stat="following"]');
  const primary = root.querySelector('[data-stat="primary"]');

  if (followers) {
    followers.textContent = String(
      result?.followersCount ?? progress.followersFetched,
    );
  }
  if (following) {
    following.textContent = String(
      result?.followingCount ?? progress.followingFetched,
    );
  }
  if (primary) {
    primary.textContent = String(result?.notFollowingBack.length ?? 0);
  }
}

function renderList(): void {
  const wrap = root?.querySelector(".iguc-list-wrap");
  if (!wrap) return;
  wrap.replaceChildren();

  const users = filteredUsers();
  if (!result) {
    wrap.append(
      el("div", { className: "iguc-empty" }, [
        "Run a scan to see who doesn’t follow you back.",
      ]),
    );
    return;
  }

  if (users.length === 0) {
    wrap.append(
      el("div", { className: "iguc-empty" }, [
        searchQuery
          ? "No accounts match your search."
          : "No accounts in this list.",
      ]),
    );
    return;
  }

  const list = el("ul", { className: "iguc-list" });
  for (const user of users) {
    const avatar = el("img", {
      className: "iguc-avatar",
      src: user.profile_pic_url || "",
      alt: "",
      referrerpolicy: "no-referrer",
    }) as HTMLImageElement;
    avatar.onerror = () => {
      avatar.removeAttribute("src");
    };

    const row = el(
      "a",
      {
        className: "iguc-row",
        href: `https://www.instagram.com/${user.username}/`,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      [
        avatar,
        el("div", { className: "iguc-user-meta" }, [
          el("span", { className: "iguc-username" }, [`@${user.username}`]),
          el("span", { className: "iguc-fullname" }, [
            user.full_name || " ",
          ]),
        ]),
      ],
    );
    list.append(row);
  }
  wrap.append(list);
}

function syncTabs(): void {
  root?.querySelectorAll<HTMLButtonElement>(".iguc-tab").forEach((btn) => {
    btn.dataset.active = String(btn.dataset.tab === activeTab);
  });
}

function syncActionButtons(): void {
  const scanBtn = root?.querySelector<HTMLButtonElement>('[data-action="scan"]');
  const stopBtn = root?.querySelector<HTMLButtonElement>('[data-action="stop"]');
  const exportJsonBtn = root?.querySelector<HTMLButtonElement>(
    '[data-action="export-json"]',
  );
  const exportCsvBtn = root?.querySelector<HTMLButtonElement>(
    '[data-action="export-csv"]',
  );

  if (scanBtn) scanBtn.disabled = scanning;
  if (stopBtn) stopBtn.disabled = !scanning;
  if (exportJsonBtn) exportJsonBtn.disabled = !result || scanning;
  if (exportCsvBtn) exportCsvBtn.disabled = !result || scanning;
}

function buildPanel(): HTMLElement {
  const panel = el("div", { className: "iguc-panel" }, [
    el("header", { className: "iguc-header" }, [
      el("div", { className: "iguc-brand" }, [
        el("div", { className: "iguc-brand-name" }, ["IG Unfollow Checker"]),
        el("div", { className: "iguc-brand-sub" }, [
          "Local scan of your Instagram followers & following",
        ]),
      ]),
      el("button", {
        className: "iguc-icon-btn",
        type: "button",
        "data-action": "close",
        title: "Close",
        "aria-label": "Close",
      }, ["×"]),
    ]),
    el("div", { className: "iguc-body" }, [
      el("div", { className: "iguc-status", "data-tone": "" }, [
        "Ready. Stay on Instagram while scanning.",
      ]),
      el("div", { className: "iguc-progress-bar" }, [el("span")]),
      el("div", { className: "iguc-actions" }, [
        el("button", {
          className: "iguc-btn iguc-btn-primary",
          type: "button",
          "data-action": "scan",
        }, ["Scan"]),
        el("button", {
          className: "iguc-btn iguc-btn-secondary",
          type: "button",
          "data-action": "stop",
          disabled: true,
        }, ["Stop"]),
      ]),
      el("div", { className: "iguc-stats" }, [
        el("div", { className: "iguc-stat" }, [
          el("span", { className: "iguc-stat-value", "data-stat": "followers" }, [
            "0",
          ]),
          el("span", { className: "iguc-stat-label" }, ["Followers"]),
        ]),
        el("div", { className: "iguc-stat" }, [
          el("span", { className: "iguc-stat-value", "data-stat": "following" }, [
            "0",
          ]),
          el("span", { className: "iguc-stat-label" }, ["Following"]),
        ]),
        el("div", { className: "iguc-stat" }, [
          el("span", { className: "iguc-stat-value", "data-stat": "primary" }, [
            "0",
          ]),
          el("span", { className: "iguc-stat-label" }, ["No follow back"]),
        ]),
      ]),
      el("div", { className: "iguc-tabs" }, [
        el("button", {
          className: "iguc-tab",
          type: "button",
          "data-tab": "not_following_back",
          "data-active": "true",
        }, ["Not following back"]),
        el("button", {
          className: "iguc-tab",
          type: "button",
          "data-tab": "not_followed_back",
          "data-active": "false",
        }, ["You don’t follow"]),
        el("button", {
          className: "iguc-tab",
          type: "button",
          "data-tab": "mutual",
          "data-active": "false",
        }, ["Mutual"]),
      ]),
      el("input", {
        className: "iguc-search",
        type: "search",
        placeholder: "Search username…",
        "data-role": "search",
      }),
      el("div", { className: "iguc-list-wrap" }),
    ]),
    el("footer", { className: "iguc-footer" }, [
      el("button", {
        className: "iguc-btn iguc-btn-secondary",
        type: "button",
        "data-action": "export-json",
        disabled: true,
      }, ["Export JSON"]),
      el("button", {
        className: "iguc-btn iguc-btn-secondary",
        type: "button",
        "data-action": "export-csv",
        disabled: true,
      }, ["Export CSV"]),
    ]),
  ]);

  panel.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-action], [data-tab]",
    );
    if (!target) return;

    const action = target.dataset.action;
    const tab = target.dataset.tab as ResultTab | undefined;

    if (action === "close") {
      setOpen(false);
      return;
    }
    if (action === "scan") {
      void runScan();
      return;
    }
    if (action === "stop") {
      stopRequested = true;
      setStatus("Stopping after the current page…");
      return;
    }
    if (action === "export-json" && result) {
      exportJson(result);
      return;
    }
    if (action === "export-csv" && result) {
      exportCsv(result, activeTab);
      return;
    }
    if (tab) {
      activeTab = tab;
      syncTabs();
      renderList();
    }
  });

  const search = panel.querySelector<HTMLInputElement>('[data-role="search"]');
  search?.addEventListener("input", () => {
    searchQuery = search.value;
    renderList();
  });

  return panel;
}

function mount(): HTMLElement {
  const existing = document.getElementById(ROOT_ID);
  if (existing) {
    root = existing;
    return existing;
  }

  const node = el("div", { id: ROOT_ID, "data-open": "false" });
  node.append(buildPanel());
  document.documentElement.append(node);
  root = node;
  renderList();
  syncActionButtons();
  return node;
}

function setOpen(open: boolean): void {
  const node = mount();
  node.dataset.open = String(open);
}

function togglePanel(): void {
  const node = mount();
  const next = node.dataset.open !== "true";
  node.dataset.open = String(next);
}

async function hydrateFromStorage(): Promise<void> {
  const cached = await loadScan();
  if (!cached) return;
  result = cached;
  updateStats();
  renderList();
  syncActionButtons();
  setStatus(
    `Last scan for @${cached.username} · ${new Date(cached.scannedAt).toLocaleString()}`,
    "ok",
  );
  setProgressBar(100);
}

async function runScan(): Promise<void> {
  if (scanning) return;
  scanning = true;
  stopRequested = false;
  syncActionButtons();
  setProgressBar(0);

  try {
    if (!isLoggedIn()) {
      throw new IgApiError(
        "Not logged in to Instagram. Sign in on this tab, then scan again.",
      );
    }

    progress = {
      phase: "auth",
      followersFetched: 0,
      followingFetched: 0,
    };
    setStatus("Checking your Instagram session…");

    const { userId, username } = await getCurrentUser();
    setStatus(`Signed in as @${username}. Fetching followers…`);

    progress.phase = "followers";
    const followers = await fetchUserList(
      userId,
      "followers",
      (count) => {
        progress.followersFetched = count;
        updateStats();
        setStatus(`Fetching followers… ${count}`);
        // Rough progress while followers load (first half).
        setProgressBar(Math.min(45, (count / Math.max(count, 50)) * 45));
      },
      () => stopRequested,
    );

    if (stopRequested) throw new IgApiError("Scan stopped.");

    progress.phase = "following";
    setStatus(`Fetching following…`);
    const following = await fetchUserList(
      userId,
      "following",
      (count) => {
        progress.followingFetched = count;
        updateStats();
        setStatus(`Fetching following… ${count}`);
        setProgressBar(45 + Math.min(45, (count / Math.max(count, 50)) * 45));
      },
      () => stopRequested,
    );

    if (stopRequested) throw new IgApiError("Scan stopped.");

    progress.phase = "diff";
    setStatus("Comparing lists…");
    setProgressBar(95);

    const diff = computeDiff(followers, following);
    result = {
      ...diff,
      scannedAt: new Date().toISOString(),
      username,
      userId,
    };

    await saveScan(result);
    progress.phase = "done";
    updateStats();
    renderList();
    setProgressBar(100);
    setStatus(
      `Done. ${diff.notFollowingBack.length} not following back · ${diff.mutual.length} mutual`,
      "ok",
    );
  } catch (err) {
    const message =
      err instanceof IgApiError
        ? err.message
        : err instanceof Error
          ? err.message
          : "Unexpected error during scan.";
    progress.phase = "error";
    setStatus(message, "error");
    if (message === "Scan stopped.") {
      setStatus("Scan stopped.", "neutral");
    }
  } finally {
    scanning = false;
    stopRequested = false;
    syncActionButtons();
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "TOGGLE_PANEL") {
    togglePanel();
    sendResponse({ ok: true });
    return true;
  }
  return false;
});

mount();
void hydrateFromStorage();
void (async () => {
  const { igucOpenOnLoad } = await chrome.storage.session.get("igucOpenOnLoad");
  if (igucOpenOnLoad) {
    await chrome.storage.session.remove("igucOpenOnLoad");
    setOpen(true);
  }
})();
