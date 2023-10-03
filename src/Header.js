import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';



function Header() {
  return (
    <div className="banner">
      <header>
        <h1>Wishlist Deal Tracker</h1>
        <nav className="navbar">
            <NavLink to="/wishlist" className="navbar-item">Search games</NavLink>
            <NavLink to="/" className="navbar-item">Log in</NavLink>
            <NavLink to ="/about" className="navbar-item">About</NavLink>
        </nav>
      </header>
    </div>
  );
}

export default Header;
