import React, { useEffect, useState } from 'react';

function HandleUserGames(selectedGames) {
  const [userGameData, setUserGameData] = useState([]);
  const [cheapSharkGameData, setCheapSharkGameData] = useState([]);

  useEffect(() => {
    // Step 1: Fetch data from db.json
    fetch('http://localhost:4000/user')
      .then((response) => response.json())
      .then((data) => {
        // Step 2: Extract the fetched data
        const userGames = data.User;
        console.log(userGames);
  
        // Step 3: Make a GET request to the CheapShark API
        const fetchPromises = userGames.map((userGame) => {
          const gameID = userGame.gameID;
          return fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`).then((response) =>
            response.json()
          );
        });
  
        Promise.all(fetchPromises)
          .then((cheapSharkDataArray) => {
            console.log(cheapSharkDataArray);
          })
          .catch((error) => {
            console.error('Error from CheapShark API:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching data from db.json:', error);
      });
  }, []);

  return (
    <div>

    </div>
  );
}

export default HandleUserGames;
