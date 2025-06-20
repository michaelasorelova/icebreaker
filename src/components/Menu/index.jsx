import { Link } from "react-router-dom";
import './style.css';

export const Menu = ({ isOpen, onClose }) => {
  return (
    <>
      <nav className={`menu ${isOpen ? "menu--open" : ""}`}>
        <ul className="menu__list">
          <li className="menu__item">
            <Link className="menu__link" to="/" onClick={onClose}>Domů</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/favorite-questions" onClick={onClose}>Oblíbené otázky</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/deleted-questions" onClick={onClose}>Smazané otázky</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/about" onClick={onClose}>O projektu</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/contact" onClick={onClose}>Kontakt</Link>
          </li>
        </ul>
      </nav>

      <div
        className={`menu__backdrop ${isOpen ? "menu__backdrop--active" : ""}`}
        onClick={onClose}
      />
    </>
  );
};