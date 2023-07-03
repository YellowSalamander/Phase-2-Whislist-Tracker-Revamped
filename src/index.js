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

function displaySearchResults() {
  const resultsContainer = document.getElementById('game-results');
  resultsContainer.innerHTML = '';

  if (searchResults.length === 0) {
    console.log('No matching games found.');
    return;
  }

  searchResults.forEach((game, index) => {
    const gameElement = document.createElement('div');
    gameElement.className = 'game';
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

function selectGame(index) {
  if (index >= 0 && index < searchResults.length) {
    const selectedGame = searchResults[index];
    selectedGames.push(selectedGame); // Add selected game to the selectedGames array
    addGameToPage(selectedGame);
  }

}
function clearSearchResults() {
  const resultsContainer = document.getElementById('game-results');
  resultsContainer.innerHTML = '';
}

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

function addGameToPage(game) {
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
      }
    })
    .catch(error => {
      console.error(`error in fetch for fav games`, error)
    })
  })



}
favoriteGamesRefresh()