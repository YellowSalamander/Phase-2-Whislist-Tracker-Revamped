import React, {useState, useEffect} from "react";
import LogIn from "./LogIn";
import Header from './Header'
import About from './About'; 
import FavGames from "./FavGames";
import Wishlist from "./Wishlist";
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const [searchResults, setSearchResults] = useState([])
  const [selectedGames, setSelectedGames] = useState([])

  const handleRemove = async (id) => {
    const gameToRemove = id
      console.log(`this is the index:`, gameToRemove)

        try {
        const deleteResponse = await fetch(`http://localhost:4000/user/${gameToRemove}`, {
          method: 'DELETE',
          headers: {
            'content-Type': 'Application/json',
          },
        })
        if (!deleteResponse.ok) {
          throw new Error(`Failed To Remove game with index ${gameToRemove}`);
        }

        const fetchResponse = await fetch('http://localhost:4000/User');
        if (!fetchResponse.ok) {
          throw new Error('Failed to fetch updated data');
        }
    
        const dbData = await fetchResponse.json();

            console.log('Data updated:', dbData);
        setSelectedGames(dbData);
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
    setSelectedGames((prevSelectedGames) => [...prevSelectedGames, selectedGame]);

  }
  return (
    <div>
     <AuthProvider>
    <Header />
      <Switch>
        <ProtectedRoute path="/wishlist">
        <FavGames />
          <Wishlist onSearch={onSearch} searchResults={searchResults} onSelect={handleSelect} selectedGames={selectedGames}
          onRemove={handleRemove} />
        </ProtectedRoute>
        <Route path="/about" component={About} />
        <Route path="/" component={LogIn} />
      </Switch>
    </AuthProvider>
  </div>
);
}
export default App;








// const userIDs = dbData.map((user) => user.id);
// const patchedData = dbData.forEach((user, index) => {
//   user.id = index + 1 ;
// });

// console.log('This is user IDs', userIDs);
// console.log('this is dbData', dbData);
// console.log('This is patchedData:', patchedData)

// // this is additional fetch below is to update the id's on the db.json server so that after removal the array id always matches the one fetched by the API
// const patchRequests = userIDs.map((userID) => {
//   return fetch(`http://localhost:4000/User/${userID}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({ id: dbData }),
//   }).then((response) => {
//     if (!response.ok) {
//       throw new Error('Failed to Patch ids');
//     }
//   });
// });


// await Promise.all(patchRequests);

// // Filter the selectedGames array based on the index
// const updatedSelectedGames = selectedGames.filter((game, idx) => idx !== gameIndexToRemove);
// setSelectedGames(updatedSelectedGames);
// } catch (error) {
// console.error(error);
// }
// };