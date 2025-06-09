import './style.css';
import { QuestionsList } from '../../components/QuestionsList';
import { useLocalStorageState } from '../../utils/useLocalStorageState';

export const FavoriteQuestions = () => {
  const [favorites, setFavorites] = useLocalStorageState('myFavorites', []);

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
