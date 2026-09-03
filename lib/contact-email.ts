import { siteConfig } from "@/lib/constants";

export const contactInboxEmail =
  process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

export type ContactFormPayload = {
  name: string;
  email: string;
  website?: string;
  project: string;
};

export function parseContactFormPayload(
  body: unknown,
): ContactFormPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const { name, email, website, project } = body as Record<string, unknown>;

  if (typeof name !== "string" || typeof email !== "string") {
    return null;
  }

  if (typeof project !== "string") {
    return null;
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedProject = project.trim();
  const trimmedWebsite =
    typeof website === "string" ? website.trim() : undefined;

  if (!trimmedName || !trimmedEmail || !trimmedProject) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return null;
  }

  return {
    name: trimmedName,
    email: trimmedEmail,
    website: trimmedWebsite,
    project: trimmedProject,
  };
}

export function formatContactEmail(payload: ContactFormPayload) {
  const websiteLine = payload.website
    ? `Company website: ${payload.website}`
    : "Company website: (not provided)";

  return {
    subject: `New contact from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      websiteLine,
      "",
      "Project details:",
      payload.project,
    ].join("\n"),
  };
}
