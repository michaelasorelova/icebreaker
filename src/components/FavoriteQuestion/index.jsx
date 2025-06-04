import './style.css';

export const FavoriteQuestion = ({ text }) => {
  return (
    <div className="favorite-question">
      <div className="favorite-question__icon">
        <i className="fi fi-sr-bookmark"></i>
      </div>
      <div className="favorite-question__text">
        <p>Jaký nejhorší dárek jste dostali?{/*{text}*/}</p>
      </div>   
    </div>
  );
};