import './style.css';

export const FavoriteQuestionsList = ({ favorites, removeFavorite }) => {
  return (
    <div className="favorite-questions-list">
      <ul className="favorite-questions-list__list">
        {favorites.length === 0 && (
          <li className="favorite-questions-list__empty">
            Nemáš zatím žádné oblíbené otázky.
          </li>
        )}
        {favorites.map((favorite, index) => (
          <li key={index} className="favorite-questions-list__item">
            <button
              onClick={() => removeFavorite(index)}
              className="favorite-questions-list__button"
              aria-label="Odebrat z oblíbených"
            >
              <i className="fi fi-sr-cross-circle"></i>
            </button>
            <span className="favorite-questions__text">{favorite}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
