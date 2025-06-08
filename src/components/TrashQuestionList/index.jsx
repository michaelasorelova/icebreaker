import './style.css';

export const TrashQuestionList = ({ deleted, restoreDeleted }) => {
  return (
    <div className="favorite-question__list">
      <ul>
        {deleted.length === 0 && <li>Nemáš zatím žádné smazané otázky.</li>}
        {deleted.map((question, index) => (
          <li key={index}>
            <button
              onClick={() => restoreDeleted(index)}
              className="favorite-question__button"
              aria-label="Obnovit otázku"
            >
              <i className="fi fi-sr-cross-circle"></i>
            </button>
            <span>{question}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
