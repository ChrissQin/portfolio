import { useEffect, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled || open ? ' is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#top" onClick={close}>
          Chris Qin
        </a>

        <nav className={`nav__links${open ? ' is-open' : ''}`} aria-label="Primary">
          <a href="#work" onClick={close}>
            Work
          </a>
          <a href="#process" onClick={close}>
            Process
          </a>
          <a href="#about" onClick={close}>
            About
          </a>
          <a className="nav__cta" href="#contact" onClick={close}>
            Contact
          </a>
        </nav>

        <button
          className="nav__toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
      </div>
    </header>
  )
}
