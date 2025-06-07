import './style.css';
import wineBottle from "./img/wine-bottle.svg";
import { useState } from "react";

export const SpinBottle = () => {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    // Vyber 0 nebo 180 stupňů náhodně
    const targetAngle = Math.random() < 0.5 ? 0 : 180;

    // Přidej několik úplných otáček (např. 5 × 360 = 1800)
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
