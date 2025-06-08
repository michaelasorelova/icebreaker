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

          
          <i className="fi fi-sr-heart-crack pulsing-heart" style={{ fontSize: '8rem', marginTop: '1rem', color: 'crimson' }}></i>
        </div>

      </section>
    </div>
  );
};
