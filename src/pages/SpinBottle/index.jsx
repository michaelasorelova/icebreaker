import './style.css';
import wineBottle from "./img/wine-bottle.svg";
import { useState } from "react";

export const SpinBottle = () => {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    const targetAngle = Math.random() < 0.5 ? 0 : 180;

    const spinAmount = 5 * 360 + targetAngle;

    setRotation((prev) => prev + spinAmount);
  };

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
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        <div className="spin-bottle__spin">
          <button className="btn btn--full" onClick={handleSpin}>
            Roztočte flašku
          </button>
        </div>

      </section>
    </div>
  );
};
