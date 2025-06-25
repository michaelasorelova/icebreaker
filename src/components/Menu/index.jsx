import { Link, useLocation } from "react-router-dom";
import './style.css';

export const Menu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <nav className={`menu ${isOpen ? "menu--open" : ""}`}>
        <ul className="menu__list">
          <li className="menu__item">
            <Link
              className={`menu__link ${currentPath === "/" ? "menu__link--active" : ""}`}
              to="/"
              onClick={onClose}
            >
              Domů
            </Link>
          </li>
          <li className="menu__item">
            <Link
              className={`menu__link ${currentPath === "/favorite-questions" ? "menu__link--active" : ""}`}
              to="/favorite-questions"
              onClick={onClose}
            >
              Oblíbené otázky
            </Link>
          </li>
          <li className="menu__item">
            <Link
              className={`menu__link ${currentPath === "/deleted-questions" ? "menu__link--active" : ""}`}
              to="/deleted-questions"
              onClick={onClose}
            >
              Smazané otázky
            </Link>
          </li>
          <li className="menu__item">
            <Link
              className={`menu__link ${currentPath === "/about" ? "menu__link--active" : ""}`}
              to="/about"
              onClick={onClose}
            >
              O projektu
            </Link>
          </li>
          <li className="menu__item">
            <Link
              className={`menu__link ${currentPath === "/contact" ? "menu__link--active" : ""}`}
              to="/contact"
              onClick={onClose}
            >
              Kontakt
            </Link>
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
