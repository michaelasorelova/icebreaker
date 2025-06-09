import './style.css';

export const Contact = () => {
  return (
    <div className="container">
      <section className="contact">

        <h2 className="contact__heading">Kontakt</h2>

        <div className="contact__text">
          <p>
            Icebreaker vytvořily Michaela Šorelová (<a href="mailto:michaelasorelova@gmail.com" className="contact__link">michaelasorelova@gmail.com</a>) a Simona Šusterová (<a href="mailto:simsusterova@gmail.com" className="contact__link">simsusterova@gmail.com</a>).
          </p>  
          <p>
            Speciální poděkování patří Sergejovi Kurbanovi.
          </p>
        </div>
        
      </section>
    </div>
  );
};