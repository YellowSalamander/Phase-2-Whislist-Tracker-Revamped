import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';

import "./NavBar.css"

function NavBar({onGamefromNavBar}) {
    const {isLoggedIn } = useAuth();
    const [gamesData, setGamesData] = useState([]);

    //------- We fetch the FavGames from the db.json and shuffle it here for render-------//
    useEffect(()=> {
        fetch(`https://phase-2-db-server.onrender.com/FavGames`)
        .then((response) => response.json())
        .then((data) => {
            const shuffledGames = shuffleArray(data);
            const selectedGames = shuffledGames.slice(0,3);
            setGamesData(selectedGames)
        })
        .catch((error) => console.error('Error Fetching data:', error))
    },[]);

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--){
            const j= Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffledArray;
    }

    const handleSearchGamesClick = () => {
        if (!isLoggedIn){
            alert('Please Log In before accessing Wishlist, thank you!')
        }
    };


    return (
        <div> 
            <div className='banner'>
                <header>
                    <h1>Wishlist Deal Tracker</h1>
                    <nav className='navbar'>
                        <NavLink to="/" className="navbar-item">Log In</NavLink>
                        <NavLink to="/about" className="navbar-item">About</NavLink>
                        {isLoggedIn && (
                        <NavLink to="/wishlist" className="navbar-item" onClick={handleSearchGamesClick}>Search Games</NavLink>
                        )}
                    </nav>
                </header>
            </div>
            <div className='fav-games'>
                <h1 id="Header">Games to get, regardless of price!</h1>
                <div className='game-boxes-container'>  
                    {gamesData.map((game,index) => (
                        <div key = {index} className='game-box'>
                            <h2 className='game-title'>{game.gameTitle}</h2>
                            <img className='game-image' src={game.thumb} alt={game.gameTitle}/>
                            <div className='button-container'>
                                <button id='button' onClick={() => {alert("Pretend you're being redirected to Storefront Check-out")}}>Get Game!</button>
                            </div>
                        </div>
                    ))}    
                </div>
            </div>
        </div>
    )
}

export default NavBar

