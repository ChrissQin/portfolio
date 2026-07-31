import { capabilities } from "@/data/services";

export function WhatIDo() {
  return (
    <section className="what-i-do" aria-labelledby="what-i-do-heading">
      <div className="container">
        <div className="what-i-do__header">
          <p className="mono-label">Capabilities</p>
          <h2 id="what-i-do-heading" className="display-heading">
            What I Do
          </h2>
          <p className="what-i-do__lede">
            Editing is the center. Shooting and building around the cut when the
            project needs it.
          </p>
        </div>

        <ol className="what-i-do__list">
          {capabilities.map((item) => (
            <li
              key={item.id}
              className={`what-i-do__item what-i-do__item--${item.emphasis}`}
            >
              <p className="what-i-do__index">
                {item.index}
                <span aria-hidden="true"> — </span>
              </p>
              <div className="what-i-do__body">
                <h3 className="what-i-do__title">{item.title}</h3>
                {item.lines.map((line) => (
                  <p key={line} className="what-i-do__line">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
