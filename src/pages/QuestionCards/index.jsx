import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import './style.css';

export const QuestionCards = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { category } = useParams();

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
        <QuestionCard selectedCategory={category} />
        <div className="question-card__buttons">
          <button
            className="question-card__button question-card__button--dislike"
            aria-label="To se mi nelíbí"
            onClick={() => setDisliked(!disliked)}
          >
            <i className={disliked ? "fi fi-sr-thumbs-down" : "ffi fi-rr-hand"}></i>
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
            onClick={() => setSaved(!saved)}
          >
            <i className={saved ? "fi fi-sr-bookmark" : "fi fi-rr-bookmark"}></i>
          </button>
        </div>
      </section>
    </div>
  );
};