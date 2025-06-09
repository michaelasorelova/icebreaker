import './style.css';

export const DeletedQuestionsList = ({ deletedQuestions, restoreDeletedQuestions }) => {
  return (
    <div className="deleted-questions">
      <ul className="deleted-questions__list">
        {deletedQuestions.length === 0 ? (
          <li className="deleted-questions__empty">Nemáš zatím žádné smazané otázky.</li>
        ) : (
          deletedQuestions.map((deletedQuestion, index) => (
            <li key={index} className="deleted-questions__item">
              <button
                onClick={() => restoreDeletedQuestions(index)}
                className="deleted-questions__button"
                aria-label="Obnovit smazanou otázku"
              >
                <i className="fi fi-sr-cross-circle"></i>
              </button>
              <span className="deleted-questions__text">{deletedQuestion}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};