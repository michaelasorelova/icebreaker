import './style.css';

export const QuestionCard = ({ question }) => {
  return (
    <div className="question-card">
      <div className="question-card__text">
        {question}
      </div>
      <div className="question-card__buttons">
        <button className="question-card__button question-card__button--cross" aria-label="Nelíbí se mi">
          <i className="fi fi-sr-cross"></i>
        </button>
        <button className="question-card__button question-card__button--heart" aria-label="Líbí se mi">
          <i className="fi fi-sr-heart"></i>
        </button>
        <button className="question-card__button question-card__button--star" aria-label="Přidat k oblíbeným">
          <i className="fi fi-sr-star"></i>
        </button>
      </div>
    </div>
  );
};
