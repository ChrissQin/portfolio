import { footerSocialLinks, type FooterSocialId } from "@/lib/site";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SocialIcon({ id }: { id: FooterSocialId }) {
  switch (id) {
    case "linkedin":
      return (
        <svg {...iconProps}>
          <path d="M6.5 9.5v8" />
          <path d="M6.5 6.5h.01" />
          <path d="M10 17.5v-5.2c0-1.5 1-2.8 2.8-2.8s2.7 1.2 2.7 2.8V17.5" />
          <path d="M4 4.5h16v15H4z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...iconProps}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
          <circle cx="12" cy="12" r="3.4" />
          <path d="M17 7.2h.01" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...iconProps}>
          <path d="M4.5 8.2c0-1.2 1-2.2 2.2-2.2h11c1.2 0 2.2 1 2.2 2.2v7.6c0 1.2-1 2.2-2.2 2.2h-11a2.2 2.2 0 0 1-2.2-2.2z" />
          <path d="m10.2 9.5 4.8 2.5-4.8 2.5z" />
        </svg>
      );
  }
}

export function FooterSocials() {
  return (
    <ul className="nen-footer__socials">
      {footerSocialLinks.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            className="nen-footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <SocialIcon id={social.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
