import './style.css';
import { useEffect, useState } from 'react';

export const QuestionCard = ({ selectedCategory }) => {
  const [question, setQuestion] = useState(null); 
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/question_categories.json');
        const json = await response.json();

        let questions = [];

        if (selectedCategory === 'mix_vseho') {
          const allQuestions = Object.values(json).flat();
          questions = allQuestions;
        } else {
          questions = json[selectedCategory] || [];
        }

        if (questions.length > 0) {
          const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
          setQuestion(randomQuestion.text);
        } else {
          setQuestion("V této kategorii nejsou žádné otázky.");
        }
      } catch (error) {
        console.error("Chyba při načítání otázek:", error);
        setQuestion("Nepodařilo se načíst otázku.");
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  return (
    <div className="question-card">
      <div className="question-card__content">
        <p>{question}</p>
      </div>
      <div className="question-card__buttons">
        <button
          className={`question-card__button question-card__button--dislike ${disliked ? 'active' : ''}`}
          aria-label="Nelíbí se mi"
          onClick={() => {
            setDisliked(!disliked);
            if (liked) setLiked(false); 
          }}
        >
          <i className="fi fi-sr-thumbs-down"></i>
        </button>

        <button
          className={`question-card__button question-card__button--like ${liked ? 'active' : ''}`}
          aria-label="Líbí se mi"
          onClick={() => {
            setLiked(!liked);
            if (disliked) setDisliked(false); 
          }}
        >
          <i className="fi fi-sr-thumbs-up"></i>
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