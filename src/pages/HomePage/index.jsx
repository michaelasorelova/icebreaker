import { useNavigate } from 'react-router-dom';
import './style.css';
import icebergsImg from "./img/icebergs.svg";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className="home">
        <p className="home__text">
          Ticho je fajn, ale ne na rande. <strong>Icebreaker</strong> vám pomůže prolomit ledy.
        </p>

        <img
          className="home__image"
          src={icebergsImg}
          alt="Ledovce"
        />

        <div className="home__options">
          <h2 className="home__heading">Jak chcete začít?</h2>
          <div className="home__buttons">
            <button
              className="home__button"
              onClick={() => navigate('/questions', { state: { category: 'Na rozehřátí' } })}
            >
              Na rozehřátí
            </button>
            <button
              className="home__button"
              onClick={() => navigate('/questions', { state: { category: 'Zábavné' } })}
            >
              Zábavné
            </button>
            <button
              className="home__button"
              onClick={() => navigate('/questions', { state: { category: 'Co by kdyby' } })}
            >
              Co by kdyby
            </button>
            <button
              className="home__button"
              onClick={() => navigate('/questions', { state: { category: 'Na tělo' } })}
            >
              Na tělo
            </button>
            <button
              className="home__button"
              onClick={() => navigate('/questions', { state: { category: 'Do hloubky' } })}
            >
              Do hloubky
            </button>
            <button
              className="home__button"
              onClick={() => navigate('/questions', { state: { category: 'Mix všeho' } })}
            >
              Mix všeho
            </button>
            <button className="home__button home__button--full" onClick={() => navigate('/spin')}>
              Pravda nebo úkol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};