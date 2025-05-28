import React, { useState, useEffect } from "react";
import './style.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMenuOpen);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <nav className="nav">
        <a className="nav__title" href="#">Icebreaker</a>

        <div className={`nav__menu ${isMenuOpen ? 'overlay' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <a className="nav__link" href="#">Domů</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Oblíbené otázky</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">O projektu</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Kontakt</a>
            </li>
          </ul>
        </div>

        <button
          className="nav__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {isMenuOpen ? (
            <i className="fi fi-sr-cross"></i>
          ) : (
            <i className="fi fi-sr-menu-burger"></i>
          )}
        </button>
      </nav>
    </header>
  );
};