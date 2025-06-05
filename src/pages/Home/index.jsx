import { useNavigate } from 'react-router-dom';
import './style.css';
import IceCube from "./img/ice-cube.svg";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className="home">

        <div className="home__text">
          <p>
            Ticho je fajn, ale ne na rande. <strong>Icebreaker</strong> vám pomůže prolomit ledy – společně.    
          </p>
          <p>
            Čím víc otázek si navzájem zodpovíte, tím blíž si budete.
          </p>
        </div>

        <img
          className="home__image"
          src={IceCube}
          alt="Kostka ledu"
        />

        <div className="home__options">
          <h3 className="home__heading">Jak chcete začít?</h3>
          <div className="home__buttons">
            <button
              className="btn"
              onClick={() => navigate('/question-cards', { state: { category: 'Na rozehřátí' } })}
            >
              Na rozehřátí
            </button>
            <button
              className="btn"
              onClick={() => navigate('/question-cards', { state: { category: 'Na pobavení' } })}
            >
              Na pobavení
            </button>
            <button
              className="btn"
              onClick={() => navigate('/question-cards', { state: { category: 'Co by kdyby' } })}
            >
              Co by kdyby
            </button>
            <button
              className="btn"
              onClick={() => navigate('/question-cards', { state: { category: 'Na tělo' } })}
            >
              Na tělo
            </button>
            <button
              className="btn"
              onClick={() => navigate('/question-cards', { state: { category: 'Do hloubky' } })}
            >
              Do hloubky
            </button>
            <button
              className="btn"
              onClick={() => navigate('/question-cards', { state: { category: 'Mix všeho' } })}
            >
              Mix všeho
            </button>
            <button className="btn btn--full" onClick={() => navigate('/spin')}>
              Pravda nebo úkol
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};