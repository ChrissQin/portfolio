import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal className="contact__panel">
          <p className="section__label">Contact</p>
          <h2 className="contact__title">Got a story to tell?</h2>
          <p className="contact__text">
            Whether you need a reel, a restaurant ad, or a short documentary
            piece, send a note. I&apos;ll reply with availability and a simple
            plan for the first cut.
          </p>
          <p className="contact__tagline">
            Curious by nature. Editor by practice. Storyteller at heart.
          </p>
          <div className="contact__links">
            <a className="contact__email" href="mailto:thechrisqin@gmail.com">
              thechrisqin@gmail.com
            </a>
          </div>
          <div className="contact__links">
            <a className="btn btn--primary" href="mailto:thechrisqin@gmail.com">
              Email cqvisuals
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
