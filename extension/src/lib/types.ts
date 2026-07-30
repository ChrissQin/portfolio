export interface IgUser {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  is_private?: boolean;
  is_verified?: boolean;
}

export type ResultTab = "not_following_back" | "not_followed_back" | "mutual";

export interface ScanDiff {
  notFollowingBack: IgUser[];
  notFollowedBack: IgUser[];
  mutual: IgUser[];
  followersCount: number;
  followingCount: number;
}

export interface ScanResult extends ScanDiff {
  scannedAt: string;
  username: string;
  userId: string;
}

export interface ScanProgress {
  phase: "idle" | "auth" | "followers" | "following" | "diff" | "done" | "error";
  followersFetched: number;
  followingFetched: number;
  message?: string;
}

export type PanelMessage =
  | { type: "TOGGLE_PANEL" }
  | { type: "PANEL_READY" };
