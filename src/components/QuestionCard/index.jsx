import './style.css';

export const QuestionCard = ({ question}) => {
 

  return (
    <div className="question-card">
      <div className="question-card__content">
        <p>{question}</p>
      </div>
    </div>
  );
};