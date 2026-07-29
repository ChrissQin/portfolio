import { useState } from 'react'
import type { Project } from './data/projects'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { ProjectModal } from './components/ProjectModal'
import { Services } from './components/Services'
import { Work } from './components/Work'

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Work onSelect={setActiveProject} />
        <Services />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} cqvisuals Inc.</span>
          <span>Atlanta, GA · Available for projects</span>
        </div>
      </footer>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}

export default App
