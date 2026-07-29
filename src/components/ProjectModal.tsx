import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = Boolean(project)

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`modal${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby={project ? `project-${project.id}-title` : undefined}
      onClick={onClose}
    >
      {project ? (
        <div className="modal__dialog" onClick={(event) => event.stopPropagation()}>
          <div className="modal__video">
            <video key={project.id} controls autoPlay playsInline poster={project.image}>
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
          <div className="modal__body">
            <div className="modal__top">
              <div>
                <h2 className="modal__title" id={`project-${project.id}-title`}>
                  {project.title}
                </h2>
                <p className="modal__meta">
                  {project.category} · {project.year} · {project.duration}
                </p>
              </div>
              <button
                ref={closeRef}
                className="modal__close"
                type="button"
                aria-label="Close project"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
            <p className="modal__desc">{project.description}</p>
            <p className="modal__meta">
              {project.client} · {project.role}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
