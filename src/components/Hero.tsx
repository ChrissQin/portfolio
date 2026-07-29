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
          cq
          <span>visuals</span>
        </h1>
        <p className="hero__headline">
          Videographer / Multimedia Storyteller
        </p>
        <p className="hero__support">
          Atlanta-based beginner portfolio for short-form, ads, reels, and
          documentary work—built one honest cut at a time.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            View the work
          </a>
          <a className="btn btn--ghost" href="#contact">
            Let&apos;s collaborate
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
