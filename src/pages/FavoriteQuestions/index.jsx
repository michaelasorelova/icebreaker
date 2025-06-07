import './style.css';
import { useEffect, useState } from 'react';
import { FavoriteQuestion } from '../../components/FavoriteQuestion';

export const FavoriteQuestions = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    setFavorites(storedFavorites);
  }, []);

   useEffect(() => {
    localStorage.setItem("myFavorites", JSON.stringify(favorites));
  }, [favorites]);

   

   const removeFavorite = (indexToRemove) => {
    const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove);
    setFavorites(updatedFavorites);
  };




   return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Favorites List</h2>
     
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            <span>{favorite}</span>
            <button
              onClick={() => removeFavorite(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

