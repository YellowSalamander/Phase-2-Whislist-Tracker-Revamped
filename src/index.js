document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-button').addEventListener('click', searchGames);
});

let searchResults = [];
let selectedGames = [];
let favoriteGames = [];

//handles the search functionality with a fetch request to the cheapshark API and sends results to the displaySearchResults function
function searchGames() {
  const searchTerm = document.getElementById('game-search-input').value;

  if (searchTerm.trim() === '') {
    console.log('Please enter a search term.');
    return;
  }

  const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm)}&limit=10`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      searchResults = data;
      displaySearchResults();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// handles search display from the search bar results allowing user to select a game and keep it on the DOM. 
function displaySearchResults() {
  const resultsContainer = document.getElementById('game-results');
  resultsContainer.innerHTML = '';

  if (searchResults.length === 0) {
    console.log('No matching games found.');
    return;
  }

  searchResults.forEach((game, index) => {
    const gameElement = document.createElement('div');
    gameElement.className = 'gameSearch';
    gameElement.innerHTML = `
    <div class="details">
      <div class = 'image'>
        <img src="${game.thumb}" alt="${game.external}">
      </div>
        <h4>${game.external}</h4>
        <p>Cheapest Price: ${game.cheapest} $USD</p>
        <button onclick="selectGame(${index})">Select</button>
      </div>
    `;
    resultsContainer.appendChild(gameElement);
    resultsContainer.style.display = 'flex';
  });
}

//handles selection of the games of the searched games and pushes data to the selectedGames array, then sends the data to InitialRenderofGamestoPage function for _____ then calls clearSearchResults
// then sends data to the renderSelectedGames to append it to the DOM, lastly hides the display CSS for the search bar which would now be empty.
function selectGame(index) {
  if (index >= 0 && index < searchResults.length) {
    const selectedGame = searchResults[index];
    selectedGames.push(selectedGame); 
    clearSearchResults()
    renderSelectedGames(selectedGames)
    const resultsContainer = document.getElementById('game-results');
    resultsContainer.style.display = 'none';
  }

}
//clears the search bar after selecting a game to track
function clearSearchResults() {
  const resultsContainer = document.getElementById('game-results');
  resultsContainer.innerHTML = '';
}

// Refreshes favorite game data and renders it on the top of the page, this games are already pre-selected and user cannot modify them.
function favoriteGamesRefresh() {
  const favGames = [`Divinity: Original Sin 2 - Eternal Edition`, `Stellaris`, `Project Wingman`]
  favGames.forEach((game, index) => {
    const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(game)}&limit=1`
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const gameInfo = data[0]
      if (gameInfo){
        favoriteGames.push(gameInfo)
        const gameElement = document.querySelector(`.fixedGame${index + 1}`);
        const imgElement = gameElement.querySelector('img');
        const h4Element = gameElement.querySelector("h4");
        const priceElement = gameElement.querySelector(".details > p:nth-child(2)")
        
        imgElement.src = gameInfo.thumb
        imgElement.alt = gameInfo.external
        h4Element.textContent = gameInfo.external;
        priceElement.textContent = `Cheapest Price: ${gameInfo.cheapest} $ USD`;
        addGetDealButton(gameElement, gameInfo.external)
      }
    })
    .catch(error => {
      console.error(`error in fetch for fav games`, error)
    })
  })
}

// This function serves to render the selected games array and appends it to the html page
function renderSelectedGames(selectedGames) {
  const selectedGamesContainer = document.getElementById('selected-games');
  selectedGamesContainer.innerHTML = '';

  selectedGames.forEach((game, index) => {
    const gameElement = document.createElement('div');
    gameElement.className = 'selectedGame';
    gameElement.innerHTML = `
      <img src="${game.thumb}" alt="${game.external}">
      <div class="details">
        <h4>${game.external}</h4>
        <p>Cheapest Price: ${game.cheapest} $ USD</p>
      </div>
    `;
    addRemoveButton(gameElement, index)
    addGetDealButton(gameElement, game.external)
    selectedGamesContainer.appendChild(gameElement);
  });
}
// adds a button to all rendered games (except search bar results) by creating the html and adding the event listener
function addGetDealButton(gameElement, gameTitle){
  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Get Deal';
  buttonElement.classList.add('dealButton');
  buttonElement.addEventListener('click' , () => {
    getDeal(gameTitle);
  })
  gameElement.querySelector('.details').appendChild(buttonElement)
}
// handles click of the get a deal button
function getDeal(gameTitle){
  console.log(`Get deal for game: ${gameTitle}`)
  alert(`Pretend page redirected user to storefront for game: ${gameTitle}`)
}
// adds the remove button and utilizes an event listener
function addRemoveButton(gameElement, index){
  const removeButton = document.createElement('button');
  removeButton.textContent = "Remove Game From Wishlist"
removeButton.classList.add('removeButton')
  removeButton.addEventListener('click', () => { 
    removeGame(index)
  })
  gameElement.querySelector('.details').appendChild(removeButton)
}
// handles game removal
function removeGame(index){
  if (index >= 0 && index < selectedGames.length) {
    selectedGames.splice(index, 1); // Remove the game from the selectedGames array
    renderSelectedGames(selectedGames); // Re-render the selected games after removal
  }
  
  }
  favoriteGamesRefresh();

  // handles the fixedUserDeals utilized as an example! Basically the ones on the bottom of the page, similar function as favGames, user could easily removes this deals from DOM, does an independent fetch request
function handleFixedUserDeals() {
  const fixedUserGames = [`Assassins Creed 2`, `Project Zomboid`,`Elden Ring`]
  fixedUserGames.forEach((game, index) => {
    const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(game)}&limit=1`
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const gameInfo = data[0]
          if (gameInfo){
            selectedGames.push(gameInfo)
            renderSelectedGames(selectedGames)
          }
          })
        }
        )
  }
handleFixedUserDeals()

