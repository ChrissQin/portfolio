import { collaborators } from "@/data/collaborators";

export function Collaborators() {
  return (
    <section
      className="collaborators"
      aria-labelledby="collaborators-heading"
    >
      <div className="container">
        <div className="collaborators__header">
          <h2 id="collaborators-heading" className="section-kicker">
            Selected collaborators
          </h2>
        </div>
        <ul className="collaborators__list">
          {collaborators.map((entry) => (
            <li
              key={entry.label}
              className={
                entry.kind === "client"
                  ? "collaborators__item collaborators__item--client"
                  : "collaborators__item"
              }
            >
              {entry.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
