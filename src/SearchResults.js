import React, {useState} from 'react';

function SearchResults({ searchResults, onSelect }) {
  const [selectedGame, setSelectedGame]= useState(null)

  const handleSelect = (selectedGame) => {
    setSelectedGame(selectedGame)

    fetch('http://localhost:4000/User', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(selectedGame),
    })
    .then ((r)=> r.json() )
    .then ((data)=> {
      console.log(`POST requeste:`, data)
    })
  }


  return (
    <div className="search-results">
      {searchResults.map((game) => (
        <div key={game.gameID} className="search-result-item">
          <h2>{game.external}</h2>
          <img src = {game.thumb}></img>
          <p>Game Title: {game.external}</p>
          <p>Sale Price: ${game.cheapest}</p>
          <button onClick={() => handleSelect(game)}>Select</button>
        </div>
      ))}
    </div>

  );
}

export default SearchResults;
