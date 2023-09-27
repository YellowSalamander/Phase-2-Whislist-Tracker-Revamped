import React, { useState } from 'react';

function SearchResults({ searchResults, onSelect }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelect = (selectedGame) => {
    // Create a new object with only the 'external' property
    const requestData = { gameID: selectedGame.gameID };

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
          <h2>{game.external}</h2>
          <img src={game.thumb} alt={game.external}></img>
          <p>Game Title: {game.external}</p>
          <p>Sale Price: ${game.cheapest}</p>
          <button onClick={() =>{handleSelect(game); onSelect(game)}} >Select</button>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
