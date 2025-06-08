import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import './style.css';
import React from "react";
import Slider from "react-slick";

export const QuestionCards = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState(new Set());
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

 
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
    setSavedQuestions(new Set(favorites));
  }, []);

  const handleSaveFavorite = () => {
    const currentQuestion = questions[currentIndex]?.text;
    if (!currentQuestion) return;

    const existingFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
    const isAlreadySaved = existingFavorites.includes(currentQuestion);
    let updatedFavorites;

    if (isAlreadySaved) {
      updatedFavorites = existingFavorites.filter(q => q !== currentQuestion);
      setSavedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentQuestion);
        return newSet;
      });
    } else {
      updatedFavorites = [...existingFavorites, currentQuestion];
      setSavedQuestions(prev => new Set(prev).add(currentQuestion));
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

  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="container">
      <section className="question-cards">
        <h2 className="question-cards__heading">
          {categoryTitles[category] || 'Otázky'}
        </h2>

        <div className="question-cards__track">
          <CenterMode questions={questions} onSlideChange={setCurrentIndex} />
        </div>

        <div className="custom-progress-bar">
          <div
            className="custom-progress-bar__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="progress-text">{currentIndex + 1} / {questions.length}</p>

        <div className="question-card__buttons">
          {/* Dislike */}
          <button
            className="question-card__button question-card__button--dislike"
            aria-label="To se mi nelíbí"
            onClick={() => setDisliked(!disliked)}
          >
            <i className={disliked ? "fi fi-sr-thumbs-down" : "fi fi-rr-hand"}></i>
          </button>

          {/* Like */}
          <button
            className="question-card__button question-card__button--like"
            aria-label="To se mi líbí"
            onClick={() => setLiked(!liked)}
          >
            <i className={liked ? "fi fi-sr-thumbs-up" : "fi fi-rr-social-network"}></i>
          </button>

          {/* Save */}
          <button
            className="question-card__button question-card__button--save"
            aria-label="Přidat k oblíbeným"
            onClick={handleSaveFavorite}
          >
            <i className={savedQuestions.has(questions[currentIndex]?.text)
              ? "fi fi-sr-bookmark" : "fi fi-rr-bookmark"}></i>
          </button>
        </div>
      </section>
    </div>
  );
};

function CenterMode({ questions, onSlideChange }) {
  const settings = {
    arrows: false,
    centerMode: true,
    infinite: false,
    centerPadding: "20px",
    slidesToShow: 1,
    swipeToSlide: true,
    speed: 500,
    beforeChange: (oldIndex, newIndex) => {
      if (onSlideChange) {
        onSlideChange(newIndex);
      }
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {questions.map((question, index) => (
          <QuestionCard key={index} question={question.text} />
        ))}
      </Slider>
    </div>
  );
}
