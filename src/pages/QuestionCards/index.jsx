import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import './style.css';
import Slider from "react-slick";

export const QuestionCards = () => {
  const [likedQuestions, setLikedQuestions] = useState(new Set());
  const [dislikedQuestions, setDislikedQuestions] = useState(new Set());
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

        
        const deleted = JSON.parse(localStorage.getItem("myDeleted")) || [];

        
        const filteredQuestions = allQuestions.filter(
          (q) => !deleted.includes(q.text)
        );

        if (filteredQuestions.length > 0) {
          const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
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

  const currentQuestion = questions[currentIndex]?.text;

  const handleSaveFavorite = () => {
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

  const handleDislike = () => {
    if (!currentQuestion) return;
    setDislikedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
        setLikedQuestions(l => {
          const lik = new Set(l);
          lik.delete(currentQuestion); // zrušit like, pokud byl
          return lik;
        });
      }
      return newSet;
    });
    }
  const handleMoveToTrash = () => {
    const currentQuestion = questions[currentIndex]?.text;
    if (!currentQuestion) return;

    const existingDeleted = JSON.parse(localStorage.getItem("myDeleted")) || [];

    if (!existingDeleted.includes(currentQuestion)) {
      const updatedDeleted = [...existingDeleted, currentQuestion];
      localStorage.setItem("myDeleted", JSON.stringify(updatedDeleted));
    }
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
            onClick={() => {
              handleDislike();
              handleMoveToTrash();
            }}
          >
            <i className={dislikedQuestions.has(currentQuestion)
              ? "fi fi-sr-thumbs-down"
              : "fi fi-rr-hand"}></i>
          </button>

          {/* Like */}
          <button
            className="question-card__button question-card__button--save"
            aria-label="Přidat k oblíbeným"
            onClick={handleSaveFavorite}
          >
            <i className={savedQuestions.has(currentQuestion)
              ? "fi fi-sr-thumbs-up"
              : "fi fi-rr-social-network"}></i>
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
