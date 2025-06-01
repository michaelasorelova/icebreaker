import './style.css';

export const Contact = () => {
  return (
    <div className="container">
      <section className="contact">
        <h2 className="contact__heading">Kontakt</h2>
        <p className="contact__text">
          Icebreaker vytvořily Michaela Šorelová (<a href="mailto:michaelasorelova@gmail.com" className="contact__link">michaela@example.com</a>) a Simona Šusterová (<a href="mailto:simsusterova@gmail.com" className="contact__link">simona@example.com</a>).
        </p>
        <p className="contact__text">
          Speciální poděkování patří Sergejovi Kurbanovi.
        </p>
      </section>
    </div>
  );
};