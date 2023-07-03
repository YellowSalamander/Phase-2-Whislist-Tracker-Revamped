document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-button').addEventListener('click', searchGames);
});

let searchResults = [];
let selectedGames = [];
function searchGames() {
  const searchTerm = document.getElementById('game-search-input').value;

  if (searchTerm.trim() === '') {
    console.log('Please enter a search term.');
    return;
  }

  const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm)}&limit=5`;

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
// handles search bar initially
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
      <img src="${game.thumb}" alt="${game.external}">
      <div class="details">
        <h4>${game.external}</h4>
        <p>Cheapest Price: ${game.cheapest} $USD</p>
        <button onclick="selectGame(${index})">Select</button>
      </div>
    `;
    resultsContainer.appendChild(gameElement);
  });
}
//handles selection
function selectGame(index) {
  if (index >= 0 && index < searchResults.length) {
    const selectedGame = searchResults[index];
    selectedGames.push(selectedGame); // Add selected game to the selectedGames array
    initialRenderofGametoPage(selectedGame);
    console.log(selectedGames)
    clearSearchResults()
    renderSelectedGames(selectedGames)
  }

}
//clears the search bar after selecting a game to track
function clearSearchResults() {
  const resultsContainer = document.getElementById('game-results');
  resultsContainer.innerHTML = '';
}
//fetch request by title
function getGamesByTitle(title) {
  const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(title)}&limit=5`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// visualization of the search bar selection, favorite games, essential for main page load ** change function name**
function initialRenderofGametoPage(game) {
  const gameElement = document.createElement('div');
  gameElement.className = 'game';
  gameElement.innerHTML = `
    <img src="${game.thumb}" alt="${game.external}">
    <div class="details">
      <h4>${game.external}</h4>
      <p> Cheapest Price: ${game.cheapest}$ USD</p>
    </div>
  `;
  document.getElementById('game-results').appendChild(gameElement);
}

// Refreshes favorite game data and renders it on the top of the page
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
// adds a button to all rendered games (except search bar results)
function addGetDealButton(gameElement, gameTitle){
  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Get Deal';
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

function addRemoveButton(gameElement, index){
  const removeButton = document.createElement('button');
  removeButton.textContent = "Remove Game From Wishlist"
  removeButton.addEventListener('click', () => { 
    removeGame(index)
  })
  gameElement.querySelector('.details').appendChild(removeButton)
}

function removeGame(index){
  if (index >= 0 && index < selectedGames.length) {
    selectedGames.splice(index, 1); // Remove the game from the selectedGames array
    renderSelectedGames(selectedGames); // Re-render the selected games after removal
  }
  
  }


favoriteGamesRefresh()

