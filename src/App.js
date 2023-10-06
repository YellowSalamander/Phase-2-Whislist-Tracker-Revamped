import React, {useState} from "react";
import LogIn from "./LogIn";
import About from './About'; 
import Wishlist from "./Wishlist";
import NavBar from "./NavBar";
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";



function App() {
  const [searchResults, setSearchResults] = useState([])
  const [renderedGames, setRenderedGames] = useState([''])

 

  const handleRemove = async (id) => {
    const gameToRemove = id
      console.log(`this is the index:`, gameToRemove)

        try {
        const deleteResponse = await fetch(`https://phase-2-db-server.onrender.com/user/${gameToRemove}`, {
          method: 'DELETE',
          headers: {
            'content-Type': 'Application/json',
          },
        })
        if (!deleteResponse.ok) {
          throw new Error(`Failed To Remove game with index ${gameToRemove}`);
        }

        const fetchResponse = await fetch(`https://phase-2-db-server.onrender.com/user`);
        if (!fetchResponse.ok) {
          throw new Error('Failed to fetch updated data');
        }
    
        const dbData = await fetchResponse.json();

            console.log('Data updated:', dbData);
        setRenderedGames(dbData);
      } catch (error) {
        console.error(error);
      }
    };
      
const onSearch = (searchValue) => {
  fetch(`https://www.cheapshark.com/api/1.0/games?title=${searchValue}&limit=12`)
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
    //Extremely important, giving time to the fetch request to complete before setRender... 
    setTimeout(()=>{
      setRenderedGames((prevRenderedGames) => [...prevRenderedGames, selectedGame])
      console.log('This is in App.js handleSelect',renderedGames);
    }, 500)
   
    

  }

  console.log(renderedGames)
  return (
    <div>
     <AuthProvider>
       <NavBar />
      <Switch>
        <Route path="/wishlist">
          <Wishlist onSearch={onSearch} searchResults={searchResults} onSelect={handleSelect} renderedGames={renderedGames}
          onRemove={handleRemove} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/" component={LogIn} />
      </Switch>
    </AuthProvider>
  </div>
);
}
export default App;






