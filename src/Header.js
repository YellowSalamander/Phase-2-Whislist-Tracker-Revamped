import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import {useAuth} from './AuthContext'




function Header() {

  const {isLoggedIn} = useAuth()
  const handleSearchGamesClick = () => {
    if (!isLoggedIn){
      alert('Please Log In before accessing Wishlist, thank you!')
      
    }
  }
  return (
    <div className="banner">
      <header>
        <h1>Wishlist Deal Tracker</h1>
        <nav className="navbar">
            <NavLink to="/wishlist" className="navbar-item" onClick={handleSearchGamesClick} >Search games</NavLink>
            <NavLink to="/" className="navbar-item">Log in</NavLink>
            <NavLink to ="/about" className="navbar-item">About</NavLink>
        </nav>
      </header>
    </div>
  );
}

export default Header;
