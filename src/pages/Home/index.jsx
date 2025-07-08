import { useNavigate } from 'react-router-dom';
import './style.css';
import IceCube from "./img/ice-cube.svg";


export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/question-cards/${category}`);
  };

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

        <div>
          <h3 className="home__subheading">Jak chcete začít?</h3>
          <div className="home__options">
            <div className="home__option">
              <p>Karty s otázkami</p>
              <div className="home__buttons">
                <button className="btn" onClick={() => handleNavigate('na_rozehrati')}>
                  Na rozehřátí
                </button>
                <button className="btn" onClick={() => handleNavigate('na_pobaveni')}>
                  Na pobavení
                </button>
                <button className="btn" onClick={() => handleNavigate('co_by_kdyby')}>
                  Co by kdyby
                </button>
                <button className="btn" onClick={() => handleNavigate('na_telo')}>
                  Na tělo
                </button>
                <button className="btn" onClick={() => handleNavigate('do_hloubky')}>
                  Do hloubky
                </button>
                <button className="btn" onClick={() => handleNavigate('mix_vseho')}>
                  Mix všeho
                </button>
              </div>
            </div>
            <div className="home__option">
              <p>Mini hry</p>
              <div className="home__buttons">
                <button className="btn btn--full" onClick={() => navigate('/spin-bottle-game')}>
                  Pravda nebo úkol
                </button>
                <button className="btn btn--full" onClick={() => navigate('/relationship-compass')}>
                  Vztahový kompas
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};