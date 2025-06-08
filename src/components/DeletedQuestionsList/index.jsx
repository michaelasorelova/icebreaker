import './style.css';

export const DeletedQuestionsList = ({ deleted, restoreDeleted }) => {
  return (
    <div className="deleted-question__list">
      <ul>
        {deleted.length === 0 && <li>Nemáš zatím žádné smazané otázky.</li>}
        {deleted.map((question, index) => (
          <li key={index}>
            <button
              onClick={() => restoreDeleted(index)}
              className="deleted-question__button"
              aria-label="Obnovit smazanou otázku"
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
