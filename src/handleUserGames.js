import React, { useState, useEffect } from 'react';

function HandleUserGames({ selectedGames }) {
  // State to store the cheapest prices for selected games
  const [cheapestPrices, setCheapestPrices] = useState({});
  useEffect(() => {
    // Fetch cheapest prices for selected games
    const fetchCheapestPrices = async () => {
      const gameNames = selectedGames.map((game) => game.title);

      // Create an object with game names as keys and prices as values
      const prices = {};

      await Promise.all(
        gameNames.map(async (name) => {
          const response = await fetch(
            `https://www.cheapshark.com/api/1.0/games?title=${name}`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            prices[name] = data[0].cheapestPrice;
          }
        })
      );

      setCheapestPrices(prices);
    };

    fetchCheapestPrices();
  }, [selectedGames]);

  return (
    <div className="selected-games">
      <h2>Selected Games</h2>
      <ul>
        {selectedGames.map((game) => (
          <li key={game.id}>
            <strong>Title:</strong> {game.title}
            <br />
            <strong>Cheapest Price:</strong> ${cheapestPrices[game.title] || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HandleUserGames;