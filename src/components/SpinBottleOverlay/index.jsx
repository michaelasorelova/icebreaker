export const SpinBottleOverlay = ({ currentText, onClose }) => {
  if (!currentText) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay__text">
        <h2>{currentText.type === 'Úkol' ? 'Úkol:' : 'Otázka:'}</h2>
        <p>{currentText.text}</p>
      </div>
    </div>
  );
};