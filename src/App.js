import React, {useState, useEffect} from "react";
// import './Styles.css'; // Import your CSS file here
import Header from './Header'; // Import the Header component
import SearchBar from "./SearchBar";
import FavGames from "./FavGames";
function App({Home, Login, About}) {
  return (
    <div>
      <Header /> {/* Use the Header component */}
      <FavGames />
      <SearchBar/> 
    </div>

  );
}

export default App;