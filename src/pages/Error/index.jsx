import './style.css';

export const Error = () => {
  return (
    <div className="container">
      <section className="error">
        <h2 className="error__heading">
          Chyba 404 – stránka nenalezena
        </h2>
        <div className="error__text">
          <p>
            Stejně jako naděje, že vám Aneta ještě někdy odepíše.
          </p>
        </div>
      </section>
    </div>
  );
};