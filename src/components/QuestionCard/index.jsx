import './style.css';
import { useEffect, useState } from 'react';

export const QuestionCard = ({ selectedCategory }) => {
  const [question, setQuestion] = useState(null); 
  

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);


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
        <p>{question || 'Jaký nejhorší dárek jste dostali?'}</p>
      </div>
      <div className="question-card__buttons">

        {/* DISLIKE button */}
        <button
          className="question-card__button question-card__button--dislike"
          aria-label="To se mi nelíbí"
          onClick={() => setDisliked(!disliked)}
        >
          <i className={disliked ? "fi fi-sr-thumbs-down" : "ffi fi-rr-hand"}></i>
        </button>

        {/* LIKE button */}
       <button
          className="question-card__button question-card__button--like"
          aria-label="To se mi líbí"
          onClick={() => setLiked(!liked)}
        >
          <i className={liked ? "fi fi-sr-thumbs-up" : "fi fi-rr-social-network"}></i>
        </button>

        {/* SAVE button */}
        <button
          className="question-card__button question-card__button--save"
          aria-label="Přidat k oblíbeným"
          onClick={() => setSaved(!saved)}
        >
          <i className={saved ? "fi fi-sr-bookmark" : "fi fi-rr-bookmark"}></i>
        </button>
      </div>
    </div>
  );
};