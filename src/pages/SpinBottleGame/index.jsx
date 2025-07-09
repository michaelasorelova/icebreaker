import './style.css';
import wineBottle from "./img/wine-bottle.svg";
import { useState, useEffect } from "react";
import { SpinBottleButtons } from "../../components/SpinBottleButtons";
import { SpinBottleOverlay } from "../../components/SpinBottleOverlay";
import { fetchDares, fetchTruths } from "../../utils/fetchDaresTruths";
import { spinBottle } from "../../utils/spinBottle";

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
    if (mode === 'withQuestions') {
      fetchDares(setDares);
      fetchTruths(setTruths);
    }
  }, [mode]);

  const handleSpin = () => {
    if (spinDisabled) return;
    const spinAmount = spinBottle();
    setRotation((prev) => prev + spinAmount);
    setHasSpun(true);
    setHasChosen(false);

    if (mode === 'justSpin') {
      setSpinDisabled(true);
      setTimeout(() => {
        setSpinDisabled(false);
        setHasSpun(false);
      }, 3000);
    }
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
      : 'Pravdy nebyly načteny.';
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
              <button className='btn' onClick={() => setMode('withQuestions')}>
                Připravené pravdy a úkoly
              </button>
              <button className='btn' onClick={() => setMode('justSpin')}>
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
        {mode === 'withQuestions' && (
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
        <div className="spin-bottle__button">
          <button
            className={`btn btn--full ${((hasSpun && mode === 'withQuestions' && !hasChosen) || spinDisabled) ? 'disabled' : ''}`}
            onClick={handleSpin}
            disabled={(hasSpun && mode === 'withQuestions' && !hasChosen) || spinDisabled}
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
