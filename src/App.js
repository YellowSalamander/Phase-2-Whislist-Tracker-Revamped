import React, {useState, useEffect} from "react";
// import './Styles.css'; // Import your CSS file here
import Header from './Header'; // Import the Header component
import SearchBar from "./SearchBar.js";
import FavGames from "./FavGames";
function App({Home, Login, About}) {
  const [searchResults, setSearchResults] = useState([])

const onSearch = (searchValue) => {
  fetch(`https://www.cheapshark.com/api/1.0/games?title=${searchValue}&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data); // Update the searchResults state with the fetched data
        console.log('This is the search results:' , searchResults)
        console.log("This is the data:", data)
      });
  };




  return (
    <div>
      <Header /> {/* Use the Header component */}
      <FavGames />
      <SearchBar onSearch={onSearch} /> 
    </div>

  );
}


// e.preventDefault();
// useEffect(()=> {
//   fetch(`https://www.cheapshark.com/api/1.0/games?title=${searchValue}&limit=10`)
//     .then((r) => {
//     return r.json()})
//     .then ((data) => {
//       console.log(data)
//     })
// })


export default App;