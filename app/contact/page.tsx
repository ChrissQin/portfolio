"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { MarqueeCTA } from "@/components/layout/MarqueeCTA";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="nen-page-hero" aria-labelledby="contact-heading">
        <div className="nen-container nen-contact__intro">
          <h1 id="contact-heading" className="nen-page-hero__headline">
            Looking to launch? Let&apos;s chat.
          </h1>
          <p className="nen-contact__lede">
            We partner with teams at every stage—from startups to global
            enterprises, to create brands, digital experiences, and stories that
            matter.
          </p>
        </div>
      </section>

      <section className="nen-contact" aria-labelledby="contact-form-heading">
        <div className="nen-container">
          <h2 id="contact-form-heading" className="sr-only">
            Contact form
          </h2>

          {submitted ? (
            <p className="nen-contact__success" role="status">
              Thank you! Your submission has been received!
            </p>
          ) : (
            <form className="nen-form" onSubmit={onSubmit}>
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
                />
              </label>

              <label className="nen-form__field">
                <span className="nen-form__label">
                  Email address<span aria-hidden="true">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="nen-form__input"
                />
              </label>

              <label className="nen-form__field">
                <span className="nen-form__label">Company website</span>
                <input
                  type="url"
                  name="website"
                  autoComplete="url"
                  className="nen-form__input"
                  placeholder="https://"
                />
              </label>

              <label className="nen-form__field">
                <span className="nen-form__label">
                  Tell us about your project<span aria-hidden="true">*</span>
                </span>
                <textarea
                  name="project"
                  required
                  rows={6}
                  className="nen-form__textarea"
                />
              </label>

              <button type="submit" className="nen-form__submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </section>

      <MarqueeCTA />
    </>
  );
}
