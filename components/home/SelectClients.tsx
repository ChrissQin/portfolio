import { placeholderClients } from "@/data/placeholders";

export function SelectClients() {
  return (
    <section className="nen-clients" aria-labelledby="nen-clients-heading">
      <div className="nen-container">
        <h2 id="nen-clients-heading" className="nen-section-title">
          Select Clients
        </h2>
        <ul className="nen-clients__grid">
          {placeholderClients.map((name) => (
            <li key={name} className="nen-clients__item">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
