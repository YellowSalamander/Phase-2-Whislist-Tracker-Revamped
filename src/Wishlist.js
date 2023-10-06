import React, { useEffect, useState } from 'react';
import "./Wishlist.css"


function Wishlist({onSearch,onSelect,onRemove,searchResults,renderedGames, }){
    const[searchValue, setSearchValue] = useState('')
    const [cheapSharkGameData, setCheapSharkGameData] = useState([])
    const [selectedGame, setSelectedGame] = useState(null)
    const [resultsRender, setResultsRender] = useState('none')


    //---- Initial render of games alreaddy on db.json happens below:----//
    useEffect(()=> {
        //Step 1 : Fetch dt from db.json (if any, for rendering)
        fetch('http://localhost:4000/user')
        .then((response) => response.json())
        .then((data) => {
            //Step 2: extracting the fetched data
            const userGames = data
            const gameID= userGames.map(game => game.gameID);

            const fetchData = async () => {
                const promises = gameID.map(async (id) => {
                    const response = await fetch (`https://www.cheapshark.com/api/1.0/games?id=${id}`)
                    if (!response.ok){
                        throw new Error(`Fetch Failed for game ${id}`)
                    }
                    const data = await response.json()
                    data.id=id
                    return data
                });
                const gameDataList = await Promise.all(promises);
                setCheapSharkGameData(gameDataList) 

            }
 
            fetchData()
        });
    }, [renderedGames]);

    // console.log('This is the external API fetch of db.json:', cheapSharkGameData)

//---- search bar element and handling occurs here: ----//


    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchValue);
        setResultsRender('inline-block')
    }
    const handleKeyPress =(e)=> {
        if (e.key === 'Enter'){
        e.preventDefault();
        handleSearchSubmit(e) // this will call the search when  enter is pressed
        }
    }
//---- Here we handle the POST request to the db.json once a game has been selected ----//

    const handleSelect = (selectedGame) => {
        // console.log(`HandleSelect is being called with:`, selectedGame)
        setResultsRender('none')
        const requestData = {
            id: selectedGame.gameID,
            gameID: selectedGame.gameID,
            gameTitle: selectedGame.external
        }
        setSelectedGame(selectedGame)
        fetch(`http://localhost:4000/User`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then((r) => r.json())
        .then ((data) => {
            // console.log(`POST request:`, data)
        });
    };

 


    return(
        <div>
            <form className = "search-bar" onSubmit={handleSearchSubmit}>
                <input id= "form-input"
                    type="text"
                    placeholder="Search games"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}/>
                <button type="submit" id = 'search-button'>Search</button>
            </form>
            <div>
                <div className={`search-results`} style={{display: resultsRender}}>
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

            </div>
            <div className='RenderedGames'>
                    <h1>Your Wishlist!</h1>
                        <ul className='RenderedGamesContainer'>
                        {cheapSharkGameData.length === 0 ? (
                            <p className='NoGames'>No games on Wishlist!</p>
                        ) : (
                        cheapSharkGameData.map((game) => (
                            <li key={game.id} className='GameTitleRender'>
                                 <h2 id="title">{game.info.title}</h2>
                                 <img src={game.info.thumb} className='RenderGameThumb'></img>
                                <p id="pa1">Cheapest Price Ever: {game.cheapestPriceEver.price}</p>
                                 <p id="pa2">Current Cheapest Price: {game.deals[0].price}</p>
                                 <button className='GetDeal'>Get deal!</button>
                                 <button className='Remove' onClick={(e) => { onRemove(game.id) }}> Remove </button>
                             </li>
                            ))
                            )}
                        </ul>
                </div>
        </div>
    )
}

export default Wishlist


