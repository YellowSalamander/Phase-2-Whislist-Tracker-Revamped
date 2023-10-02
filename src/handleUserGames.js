import React, { useEffect, useState } from 'react';
import "./handleUserGames.css"


function HandleUserGames({selectedGames, onRemove}) {
  const [cheapSharkGameData, setCheapSharkGameData] = useState([]);

  useEffect(() => {
    // Step 1: Fetch data from db.json
    fetch('http://localhost:4000/user')
      .then((response) => response.json())
      .then((data) => {
        // Step 2: Extract the fetched data
        const userGames = data;
        const gameID = userGames.map(game => game.gameID)
        // console.log('this is data.user:', gameID);
        // console.log('this is data:', data)
        
        const fetchData = async () => {
          const promises = gameID.map(async (id) => {
            const response = await fetch (`https://www.cheapshark.com/api/1.0/games?id=${id}`)
            if (!response.ok){
              throw new Error(`Fetch failed for game ID ${id}`)
            }
            const data = await response.json()
            // console.log('this is the second fetch:', data)
            return data
          });
          const gameDataList = await Promise.all(promises);
          setCheapSharkGameData(gameDataList)
          // console.log('this is dataList:', gameDataList)
        }
        fetchData();

      })
    }, [selectedGames] )
    console.log('this is the setCheap2:',cheapSharkGameData)
  return (
    <div className='RenderedGames'>
      <h1>Your Wishlist!</h1>
      <ul className='RenderedGamesContainer'>
        {cheapSharkGameData.map((game, index)=> (
          
          <li key={index} className='GameTitleRender'>
            <h2 id="title">{game.info.title}</h2>
          <img src={game.info.thumb} className='RenderGameThumb'></img>
          <p  id= "pa1">Cheapest Price Ever: {game.cheapestPriceEver.price} </p>
          <p  id= "pa2">Current Cheapest Price: {game.deals[0].price}</p>
          <button className='GetDeal'>Get deal!</button>
          <button className='Remove' data-game-index={index+1} onClick={(e)=>onRemove(index)}> Remove </button>
          </li>
            
        ))}
      </ul>
    </div>
  );
}

export default HandleUserGames;
