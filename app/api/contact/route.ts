import { Resend } from "resend";
import { NextResponse } from "next/server";

import {
  contactInboxEmail,
  formatContactEmail,
  parseContactFormPayload,
} from "@/lib/contact-email";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = parseContactFormPayload(body);

  if (!payload) {
    return NextResponse.json(
      { error: "Please complete all required fields with a valid email." },
      { status: 400 },
    );
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "CQ Visuals <onboarding@resend.dev>";
  const { subject, text } = formatContactEmail(payload);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [contactInboxEmail],
    replyTo: payload.email,
    subject,
    text,
  });

  if (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
