import React, { useState, useEffect } from "react";
import menuCross from './img/menu-cross.svg';
import menuHamburger from './img/menu-hamburger.svg';
import menuStarFull from './img/menu-star-full.svg';
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
              <a className="nav__link nav__link--with-icon" href="#">
                <img src={menuStarFull} alt="Hvězdička" className="nav__icon" />
                Oblíbené otázky
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">O projektu</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Kontakt</a>
            </li>
          </ul>
        </div>

        <button className="nav__toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img
            src={isMenuOpen ? menuCross : menuHamburger}
            alt={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          />
        </button>
      </nav>
    </header>
  );
};