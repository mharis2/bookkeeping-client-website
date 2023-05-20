import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import logo from '/images/logo.png' // Update the path based on your file structure
import './Navbar.css'; // Import the styles

export default function NavBar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScroll = window.scrollY > 0;
      if (isScroll !== isScrolling) {
        setIsScrolling(!isScrolling);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      // cleanup the event listener
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className={`nav-root ${isScrolling ? 'app-bar-shadow' : ''}`}>
      <div className="nav-toolbar">
        <div className="nav-title">
          <img src="/images/logo.png" alt="Logo" className="nav-logo" />
          South Side Bookkeepers
        </div>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link onClick={closeMenu} to="/" className="nav-link">Home</Link>
          <Link onClick={closeMenu} to="/services" className="nav-link">Services</Link>
          <Link onClick={closeMenu} to="/team" className="nav-link">Team</Link>
          <Link onClick={closeMenu} to="/about" className="nav-link">About</Link>
          <Link onClick={closeMenu} to="/contact" className="nav-link">Contact Us</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
}
