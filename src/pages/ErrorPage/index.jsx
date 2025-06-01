import './style.css';

export const ErrorPage = () => {
  return (
    <div className="container">
      <section className="error">
        <h2 className="error__heading">
          Chyba 404 – stránka nenalezena
        </h2>
        <p className="error__text">
          Stejně jako naděje, že vám Aneta ještě někdy odepíše.
        </p>
      </section>
    </div>
  );
};