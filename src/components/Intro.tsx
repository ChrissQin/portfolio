import { Reveal } from './Reveal'

export function Intro() {
  return (
    <section className="section intro" aria-label="Overview">
      <div className="container">
        <Reveal className="intro__panel">
          <p className="intro__eyebrow">Portfolio</p>
          <h2 className="intro__title">
            Learning in public. Cutting with care.
          </h2>
          <p className="intro__text">
            I&apos;m Chris Qin—founder of cqvisuals Inc. I direct, film, and edit
            social-first ads, creator content, and selected documentary projects
            from concept to final delivery. Take a look around to see the kinds
            of stories we can build together.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
