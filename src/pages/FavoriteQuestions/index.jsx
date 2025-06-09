import './style.css';
import { useEffect, useState } from 'react';
import { QuestionsList } from '../../components/QuestionsList';

export const FavoriteQuestions = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('myFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const removeFavorite = (indexToRemove) => {
    const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="container">
      <section className="favorite-questions">
        <h2 className="favorite-questions__heading">Oblíbené otázky</h2>
        <div className="favorite-questions__questions">
          <QuestionsList
            items={favorites}
            onAction={removeFavorite}
            emptyMessage="Nemáte zatím žádné oblíbené otázky."
            ariaLabel="Odebrat z oblíbených"
            classPrefix="favorite-questions-list"
          />
        </div>
      </section>
    </div>
  );
};