import './style.css';
import wineBottle from "./img/wine-bottle.svg";
import { useState, useEffect } from "react";

export const SpinBottle = () => {
  const [rotation, setRotation] = useState(0);
  const [dares, setDares] = useState([]);
  const [truths, setTruths] = useState([]);
  const [currentText, setCurrentText] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    const loadDares = async () => {
      try {
        const res = await fetch('/api/dares.json');
        const data = await res.json();
        setDares(data);
      } catch (err) {
        console.error("Chyba při načítání úkolů:", err);
      }
    };
    loadDares();
  }, []);

  useEffect(() => {
    const loadTruths = async () => {
      try {
        const res = await fetch('/api/truths.json');
        const data = await res.json();
        setTruths(data);
      } catch (err) {
        console.error("Chyba při načítání pravd:", err);
      }
    };
    loadTruths();
  }, []);
  

  const handleSpin = () => {
    const targetAngle = Math.random() < 0.5 ? 0 : 180;
    const spinAmount = 5 * 360 + targetAngle;
    setRotation((prev) => prev + spinAmount);
    setHasSpun(true);
    setHasChosen(false);
  };

  const handleDareClick = () => {
    if (!dares.length) {
      setCurrentText({ type: 'Úkol', text: 'Úkoly nebyly načteny.' });
    } else {
      const randomIndex = Math.floor(Math.random() * dares.length);
      const selectedDare = dares[randomIndex];
      setCurrentText({ type: 'Úkol', text: selectedDare });
    }
    setShowOverlay(true);
    setHasChosen(true);
  };

  const handleTruthClick = () => {
    if (!truths.length) {
      setCurrentText({ type: 'Pravda', text: 'Otázky pravdy nebyly načteny.' });
    } else {
      const random = truths[Math.floor(Math.random() * truths.length)];
      setCurrentText({ type: 'Pravda', text: random });
    }
    setShowOverlay(true);
    setHasChosen(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setHasSpun(false);
    setHasChosen(false);
  };

  return (
    <div className="container">
      <section className="spin-bottle">
        <div className="spin-bottle__buttons">
          <button
            className={`btn ${(!hasSpun || hasChosen) ? 'disabled' : ''}`}
            onClick={handleTruthClick}
            disabled={!hasSpun || hasChosen}
          >
            Pravda
          </button>
            <button
              className={`btn ${(!hasSpun || hasChosen) ? 'disabled' : ''}`}
              onClick={handleDareClick}
              disabled={!hasSpun || hasChosen}
            >
            Úkol
          </button>
        </div>

        <img
          className="spin-bottle__image"
          src={wineBottle}
          alt="Flaška"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={!hasSpun ? handleSpin : undefined}
        />

        <div className="spin-bottle__button">
          <button
            className={`btn btn--full ${(hasSpun && !hasChosen) ? 'disabled' : ''}`}
            onClick={handleSpin}
            disabled={hasSpun && !hasChosen}
          >
            Roztočte flašku
          </button>
        </div>
      </section>

      {showOverlay && currentText && (
        <div className="overlay" onClick={handleOverlayClose}>
          <div className="overlay__text">
            <h2>{currentText.type === 'Úkol' ? 'Úkol:' : 'Otázka:'}</h2>
            <p>{currentText.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};