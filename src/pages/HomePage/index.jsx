import { useNavigate } from 'react-router-dom';
import './style.css';
import icebergsImg from "./img/icebergs.svg";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div className="content-wrapper">
        <section className="intro">
          <p className="intro__text">
            Ticho je fajn, ale ne na rande. <strong>Icebreaker</strong> vám pomůže prolomit ledy.
          </p>

          <img
            className="intro__image"
            src={icebergsImg}
            alt="Ledovce"
          />

          <div className="intro__options">
            <h2 className="intro__heading">Jak chcete začít?</h2>
            <div className="buttons">
              <button className="button" onClick={() => navigate('/questions')}>
                Na rozehřátí
              </button>
              <button className="button" onClick={() => navigate('/questions')}>
                Zábavné
              </button>
              <button className="button" onClick={() => navigate('/questions')}>
                Co by kdyby
              </button>
              <button className="button" onClick={() => navigate('/questions')}>
                Na tělo
              </button>
              <button className="button" onClick={() => navigate('/questions')}>
                Do hloubky
              </button>
              <button className="button" onClick={() => navigate('/questions')}>
                Mix všeho
              </button>
              <button className="button button--full" onClick={() => navigate('/spin')}>
                Pravda nebo úkol
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};