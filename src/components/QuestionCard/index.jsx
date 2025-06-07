import { useEffect, useState } from "react";
import './style.css';
import { useLocation } from 'react-router-dom';

export const QuestionCard = ({ OnSelectQuestion }) => {
  const [question, setQuestion] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState('na_rozehrati'); 

const navigation = useNavigate();
const state = navigation.state
console.log(state);

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
          className="question-card__button question-card__button--dislike"
          aria-label="Nelíbí se mi"
        >
          <i className="fi fi-rr-hand"></i>
        </button>
        <button
          className="question-card__button question-card__button--like"
          aria-label="Líbí se mi"
        >
          <i className="fi fi-rr-social-network"></i>
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