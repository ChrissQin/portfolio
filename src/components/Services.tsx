import { services } from '../data/projects'
import { Reveal } from './Reveal'

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <Reveal className="section__header">
          <p className="section__label">Services</p>
          <h2 className="section__title">Ways we can work together</h2>
          <p className="section__text">
            A flexible toolkit for clients who need clear storytelling without a
            huge production footprint.
          </p>
        </Reveal>

        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} className="service-card" delay={index * 90}>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__detail">{service.detail}</p>
              <p className="service-card__text">{service.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
