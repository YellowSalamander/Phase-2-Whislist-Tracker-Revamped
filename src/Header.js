import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="banner">
      <header>
        <h1>Wishlist Deal Tracker</h1>
        <nav className="navbar">
            <ul className="navbar-item">Search games</ul>
            <ul className="navbar-item">Log in</ul>
            <ul className="navbar-item">About</ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
