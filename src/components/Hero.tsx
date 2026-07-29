export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=2400&q=80"
          alt=""
          width={2400}
          height={1600}
          fetchPriority="high"
        />
      </div>

      <div className="hero__content">
        <h1 className="hero__brand">
          Chris
          <span>Qin</span>
        </h1>
        <p className="hero__headline">Cuts that hold attention.</p>
        <p className="hero__support">
          Commercial, narrative, and brand films edited with pace, sound, and intention.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            View selected work
          </a>
          <a className="btn btn--ghost" href="#contact">
            Start a project
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        Scroll
      </div>
    </section>
  )
}
