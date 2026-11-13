/**
 * YouTube URL helpers. Embeds are created only after explicit play intent.
 */

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

/** Extract an 11-character YouTube video id from common URL shapes. */
export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url?.trim()) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  if (!YOUTUBE_HOSTS.has(parsed.hostname) && !YOUTUBE_HOSTS.has(host)) {
    return null;
  }

  if (host === "youtu.be") {
    const id = parsed.pathname.split("/").filter(Boolean)[0];
    return isYouTubeId(id) ? id : null;
  }

  const fromQuery = parsed.searchParams.get("v");
  if (isYouTubeId(fromQuery)) {
    return fromQuery;
  }

  const parts = parsed.pathname.split("/").filter(Boolean);
  const markers = new Set(["embed", "shorts", "live", "v"]);
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (markers.has(parts[i]) && isYouTubeId(parts[i + 1])) {
      return parts[i + 1];
    }
  }

  return null;
}

/** Best-effort poster URLs, highest quality first. */
export function getYouTubeThumbnailCandidates(
  url: string | null | undefined,
): string[] {
  const id = getYouTubeVideoId(url);
  if (!id) return [];

  const isShorts = Boolean(url?.includes("/shorts/"));
  if (isShorts) {
    return [
      `https://i.ytimg.com/vi/${id}/oar1.jpg`,
      `https://img.youtube.com/vi/${id}/oar1.jpg`,
      `https://i.ytimg.com/vi/${id}/hq2.jpg`,
    ];
  }

  return [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  ];
}

export function getYouTubeEmbedSrc(
  url: string | null | undefined,
  options?: { autoplay?: boolean; locked?: boolean; origin?: string },
): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) {
    return null;
  }

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    cc_load_policy: "0",
    // Keep playback on-site: no related-channel chrome, no fullscreen jump-off.
    fs: "0",
    disablekb: "1",
    enablejsapi: "1",
  });

  if (options?.origin) {
    params.set("origin", options.origin);
  }

  if (options?.autoplay) {
    params.set("autoplay", "1");
  }

  // Locked lightbox: hide native controls so YouTube UI isn't the interaction surface.
  // Loop (requires playlist=id) so the end-screen with channel / related links never appears.
  if (options?.locked) {
    params.set("controls", "0");
    params.set("loop", "1");
    params.set("playlist", id);
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function isYouTubeId(value: string | null | undefined): value is string {
  return Boolean(value && /^[\w-]{11}$/.test(value));
}
