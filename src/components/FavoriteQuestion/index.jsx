import './style.css';

export const FavoriteQuestion = ({ favorites, removeFavorite }) => {
  return (
    <div className="favorite-question__list">
      <ul>
        {favorites.length === 0 && <li>Nemáš zatím žádné oblíbené otázky.</li>}
        {favorites.map((favorite, index) => (
          <li key={index}>
            <button
              onClick={() => removeFavorite(index)}
              className="favorite-question__button"
              aria-label="Odebrat z oblíbených"
            >
              <i className="fi fi-sr-cross-circle"></i>
            </button>
            <span>{favorite}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};