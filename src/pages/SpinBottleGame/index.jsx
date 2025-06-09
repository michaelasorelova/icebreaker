import './style.css';
import wineBottle from "./img/wine-bottle.svg";
import { useState, useEffect } from "react";
import { SpinBottleButtons } from "../../components/SpinBottleButtons";
import { SpinBottleOverlay } from "../../components/SpinBottleOverlay";

export const SpinBottleGame = () => {
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
    const text = dares.length
      ? dares[Math.floor(Math.random() * dares.length)]
      : 'Úkoly nebyly načteny.';
    setCurrentText({ type: 'Úkol', text });
    setShowOverlay(true);
    setHasChosen(true);
  };

  const handleTruthClick = () => {
    const text = truths.length
      ? truths[Math.floor(Math.random() * truths.length)]
      : 'Otázky pravdy nebyly načteny.';
    setCurrentText({ type: 'Pravda', text });
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
        <SpinBottleButtons
          hasSpun={hasSpun}
          hasChosen={hasChosen}
          onTruthClick={handleTruthClick}
          onDareClick={handleDareClick}
        />

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

      {showOverlay && (
        <SpinBottleOverlay currentText={currentText} onClose={handleOverlayClose} />
      )}
    </div>
  );
};