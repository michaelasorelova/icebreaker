import './style.css';

export const FavoriteQuestion = ({ favorites, removeFavorite }) => {
  return (
    <div className="favorite-question__list">
      <ul>
        {favorites.length === 0 && <li>Nemáš zatím žádné oblíbené otázky.</li>}
        {favorites.map((favorite, index) => (
          <li key={index}>
            <span>{favorite}</span>
            <button
              onClick={() => removeFavorite(index)}
              className="icon-button text-red-500 hover:text-red-700 text-xl"
              aria-label="Odebrat z oblíbených"
            >
              <i className="fi fi-sr-cross-circle"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};