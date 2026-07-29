import { projects, type Project } from '../data/projects'
import { Reveal } from './Reveal'

type WorkProps = {
  onSelect: (project: Project) => void
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 2.2v11.6L13.5 8 3.5 2.2z" />
    </svg>
  )
}

export function Work({ onSelect }: WorkProps) {
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal className="section__header">
          <p className="section__label">Selected work</p>
          <h2 className="section__title">Recent cuts</h2>
          <p className="section__text">
            A short reel of brand films, commercials, and narrative pieces shaped in the edit.
          </p>
        </Reveal>

        <div className="work-list">
          {projects.map((project, index) => (
            <Reveal key={project.id} as="div" delay={index * 70}>
              <button
                type="button"
                className="work-item"
                onClick={() => onSelect(project)}
                aria-label={`Play ${project.title}`}
              >
                <div className="work-item__image">
                  <img
                    src={project.image}
                    alt=""
                    width={1600}
                    height={1000}
                    loading="lazy"
                  />
                  <span className="work-item__play">
                    <PlayIcon />
                  </span>
                </div>
                <div className="work-item__meta">
                  <div className="work-item__top">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                    <span>{project.duration}</span>
                  </div>
                  <h3 className="work-item__title">{project.title}</h3>
                  <p className="work-item__desc">{project.description}</p>
                  <p className="work-item__role">
                    {project.client} · {project.role}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
