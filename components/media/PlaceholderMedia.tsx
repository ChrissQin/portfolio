import Image from "next/image";

type PlaceholderMediaProps = {
  /** Real media path. When null/empty, no <img> is rendered. */
  src?: string | null;
  alt: string;
  label: string;
  hint?: string;
  /** CSS aspect-ratio value, e.g. "16 / 9". */
  aspectRatio: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Visual motif for the empty state. */
  motif?: "frame" | "timeline" | "portrait" | "audio" | "vertical";
};

/**
 * Renders real media when `src` is available; otherwise an intentional CSS
 * placeholder — never a broken <img>.
 */
export function PlaceholderMedia({
  src,
  alt,
  label,
  aspectRatio,
  className = "",
  sizes,
  priority = false,
  motif = "frame",
}: PlaceholderMediaProps) {
  const hasAsset = Boolean(src && src.trim().length > 0);

  return (
    <div
      className={`placeholder-media placeholder-media--${motif} ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {hasAsset ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="placeholder-media__image"
        />
      ) : (
        <div
          className="placeholder-media__empty"
          role="img"
          aria-label={label}
        >
          <span className="placeholder-media__graphic" aria-hidden="true" />
          <span className="placeholder-media__label">{label}</span>
        </div>
      )}
    </div>
  );
}
