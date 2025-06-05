import { Link } from "react-router-dom";
import './style.css';

export const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <>
      <nav className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
        <ul className="mobile-menu__list">
          <li className="mobile-menu__item">
            <Link className="mobile-menu__link" to="/" onClick={onClose}>Domů</Link>
          </li>
          <li className="mobile-menu__item">
            <Link className="mobile-menu__link" to="/favorite-questions" onClick={onClose}>Oblíbené otázky</Link>
          </li>
          <li className="mobile-menu__item">
            <Link className="mobile-menu__link" to="/about" onClick={onClose}>O projektu</Link>
          </li>
          <li className="mobile-menu__item">
            <Link className="mobile-menu__link" to="/contact" onClick={onClose}>Kontakt</Link>
          </li>
        </ul>
      </nav>

      <div
        className={`mobile-menu__backdrop ${isOpen ? "mobile-menu__backdrop--active" : ""}`}
        onClick={onClose}
      />
    </>
  );
};