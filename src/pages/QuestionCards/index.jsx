import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import './style.css';
import Slider from "react-slick";
import {
  getDeletedQuestions,
  getFavoriteQuestions,
  saveFavoriteQuestions,
  addToDeleted,
  filterQuestions,
  shuffleAndSlice
} from '../../utils/questionCardsUtils';

export const QuestionCards = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedQuestions, setLikedQuestions] = useState(new Set());
  const [dislikedQuestions, setDislikedQuestions] = useState(new Set());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/question_categories.json');
        const json = await response.json();

        let allQuestions = category === 'mix_vseho'
          ? Object.values(json).flat()
          : json[category] || [];

        const filtered = filterQuestions(allQuestions, getDeletedQuestions());

        if (filtered.length > 0) {
          setQuestions(shuffleAndSlice(filtered, 25));
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
    const favorites = getFavoriteQuestions();
    setLikedQuestions(new Set(favorites));
  }, []);

  const currentQuestion = questions[currentIndex]?.text;

  const handleLikeFavorite = () => {
    if (!currentQuestion) return;

    const newLiked = new Set(likedQuestions);
    const newDisliked = new Set(dislikedQuestions);

    if (newLiked.has(currentQuestion)) {
      newLiked.delete(currentQuestion);
    } else {
      newLiked.add(currentQuestion);
      if (newDisliked.has(currentQuestion)) {
        newDisliked.delete(currentQuestion);
        setDislikedQuestions(newDisliked);
      }
    }

    setLikedQuestions(newLiked);
    saveFavoriteQuestions(Array.from(newLiked));
  };

  const handleDislike = () => {
    if (!currentQuestion) return;

    const newDisliked = new Set(dislikedQuestions);
    const newLiked = new Set(likedQuestions);

    if (newDisliked.has(currentQuestion)) {
      newDisliked.delete(currentQuestion);
    } else {
      newDisliked.add(currentQuestion);
      if (newLiked.has(currentQuestion)) {
        newLiked.delete(currentQuestion);
        setLikedQuestions(newLiked);
        saveFavoriteQuestions(Array.from(newLiked));
      }
      addToDeleted(currentQuestion);
    }

    setDislikedQuestions(newDisliked);
  };

  const categoryTitles = {
    na_rozehrati: 'Na rozehřátí',
    na_pobaveni: 'Na pobavení',
    co_by_kdyby: 'Co by kdyby',
    na_telo: 'Na tělo',
    do_hloubky: 'Do hloubky',
    mix_vseho: 'Mix všeho',
  };

  const isEmptyMessage = questions.length === 1 &&
    ['V této kategorii nejsou žádné otázky.', 'Nepodařilo se načíst otázky.'].includes(questions[0]?.text);
  
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="container fullwidth">

      <section className="question-cards">

        <h2 className="question-cards__heading">
          {categoryTitles[category] || 'Otázky'}
        </h2>

        {isEmptyMessage ? (
          <p className="question-cards__empty">{questions[0].text}</p>
        ) : (
          <>
            <div className="question-cards__track">
              <CenterMode questions={questions} onSlideChange={setCurrentIndex} />
            </div>

            <div className="custom-progress-bar">
              <div
                className="custom-progress-bar__fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="question-card__buttons">
              <button
                className="question-card__button question-card__button--like"
                aria-label="To se mi líbí"
                onClick={handleLikeFavorite}
              >
                <i className={likedQuestions.has(currentQuestion)
                  ? "fi fi-sr-thumbs-up"
                  : "fi fi-rr-social-network"}></i>
              </button>

              <button
                className="question-card__button question-card__button--dislike"
                aria-label="To se mi nelíbí"
                onClick={handleDislike}
              >
                <i className={dislikedQuestions.has(currentQuestion)
                  ? "fi fi-sr-thumbs-down"
                  : "fi fi-rr-hand"}></i>
              </button>
            </div>
          </>
        )}

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
    beforeChange: (_, newIndex) => {
      if (onSlideChange) onSlideChange(newIndex);
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
