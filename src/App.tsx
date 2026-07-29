import { useState } from 'react'
import type { Project } from './data/projects'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { ProjectModal } from './components/ProjectModal'
import { Work } from './components/Work'

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Work onSelect={setActiveProject} />
        <Process />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Chris Qin</span>
          <span>Video Editor · Available for hire</span>
        </div>
      </footer>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}

export default App
