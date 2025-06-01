import { Link } from "react-router-dom";
import './style.css';

export const SidebarMenu = ({ isMenuOpen, closeMenu }) => {
  return (
    <>
      <div className={`nav__menu ${isMenuOpen ? "overlay" : ""}`}>
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="nav__link" to="/" onClick={closeMenu}>Domů</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/favorites" onClick={closeMenu}>Oblíbené otázky</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/about" onClick={closeMenu}>O projektu</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/contact" onClick={closeMenu}>Kontakt</Link>
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