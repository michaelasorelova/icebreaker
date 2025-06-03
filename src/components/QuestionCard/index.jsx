import './style.css';

export const QuestionCard = ({ question }) => {
  return (
    <div className="question-card">
      <div className="question-card__card">
        <p className="question-card__text">Jaký nejhorší dárek jste dostali?{ /* {question} */ }</p>
      </div>
      <div className="question-card__buttons">
        <button
          className="question-card__button question-card__button--dislike"
          aria-label="Nelíbí se mi"
        >
          <i class="fi fi-rr-hand"></i>
        </button>
        <button
          className="question-card__button question-card__button--like"
          aria-label="Líbí se mi"
        >
          <i class="fi fi-rr-social-network"></i>
        </button>
        <button
          className="question-card__button question-card__button--save"
          aria-label="Přidat k oblíbeným"
        >
          <i className="fi fi-rr-bookmark"></i>
        </button>
      </div>
    </div>
  );
};