"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

function LockIcon() {
  return (
    <svg
      className="nen-form__input-icon"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 8.5V6.25C5.5 4.17893 7.17893 2.5 9.25 2.5C11.3211 2.5 13 4.17893 13 6.25V8.5M4.75 8.5H13.75C14.4404 8.5 15 9.05964 15 9.75V15.25C15 15.9404 14.4404 16.5 13.75 16.5H4.75C4.05964 16.5 3.5 15.9404 3.5 15.25V9.75C3.5 9.05964 4.05964 8.5 4.75 8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          website: formData.get("website"),
          project: formData.get("project"),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setSubmitState("error");
        setErrorMessage(
          data?.error ??
            "Something went wrong while sending your message. Please try again.",
        );
        return;
      }

      setSubmitState("success");
      form.reset();
    } catch {
      setSubmitState("error");
      setErrorMessage(
        "Something went wrong while sending your message. Please try again.",
      );
    }
  };

  return (
    <>
      <section className="nen-contact-hero" aria-labelledby="contact-heading">
        <div className="nen-container">
          <div className="nen-contact-hero__inner">
            <h1 id="contact-heading" className="nen-contact-hero__headline">
              Have an idea? <em>Let&apos;s chat.</em>
            </h1>
            <p className="nen-contact-hero__lede">
              We partner with teams and creators at every stage—emerging ideas
              to established brands—to create bold films, visual experiences,
              and stories.
            </p>
          </div>
        </div>
      </section>

      <section className="nen-contact" aria-labelledby="contact-form-heading">
        <div className="nen-container">
          <div className="nen-contact__card">
            <h2 id="contact-form-heading" className="sr-only">
              Contact form
            </h2>

            {submitState === "success" ? (
              <p className="nen-contact__success" role="status">
                Thank you! Your submission has been received!
              </p>
            ) : (
              <form className="nen-form" onSubmit={onSubmit} noValidate>
                {submitState === "error" && errorMessage ? (
                  <p className="nen-contact__error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <label className="nen-form__field">
                  <span className="nen-form__label">
                    Name<span aria-hidden="true">*</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className="nen-form__input"
                    placeholder="First and last name"
                    disabled={submitState === "submitting"}
                  />
                </label>

                <label className="nen-form__field">
                  <span className="nen-form__label">
                    Email address<span aria-hidden="true">*</span>
                  </span>
                  <span className="nen-form__input-wrap">
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="nen-form__input nen-form__input--with-icon"
                      placeholder="example@email.com"
                      disabled={submitState === "submitting"}
                    />
                    <LockIcon />
                  </span>
                </label>

                <label className="nen-form__field">
                  <span className="nen-form__label">Company website</span>
                  <input
                    type="url"
                    name="website"
                    autoComplete="url"
                    className="nen-form__input"
                    placeholder="example-website.com"
                    disabled={submitState === "submitting"}
                  />
                </label>

                <label className="nen-form__field">
                  <span className="nen-form__label">
                    Tell us about your project
                    <span aria-hidden="true">*</span>
                  </span>
                  <textarea
                    name="project"
                    required
                    rows={6}
                    className="nen-form__textarea"
                    placeholder="Include delivery deadline if possible"
                    disabled={submitState === "submitting"}
                  />
                </label>

                <button
                  type="submit"
                  className="nen-form__submit"
                  disabled={submitState === "submitting"}
                >
                  {submitState === "submitting" ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
