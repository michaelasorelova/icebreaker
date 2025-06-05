import { useEffect, useState } from 'react';
import { FavoriteQuestion } from '../../components/FavoriteQuestion';
import './style.css';

export const FavoriteQuestions = () => {

  return (
    <div className="container">
      <section className="favorite-questions">

        <h2 className="favorite-questions__heading">Oblíbené otázky</h2>
        
        <div className="favorite-questions__questions">
          <FavoriteQuestion />
        </div>

      </section>
    </div>
  );
};