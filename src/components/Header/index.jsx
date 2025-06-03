import React, { useState, useEffect } from "react";
import { SidebarMenu } from "../SidebarMenu";
import './style.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isMenuOpen);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <nav className="nav">
        <a className="nav__title" href="/">Icebreaker</a>

        <SidebarMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

        <button
          className="nav__toggle"
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
