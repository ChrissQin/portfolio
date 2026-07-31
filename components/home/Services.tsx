import { services } from "@/data/services";

export function Services() {
  const primary = services.find((service) => service.emphasis === "primary");
  const secondary = services.filter(
    (service) => service.emphasis === "secondary",
  );

  return (
    <section className="home-services" aria-labelledby="services-heading">
      <div className="container">
        <div className="home-services__intro">
          <p className="section-eyebrow">Services</p>
          <h2 id="services-heading" className="section-title">
            How I can help
          </h2>
          <p className="section-lede">
            Editing is the center of my practice. Videography and production
            support the work when a project needs more than the cut.
          </p>
        </div>

        {primary ? (
          <article className="service service--primary">
            <div className="service__copy">
              <h3 className="service__title">{primary.title}</h3>
              <p className="service__summary">{primary.summary}</p>
            </div>
            <ul className="service__areas">
              {primary.areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </article>
        ) : null}

        <div className="home-services__secondary">
          {secondary.map((service) => (
            <article key={service.id} className="service service--secondary">
              <h3 className="service__title">{service.title}</h3>
              <p className="service__summary">{service.summary}</p>
              <ul className="service__areas">
                {service.areas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
