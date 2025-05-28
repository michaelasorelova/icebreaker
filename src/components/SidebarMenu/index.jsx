import React from "react";
import './style.css';

export const SidebarMenu = ({ isMenuOpen, closeMenu }) => {
  return (
    <>
      <div className={`nav__menu ${isMenuOpen ? "overlay" : ""}`}>
        <ul className="nav__list">
          <li className="nav__item">
            <a className="nav__link" href="#" onClick={closeMenu}>Domů</a>
          </li>
          <li className="nav__item">
            <a className="nav__link" href="#" onClick={closeMenu}>Oblíbené otázky</a>
          </li>
          <li className="nav__item">
            <a className="nav__link" href="#" onClick={closeMenu}>O projektu</a>
          </li>
          <li className="nav__item">
            <a className="nav__link" href="#" onClick={closeMenu}>Kontakt</a>
          </li>
        </ul>
      </div>

      <div
        className={`nav__backdrop ${isMenuOpen ? "is-active" : ""}`}
        onClick={closeMenu}
      ></div>
    </>
  );
};