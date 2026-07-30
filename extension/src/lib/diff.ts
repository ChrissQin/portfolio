import type { IgUser, ScanDiff } from "./types";

export function computeDiff(
  followers: IgUser[],
  following: IgUser[],
): ScanDiff {
  const followerIds = new Set(followers.map((u) => u.id));
  const followingIds = new Set(following.map((u) => u.id));

  const notFollowingBack = following.filter((u) => !followerIds.has(u.id));
  const notFollowedBack = followers.filter((u) => !followingIds.has(u.id));
  const mutual = following.filter((u) => followerIds.has(u.id));

  const byUsername = (a: IgUser, b: IgUser) =>
    a.username.localeCompare(b.username, undefined, { sensitivity: "base" });

  return {
    notFollowingBack: [...notFollowingBack].sort(byUsername),
    notFollowedBack: [...notFollowedBack].sort(byUsername),
    mutual: [...mutual].sort(byUsername),
    followersCount: followers.length,
    followingCount: following.length,
  };
}
