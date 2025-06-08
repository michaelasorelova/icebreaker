import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import './style.css';
import React from "react";
import Slider from "react-slick";






export const QuestionCards = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/question_categories.json');
        const json = await response.json();

        let allQuestions = [];

        if (category === 'mix_vseho') {
          allQuestions = Object.values(json).flat();
        } else {
          allQuestions = json[category] || [];
        }

        if (allQuestions.length > 0) {
          const shuffled = allQuestions.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 25);
          setQuestions(selected);
        } else {
          setQuestions([{ text: 'V této kategorii nejsou žádné otázky.' }]);
        }
      } catch (error) {
        console.error("Chyba při načítání otázek:", error);
        setQuestions([{ text: 'Nepodařilo se načíst otázky.' }]);
      }
    };

    fetchQuestions();
  }, [category]);
  const handleSaveFavorite = () => {
  const currentQuestion = questions[currentIndex]?.text;
  if (!currentQuestion) return;

  const existingFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];

  const isAlreadySaved = existingFavorites.includes(currentQuestion);
  let updatedFavorites;

  if (isAlreadySaved) {
    updatedFavorites = existingFavorites.filter(q => q !== currentQuestion);
    setSaved(false);
  } else {
    updatedFavorites = [...existingFavorites, currentQuestion];
    setSaved(true);
  }

  localStorage.setItem("myFavorites", JSON.stringify(updatedFavorites));
};

  const categoryTitles = {
    na_rozehrati: 'Na rozehřátí',
    na_pobaveni: 'Na pobavení',
    co_by_kdyby: 'Co by kdyby',
    na_telo: 'Na tělo',
    do_hloubky: 'Do hloubky',
    mix_vseho: 'Mix všeho',
  };

  return (
    <div className="container">
      <section className="question-cards">
        <h2 className="question-cards__heading">
          {categoryTitles[category] || 'Otázky'}
        </h2>

        {/* <QuestionCard
          questions={questions}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        /> */}

   <div className="question-cards__track">
  <CenterMode questions={questions} />
</div>




        <div className="question-card__buttons">
          <button
            className="question-card__button question-card__button--dislike"
            aria-label="To se mi nelíbí"
            onClick={() => setDisliked(!disliked)}
          >
            <i className={disliked ? "fi fi-sr-thumbs-down" : "fi fi-rr-hand"}></i>
          </button>

          <button
            className="question-card__button question-card__button--like"
            aria-label="To se mi líbí"
            onClick={() => setLiked(!liked)}
          >
            <i className={liked ? "fi fi-sr-thumbs-up" : "fi fi-rr-social-network"}></i>
          </button>

          <button
            className="question-card__button question-card__button--save"
            aria-label="Přidat k oblíbeným"
            onClick={handleSaveFavorite}
          >
            <i className={saved ? "fi fi-sr-bookmark" : "fi fi-rr-bookmark"}></i>
          </button>
        </div>
      </section>
    </div>
  );
};



function CenterMode({ questions }) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "60px",  
    slidesToShow: 1,        
    swipeToSlide: true,
    speed: 500,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {questions.map((question, index) => (
          <div key={index}>
            <QuestionCard question={question.text} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

