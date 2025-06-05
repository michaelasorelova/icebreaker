import React, { useState, useEffect } from "react";
import { MobileMenu } from "../MobileMenu";
import './style.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isMenuOpen);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <nav className="main-nav">
        <a className="main-nav__brand" href="/">Icebreaker</a>

        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />

        <button
          className="main-nav__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {isMenuOpen ? (
            <i className="fi fi-rr-cross-small"></i>
          ) : (
            <i className="fi fi-rr-menu-burger"></i>
          )}
        </button>
      </nav>
    </header>
  );
};