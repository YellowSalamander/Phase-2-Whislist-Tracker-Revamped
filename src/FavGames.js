import React from 'react';
import "./FavGames.css"

function FavGames() {
  // Sample data for the three game boxes
  const gamesData = [
    {
      title: 'Game 1',
      imageUrl: 'url_to_game_1_image.jpg',
      description: 'Description of Game 1',
    },
    {
      title: 'Game 2',
      imageUrl: 'url_to_game_2_image.jpg',
      description: 'Description of Game 2',
    },
    {
      title: 'Game 3',
      imageUrl: 'url_to_game_3_image.jpg',
      description: 'Description of Game 3',
    },
  ];

  return (
    <div className="fav-games">
      {gamesData.map((game, index) => (
        <div key={index} className="game-box">
          <img src={game.imageUrl} alt={game.title} />
          <h2>{game.title}</h2>
          <p>{game.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FavGames;
