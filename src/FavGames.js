import React, {useState, useEffect} from 'react';
import "./FavGames.css"

function FavGames() {
  // Sample data for the three game boxes
  const [gamesData, setGamesData] = useState([]);

  useEffect(()=> {
    fetch('http://localhost:4000/FavGames')
    .then (response => response.json())
    .then(data => {
      console.log (data)
      const shuffledGames = shuffleArray(data);

      const selectedGames = shuffledGames.slice(0,3);

      setGamesData(selectedGames);
    })
    .catch(error => console.error("Error Fetching data:", error))
  }, [])

  function shuffleArray(array){
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    console.log(shuffledArray)
    return shuffledArray
  }
    return (
      <div className="fav-games">
      <h1 id="Header">Games to get, regardless of price:</h1>
      <div className="game-boxes-container">
        {gamesData.map((game, index) => (
          <div key={index} className="game-box">
            <h2 className="game-title">{game.gameTitle}</h2>
            <img className="game-image" src={game.thumb} alt={game.gameTitle} />
            <div className="button-container">
              <button id="button">Get Game!</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }

export default FavGames;
