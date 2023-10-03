import React, { useState } from 'react';
import "./SearchResults.css"

function SearchResults({ searchResults, onSelect }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelect = (selectedGame) => {
    // Create a new object with only the 'external' property
    const requestData = { 
      id:  selectedGame.gameID,
      gameID: selectedGame.gameID,
    gameTitle: selectedGame.external };
      console.log('this is requestData', requestData)
    setSelectedGame(selectedGame);

    fetch('http://localhost:4000/User', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestData), // Send the new object with 'external' property
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(`POST request:`, data);
      });
  };

  return (
    <div className="search-results">
      {searchResults.map((game) => (
        <div key={game.gameID} className="search-result-item">
          <div className="result-header">
            <h2>{game.external}</h2>
          </div>
          <div className="result-content">
            <img src={game.thumb} alt={game.external} />
            <div>
              <p>Game Title: {game.external}</p>
              <p>Sale Price: ${game.cheapest}</p>
            </div>
          </div>
          <button onClick={() => { handleSelect(game); onSelect(game) }} id="select-buttons">Select</button>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
