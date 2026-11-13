"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { getYouTubeEmbedSrc, getYouTubeVideoId } from "@/lib/youtube";
import type { Orientation } from "@/lib/projects";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  unloadModule?: (module: string) => void;
  setOption?: (module: string, option: string, value: unknown) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: {
      events?: {
        onReady?: (event: { target: YTPlayer }) => void;
        onStateChange?: (event: { data: number; target: YTPlayer }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type VideoLightboxProps = {
  title: string;
  /** Optional supporting line (role / content type) shown under the title. */
  detail?: string;
  videoUrl: string;
  orientation: Orientation;
  onClose: () => void;
  /** Element that opened the lightbox — focus returns here on close. */
  returnFocusRef: React.RefObject<HTMLElement | null>;
};

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

/**
 * On-site YouTube lightbox. The iframe cannot be clicked (no channel / YouTube
 * redirects); play/pause is handled by our own overlay via the IFrame API.
 */
export function VideoLightbox({
  title,
  detail,
  videoUrl,
  orientation,
  onClose,
  returnFocusRef,
}: VideoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(true);
  const [origin, setOrigin] = useState("");
  const titleId = useId();
  const detailId = useId();
  const iframeDomId = useId().replace(/:/g, "");
  const videoId = getYouTubeVideoId(videoUrl);
  const embedSrc = getYouTubeEmbedSrc(videoUrl, {
    autoplay: true,
    locked: true,
    origin: origin || undefined,
  });
  const isVertical = orientation === "vertical";

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const togglePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    const state = player.getPlayerState();
    if (state === 1) {
      player.pauseVideo();
      setPlaying(false);
    } else {
      player.playVideo();
      setPlaying(true);
    }
  }, []);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnTarget = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      returnTarget?.focus();
    };
  }, [returnFocusRef]);

  useEffect(() => {
    if (!embedSrc || !videoId || !origin) return;

    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !iframeRef.current) return;

      playerRef.current = new YT.Player(iframeRef.current, {
        events: {
          onReady: (event) => {
            // IFrame API can rewrite the node — keep it non-interactive.
            const frame =
              iframeRef.current ??
              dialogRef.current?.querySelector<HTMLIFrameElement>("iframe");
            if (frame) {
              frame.style.pointerEvents = "none";
              frame.tabIndex = -1;
              frame.setAttribute("aria-hidden", "true");
            }
            // Force captions off (cc_load_policy alone follows user prefs).
            event.target.unloadModule?.("captions");
            event.target.setOption?.("captions", "track", {});
            event.target.playVideo();
            setPlaying(true);
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              event.target.unloadModule?.("captions");
              event.target.setOption?.("captions", "track", {});
            }
            setPlaying(event.data === YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [embedSrc, videoId, origin]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === " " || event.key === "k" || event.key === "K") {
        const tag = (event.target as HTMLElement | null)?.tagName;
        if (tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA") return;
        event.preventDefault();
        togglePlayback();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.tagName !== "IFRAME");

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose, togglePlayback]);

  const onBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      handleClose();
    }
  };

  if (!embedSrc) {
    return null;
  }

  return (
    <div
      className="video-lightbox"
      role="presentation"
      onMouseDown={onBackdropClick}
    >
      <div
        ref={dialogRef}
        className={`video-lightbox__dialog${isVertical ? " video-lightbox__dialog--vertical" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={detail ? detailId : undefined}
        tabIndex={-1}
        onKeyDown={onDialogKeyDown}
      >
        <div className="video-lightbox__chrome">
          <div className="video-lightbox__heading">
            <h2 id={titleId} className="video-lightbox__title">
              {title}
            </h2>
            {detail ? (
              <p id={detailId} className="video-lightbox__detail">
                {detail}
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="video-lightbox__close"
            onClick={handleClose}
            aria-label="Close video"
          >
            Close
            <span aria-hidden="true"> ✕</span>
          </button>
        </div>
        <div
          className={`video-lightbox__frame${isVertical ? " video-lightbox__frame--vertical" : ""}`}
        >
          <iframe
            ref={iframeRef}
            id={iframeDomId}
            className="video-lightbox__iframe"
            src={embedSrc}
            title={`${title} video player`}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            loading="eager"
            tabIndex={-1}
            referrerPolicy="strict-origin-when-cross-origin"
            // No allow-popups / allow-top-navigation: blocks YouTube open-in-new-tab.
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
          <button
            type="button"
            className="video-lightbox__hitbox"
            onClick={togglePlayback}
            aria-label={playing ? "Pause video" : "Play video"}
          />
        </div>
        <p className="video-lightbox__hint">
          {playing ? "Click video to pause" : "Click video to play"} · Esc to close
        </p>
      </div>
    </div>
  );
}
