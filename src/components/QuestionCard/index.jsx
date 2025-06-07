import { useEffect, useState } from "react";
import './style.css';

export const QuestionCard = ({ OnSelectQuestion }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/question_categories.json');
        const json = await response.json();
        setQuestions(json.data);
      } catch (error) {
        console.error("Chyba při načítání otázek:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="question-card">
      <div className="question-card__content">
        <p>Jaký nejhorší dárek jste dostali?{ /* {question} */ }</p>
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