import type { VideoProvider } from "@/lib/projects";

export function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

export function getVimeoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("vimeo.com")) {
      return null;
    }
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts.at(-1) ?? null;
  } catch {
    return null;
  }
}

export function getEmbedSrc(
  provider: VideoProvider,
  url: string | null | undefined,
): string | null {
  if (!url) {
    return null;
  }

  if (provider === "youtube") {
    const id = getYouTubeId(url);
    return id
      ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
      : null;
  }

  if (provider === "vimeo") {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  return null;
}
