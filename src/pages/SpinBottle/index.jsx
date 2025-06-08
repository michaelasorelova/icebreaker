import './style.css';
import wineBottle from "./img/wine-bottle.svg";
import { useState, useEffect } from "react";

export const SpinBottle = () => {
  const [rotation, setRotation] = useState(0);
  const [dares, setDares] = useState([]);
  const [truths, setTruths] = useState([]);
  const [currentText, setCurrentText] = useState(null);

  // Načítání úkolů
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


  // Načítání pravd
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

  // Roztočení flašky
  const handleSpin = () => {
    const targetAngle = Math.random() < 0.5 ? 0 : 180;
    const spinAmount = 5 * 360 + targetAngle;
    setRotation((prev) => prev + spinAmount);
  };

 const handleDareClick = () => {
  if (!dares.length) {
    return setCurrentText({ type: 'Úkol', text: 'Úkoly nebyly načteny.' });
  }

  const randomIndex = Math.floor(Math.random() * dares.length);
  const selectedDare = dares[randomIndex];
  setCurrentText({ type: 'Úkol', text: selectedDare });
};


 
  const handleTruthClick = () => {
    if (truths.length === 0) {
      setCurrentText({ type: 'Pravda', text: 'Otázky pravdy nebyly načteny.' });
      return;
    }
    const random = truths[Math.floor(Math.random() * truths.length)];
    setCurrentText({ type: 'Pravda', text: random });
  };

  return (
    <div className="container">
      <section className="spin-bottle">
        <div className="spin-bottle__buttons">
          <button className="btn" onClick={handleTruthClick}>Pravda</button>
          <button className="btn" onClick={handleDareClick}>Úkol</button>
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

        {currentText && (
          <div className="spin-bottle__dare">
            <h2>{currentText.type === 'Úkol' ? 'Tvůj úkol:' : 'Otázka pravdy:'}</h2>
            <p>{currentText.text}</p>
          </div>
        )}
      </section>
    </div>
  );
};
