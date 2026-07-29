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
          <h2 className="section__title">Building cqvisuals from the ground up</h2>
          <p className="section__text">
            Since June 2021 I&apos;ve been growing cqvisuals Inc. out of Atlanta,
            GA—specializing in short-form videos, long-form content, ads, reels,
            and documentary projects.
          </p>
          <p className="section__text">
            Along the way I&apos;ve generated 15M+ total views across personal
            channels and built an audience of 14K+ subscribers. I&apos;m still
            early in the craft, and that keeps the work hungry, collaborative,
            and focused on clear stories.
          </p>
          <ul className="about__stats">
            <li>
              <strong>15M+</strong>
              <span>views across channels</span>
            </li>
            <li>
              <strong>14K+</strong>
              <span>subscribers</span>
            </li>
            <li>
              <strong>2021–</strong>
              <span>cqvisuals Inc.</span>
            </li>
          </ul>
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
