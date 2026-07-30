import type { IgUser } from "./types";

const IG_APP_ID = "936619743392459";
const PAGE_SIZE = 50;
const PAGE_DELAY_MS = 1200;

export class IgApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "IgApiError";
  }
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function authHeaders(): HeadersInit {
  const csrf = getCookie("csrftoken") ?? "";
  return {
    Accept: "*/*",
    "X-CSRFToken": csrf,
    "X-IG-App-ID": IG_APP_ID,
    "X-Requested-With": "XMLHttpRequest",
    "X-ASBD-ID": "359341",
  };
}

async function igFetch<T>(path: string): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `https://www.instagram.com${path}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: authHeaders(),
  });

  if (res.status === 401 || res.status === 403) {
    throw new IgApiError(
      "Not logged in to Instagram. Open Instagram and sign in, then try again.",
      res.status,
    );
  }

  if (res.status === 429) {
    throw new IgApiError(
      "Instagram rate-limited the request. Wait a few minutes and try again.",
      res.status,
    );
  }

  if (!res.ok) {
    throw new IgApiError(
      `Instagram request failed (${res.status}). The web API may have changed.`,
      res.status,
    );
  }

  return (await res.json()) as T;
}

interface WebFormData {
  form_data?: {
    username?: string;
  };
}

interface WebProfileInfo {
  data?: {
    user?: {
      id?: string;
      username?: string;
      full_name?: string;
      profile_pic_url?: string;
    };
  };
}

interface FriendshipPage {
  users?: Array<{
    pk?: string | number;
    id?: string | number;
    username?: string;
    full_name?: string;
    profile_pic_url?: string;
    is_private?: boolean;
    is_verified?: boolean;
  }>;
  next_max_id?: string | number | null;
  big_list?: boolean;
  status?: string;
}

function mapUser(raw: NonNullable<FriendshipPage["users"]>[number]): IgUser {
  return {
    id: String(raw.pk ?? raw.id ?? ""),
    username: raw.username ?? "",
    full_name: raw.full_name ?? "",
    profile_pic_url: raw.profile_pic_url ?? "",
    is_private: raw.is_private,
    is_verified: raw.is_verified,
  };
}

export function isLoggedIn(): boolean {
  return Boolean(getCookie("sessionid") && getCookie("ds_user_id"));
}

export async function getCurrentUser(): Promise<{
  userId: string;
  username: string;
}> {
  if (!isLoggedIn()) {
    throw new IgApiError(
      "Not logged in to Instagram. Open Instagram and sign in, then try again.",
    );
  }

  const userId = getCookie("ds_user_id");
  if (!userId) {
    throw new IgApiError("Could not read Instagram user id from session.");
  }

  let username = "";

  try {
    const form = await igFetch<WebFormData>(
      "/api/v1/accounts/edit/web_form_data/",
    );
    username = form.form_data?.username ?? "";
  } catch {
    // Fall through to profile lookup via cookie username if available.
  }

  if (!username) {
    // Try resolving via the viewer cookie path used by Instagram web.
    const claimed = getCookie("ds_user_id");
    if (claimed) {
      username = claimed;
    }
  }

  // Prefer a real username from web_profile when we only have an id.
  if (!username || /^\d+$/.test(username)) {
    try {
      // Instagram sometimes embeds username in the page; try shared data.
      const shared = (
        window as unknown as {
          _sharedData?: {
            config?: { viewer?: { username?: string; id?: string } };
          };
        }
      )._sharedData;
      const viewer = shared?.config?.viewer;
      if (viewer?.username) {
        username = viewer.username;
      }
    } catch {
      // ignore
    }
  }

  if (!username || /^\d+$/.test(username)) {
    // Last resort: fetch own profile by id via friendships show — use web_profile with empty check.
    // Many sessions expose username via /api/v1/users/{id}/info/
    try {
      const info = await igFetch<{
        user?: { username?: string; pk?: string | number };
      }>(`/api/v1/users/${userId}/info/`);
      if (info.user?.username) {
        username = info.user.username;
      }
    } catch {
      username = userId;
    }
  }

  return { userId, username };
}

export async function resolveUserId(username: string): Promise<string> {
  const data = await igFetch<WebProfileInfo>(
    `/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
  );
  const id = data.data?.user?.id;
  if (!id) {
    throw new IgApiError(`Could not resolve user id for @${username}.`);
  }
  return id;
}

type ListKind = "followers" | "following";

export async function fetchUserList(
  userId: string,
  kind: ListKind,
  onPage: (fetched: number, users: IgUser[]) => void | Promise<void>,
  shouldStop: () => boolean,
): Promise<IgUser[]> {
  const all: IgUser[] = [];
  const seen = new Set<string>();
  let maxId: string | null = null;
  let page = 0;

  while (true) {
    if (shouldStop()) {
      throw new IgApiError("Scan stopped.");
    }

    const params = new URLSearchParams({
      count: String(PAGE_SIZE),
    });
    if (maxId) {
      params.set("max_id", maxId);
    }

    const data = await igFetch<FriendshipPage>(
      `/api/v1/friendships/${userId}/${kind}/?${params.toString()}`,
    );

    const batch = (data.users ?? [])
      .map(mapUser)
      .filter((u) => u.id && u.username && !seen.has(u.id));

    for (const user of batch) {
      seen.add(user.id);
      all.push(user);
    }

    page += 1;
    await onPage(all.length, batch);

    const next =
      data.next_max_id === undefined || data.next_max_id === null
        ? null
        : String(data.next_max_id);

    if (!next || batch.length === 0) {
      break;
    }

    maxId = next;

    // Pace requests after the first page to reduce rate-limit risk.
    if (page > 0) {
      await sleep(PAGE_DELAY_MS + Math.floor(Math.random() * 400));
    }
  }

  return all;
}
