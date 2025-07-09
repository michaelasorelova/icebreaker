export const SpinBottleButtons = ({ hasSpun, hasChosen, onTruthClick, onDareClick }) => (
  <div className="spin-bottle__buttons">
    <button
      className={`btn ${(!hasSpun || hasChosen) ? 'disabled' : ''}`}
      onClick={onTruthClick}
      disabled={!hasSpun || hasChosen}
    >
      Pravda
    </button>
    <button
      className={`btn ${(!hasSpun || hasChosen) ? 'disabled' : ''}`}
      onClick={onDareClick}
      disabled={!hasSpun || hasChosen}
    >
      Úkol
    </button>
  </div>
);
