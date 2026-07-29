import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal className="contact__panel">
          <p className="section__label">Contact</p>
          <h2 className="contact__title">Let&apos;s build the next cut.</h2>
          <p className="contact__text">
            Have footage, a treatment, or a deadline that needs a sharp edit? Send the brief and
            I&apos;ll reply with availability and a first-pass approach.
          </p>
          <div className="contact__links">
            <a className="contact__email" href="mailto:thechrisqin@gmail.com">
              thechrisqin@gmail.com
            </a>
          </div>
          <div className="contact__links">
            <a className="btn btn--primary" href="mailto:thechrisqin@gmail.com">
              Email Chris
            </a>
            <a
              className="btn btn--ghost"
              href="https://github.com/ChrissQin"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
