import { tools } from '../data/projects'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal className="about__portrait">
          <img
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
            alt="Editing desk with timeline monitors and soft tungsten light"
            width={1200}
            height={1500}
            loading="lazy"
          />
        </Reveal>

        <Reveal className="about__copy" delay={120}>
          <p className="section__label">About</p>
          <h2 className="section__title">Editor for stories that need to move</h2>
          <p className="section__text">
            I&apos;m Chris Qin—a video editor focused on rhythm, clarity, and emotional payoff.
            Whether it&apos;s a thirty-second spot or a narrative short, I cut for the moment the
            audience leans in.
          </p>
          <p className="section__text">
            Based remotely and available for brand, commercial, and independent projects.
          </p>
          <div className="tools" aria-label="Tools">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
