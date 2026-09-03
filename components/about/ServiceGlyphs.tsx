type ServiceGlyphName = "creative" | "production" | "post" | "formats";

const glyphProps = {
  className: "nen-services__glyph",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
} as const;

export function ServiceGlyph({ name }: { name: ServiceGlyphName }) {
  switch (name) {
    case "creative":
      return (
        <svg {...glyphProps}>
          <path
            d="M24 4L27.2 20.8L44 24L27.2 27.2L24 44L20.8 27.2L4 24L20.8 20.8L24 4Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "production":
      return (
        <svg {...glyphProps}>
          <ellipse cx="24" cy="24" rx="18" ry="18" stroke="currentColor" strokeWidth="2.5" />
          <path
            d="M24 6C24 6 30 14 30 24C30 34 24 42 24 42M24 6C24 6 18 14 18 24C18 34 24 42 24 42M6 24H42"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "post":
      return (
        <svg {...glyphProps}>
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
        </svg>
      );
    case "formats":
      return (
        <svg {...glyphProps}>
          <rect
            x="8"
            y="8"
            width="32"
            height="32"
            rx="2"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M14 34L34 14M18 38L38 18M10 30L30 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
