import './style.css';
import wineBottle from "./img/wine-bottle.svg";
import { useState, useEffect } from "react";
import { SpinBottleButtons } from "../../components/SpinBottleButtons";
import { SpinBottleOverlay } from "../../components/SpinBottleOverlay";
import { fetchDares, fetchTruths } from "../../utils/fetchDaresTruths";
import { spinBottle } from "../../utils/spinBottle";
import { getRandomItem } from "../../utils/getRandomItem";

export const SpinBottleGame = () => {
  const [rotation, setRotation] = useState(0);
  const [dares, setDares] = useState([]);
  const [truths, setTruths] = useState([]);
  const [currentText, setCurrentText] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);
  const [mode, setMode] = useState(null);
  const [spinDisabled, setSpinDisabled] = useState(false);

  useEffect(() => {
    if (mode === 'preset') {
      const loadData = async () => {
        const daresData = await fetchDares();
        const truthsData = await fetchTruths();
        setDares(daresData);
        setTruths(truthsData);
      };
      loadData();
    }
  }, [mode]);

  const disableSpinTemporarily = () => {
    setSpinDisabled(true);
    setTimeout(() => {
      setSpinDisabled(false);
      setHasSpun(false);
    }, 3000);
  };

  const handleSpin = () => {
    if (spinDisabled) return;

    const spinAmount = spinBottle();
    setRotation((prev) => prev + spinAmount);
    setHasSpun(true);
    setHasChosen(false);

    if (mode === 'custom') {
      disableSpinTemporarily();
    }
  };

  const handleDareClick = () => {
    const text = getRandomItem(dares, 'Úkoly nebyly načteny.');
    setCurrentText({ type: 'Úkol', text });
    setShowOverlay(true);
    setHasChosen(true);
  };

  const handleTruthClick = () => {
    const text = getRandomItem(truths, 'Pravdy nebyly načteny.');
    setCurrentText({ type: 'Pravda', text });
    setShowOverlay(true);
    setHasChosen(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setHasSpun(false);
    setHasChosen(false);
  };

  if (mode === null) {
    return (
      <div className="container">
        <section className="spin-bottle spin-bottle__step--1">
          <h2>Pravda nebo úkol</h2>
          <div className="spin-bottle__content">
            <div className="spin-bottle__text">
              <p>Nemáte po ruce flašku? Nevadí! Icebreaker točí za vás.</p>
              <p>Vyberte si, jestli chcete použít naše pravdy a úkoly, nebo si vymyslet vlastní.</p>
            </div>
            <div className="spin-bottle__buttons">
              <button className="btn" onClick={() => setMode('preset')}>
                Připravené pravdy a úkoly
              </button>
              <button className="btn" onClick={() => setMode('custom')}>
                Vlastní pravdy a úkoly
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="spin-bottle spin-bottle__step--2">
        <div className="spin-bottle__content">
          {mode === 'preset' && (
            <SpinBottleButtons
              hasSpun={hasSpun}
              hasChosen={hasChosen}
              onTruthClick={handleTruthClick}
              onDareClick={handleDareClick}
            />
          )}

          <img
            className="spin-bottle__image"
            src={wineBottle}
            alt="Flaška"
            style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 3s ease-out' }}
            onClick={!hasSpun && !spinDisabled ? handleSpin : undefined}
          />

          <button
            className={`btn ${((hasSpun && mode === 'preset' && !hasChosen) || spinDisabled) ? 'disabled' : ''}`}
            onClick={handleSpin}
            disabled={(hasSpun && mode === 'preset' && !hasChosen) || spinDisabled}
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
