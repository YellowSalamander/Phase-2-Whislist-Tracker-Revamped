import React, {useState, useEffect} from "react";
import Header from './Header'; 
import SearchBar from "./SearchBar.js";
import FavGames from "./FavGames";
import SearchResults from './SearchResults'; 
import HandleUserGames from './handleUserGames'


function App({Home, Login, About}) {
  const [searchResults, setSearchResults] = useState([])
  const [selectedGames, setSelectedGames] = useState([])


  const handleRemove = async (index) => {
    const gameIndexToRemove = index + 1
      console.log(`this is the index:`, gameIndexToRemove)

        try {
        const deleteResponse = await fetch(`http://localhost:4000/user/${gameIndexToRemove}`, {
          method: 'DELETE',
          headers: {
            'content-Type': 'Application/json',
          },
        })
        if (!deleteResponse.ok) {
          throw new Error(`Failed To Remove game with index ${gameIndexToRemove}`);
        }

        const fetchResponse = await fetch('http://localhost:4000/User');
        if (!fetchResponse.ok) {
          throw new Error('Failed to fetch updated data');
        }
    
        const dbData = await fetchResponse.json();

        const userIDs = dbData.map((user) => user.id);
        const patchedData = dbData.forEach((user, index) => {
          user.id = index + 1 ;
        });
    
        console.log('This is user IDs', userIDs);
        console.log('this is dbData', dbData);
        console.log('This is patchedData:', patchedData)

        // this is additional fetch below is to update the id's on the db.json server so that after removal the array id always matches the one fetched by the API
        const patchRequests = userIDs.map((userID) => {
          return fetch(`http://localhost:4000/User/${userID}`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ id: dbData }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Failed to Patch ids');
            }
          });
        });
    

        await Promise.all(patchRequests);
    
        // Filter the selectedGames array based on the index
        const updatedSelectedGames = selectedGames.filter((game, idx) => idx !== gameIndexToRemove);
        setSelectedGames(updatedSelectedGames);
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
      <Header /> { }
      <FavGames />
      <SearchBar onSearch={onSearch} /> 
      <SearchResults searchResults={searchResults} onSelect={handleSelect} />
      <HandleUserGames selectedGames={selectedGames} onRemove={handleRemove} />
    </div>

  );
}









export default App;








// const handleRemove = (index) => {
//   const gameIndexToRemove = index + 1
//     console.log(`this is the index:`, gameIndexToRemove)

//       fetch(`http://localhost:4000/user/${gameIndexToRemove}`, {
//         method: 'DELETE',
//         headers: {
//           'content-Type': 'Application/json',
//         },
//       })
//       .then((response)=>{
//         if(!response.ok){
//           throw new Error(`Failed To Remove game with index ${gameIndexToRemove}`)
//         } 
//         return fetch('http://localhost:4000/User')
//       })
//       // this is additional fetch below is to update the id's on the db.json server so that after removal the array id always matches the one fetched by the API

//       .then((response) => response.json())
//       .then((dbData)=> {
//         const patchedData = dbData.forEach((user, index) => {
//           user.id = index + 1 ;
//         });

//         const userIDs = dbData.map((user) => user.id)

//         console.log('This is user IDs', userIDs)
//         console.log('this is dbData',dbData)
//         // console.log('this is the patchedData:', patchedData)
//           const patchRequest = userIDs.map((userIDs) => {
//             fetch(`http://localhost:4000/User/${userIDs}`, {
//             method: 'PATCH',
//             headers: {
//               'Content-type': 'application/json',
//             },
//             body: JSON.stringify({id: userIDs})
//           })
//           .then((response)=>{
//             if(!response.ok){
//               throw new Error('Failed to Patch ids');
//             }
//           })
//         })
//         })
//       .then(() => {
//         // Filter the selectedGames array based on the index
//         const updatedSelectedGames = selectedGames.filter((game, idx) => idx !== gameIndexToRemove);
//         setSelectedGames(updatedSelectedGames);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     };