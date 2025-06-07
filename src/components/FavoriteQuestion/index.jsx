import './style.css';

export const FavoriteQuestion = ({ favorites, removeFavorite }) => {
  return (
    <div className="favorite-question__list">
      <ul>
        {favorites.length === 0 && <li>Nemáš zatím žádné oblíbené otázky.</li>}
        {favorites.map((favorite, index) => (
          <li key={index}>
            <span>{favorite}</span>
            <button onClick={() => removeFavorite(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};