import React, {useState, useEffect} from "react";
import Header from './Header'; // Import the Header component
import SearchBar from "./SearchBar.js";
import FavGames from "./FavGames";
import SearchResults from './SearchResults'; 
import HandleUserGames from './handleUserGames'


function App({Home, Login, About}) {
  const [searchResults, setSearchResults] = useState([])
  const [selectedGames, setSelectedGames] = useState([])

// const handleRemove = (gameId) => {
//   setSelectedGames((prevSelectedGames) =>
//   prevSelectedGames.filter((game)=> game.gameID !== gameId))
// }
const onSearch = (searchValue) => {
  fetch(`https://www.cheapshark.com/api/1.0/games?title=${searchValue}&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data); // Update the searchResults state with the fetched data
        console.log('This is the search results:' , searchResults)
        console.log("This is the data:", data)
      });
  };
  const handleSelect = (selectedGame) => {
    // Handle the selection of a game here
    console.log('Selected Game:', selectedGame);
    setSelectedGames((prevSelectedGames) => [...prevSelectedGames, selectedGame]);


  }
  return (
    <div>
      <Header /> {/* Use the Header component */}
      <FavGames />
      <SearchBar onSearch={onSearch} /> 
      <SearchResults searchResults={searchResults} onSelect={handleSelect} />
      <HandleUserGames selectedGames={selectedGames} />
    </div>

  );
}

export default App;