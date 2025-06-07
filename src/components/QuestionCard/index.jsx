import { useEffect, useState } from "react";
import './style.css';
import { useParams } from 'react-router-dom';

export const QuestionCard = ({ OnSelectQuestion }) => {
  const [question, setQuestion] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState('na_rozehrati'); 


  const [liked, setLiked] = useState(false);
const [disliked, setDisliked] = useState(false);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/question_categories.json');
        const json = await response.json();
        
        // const category = json[];
        // const categoryQuestions = json.data[selectedCategory]; 



        // const questions = ;
        // questions.sort();
        // questions.reverse();
        // console.log(questions); 

        

        // const randomQuestion = category[Math.floor(Math.random() * category.length)];

        // setQuestion(randomQuestion);
      } catch (error) {
        console.error("Chyba při načítání otázek:", error);
      }
    };


    fetchQuestions();
  }, []);

  if (!question) return <p>Načítání otázky…</p>;

   return (
    <div className="question-card">
      <div className="question-card__content">
        <p>{question.text}</p>
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