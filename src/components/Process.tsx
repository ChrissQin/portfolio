import { processSteps } from '../data/projects'
import { Reveal } from './Reveal'

export function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <Reveal className="section__header">
          <p className="section__label">Process</p>
          <h2 className="section__title">How the cut finds its shape</h2>
          <p className="section__text">
            Editing is listening first—then deciding what the audience should feel next.
          </p>
        </Reveal>

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} className="process-step" delay={index * 90}>
              <span className="process-step__number">{step.number}</span>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__text">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
