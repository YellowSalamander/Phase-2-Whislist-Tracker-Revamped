import React, { useEffect, useState } from 'react';


function HandleUserGames({selectedGames, onRemove}) {
  const [cheapSharkGameData, setCheapSharkGameData] = useState([]);

const handleRemove =  (e) => {
  const gameIndexToRemove = e.target.dataset.gameIndex 
  console.log(`this is the index:`, gameIndexToRemove)

    fetch(`http://localhost:4000/user/${gameIndexToRemove}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'Application/json',
      },
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error(`Failed To Remove game with title ${gameIndexToRemove}`)
      }
      return response.json();
    })
  }
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
      <ul>
        {cheapSharkGameData.map((game, index)=> (
          
          <li key={index} className='GameTitleRender'>{game.info.title}
          <p>Cheapest Price Ever: {game.cheapestPriceEver.price}</p>
          <p>Current Cheapest Price: {game.deals[0].price}</p>
          <img src={game.info.thumb} className='RenderGameThumb'></img>
          <button className='GetDeal'>Get deal!</button>
          <button className='Remove' data-game-index={index+1} onClick={(e)=>handleRemove(e)}> Remove </button>
          </li>
            
        ))}
      </ul>
    </div>
  );
}

export default HandleUserGames;
