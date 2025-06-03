import './style.css';
import wineBottle from "./img/wine-bottle.svg";

export const SpinBottle = () => {
  return (
    <div className="container">
      <section className="spin-bottle">
        
        <div className="spin-bottle__buttons">
          <button className="btn">Pravda</button>
          <button className="btn">Úkol</button>
        </div>

        <img
          className="spin-bottle__image"
          src={wineBottle}
          alt="Flaška"
        />

        <div className="spin-bottle__spin">
          <button className="btn btn--full">Roztočte flašku</button>
        </div>

      </section>
    </div>
  );
};