import React from 'react';

function Header() {
  return (
    <div className="banner">
      <header>
        <h1>Wishlist Deal Tracker</h1>
        <nav className="navbar">
          <ul className="navbar-item">
            <li className="navbar-item">Search games</li>
            <li className="navbar-item">Log in</li>
            <li className="navbar-item">About</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
