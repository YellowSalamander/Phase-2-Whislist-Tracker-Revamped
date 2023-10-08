### flatiron-frontend-phase-2-project
# Wishlist Deal Tracker
This is a JavaScript REACT application that allows users to search for games they wanna purchase using the CheapShark API and utilize it to find the best price accross multiple store-fronts. Users can enter a search term and retrieve a list of games that match the search. They can then select games from the search results and add them to their selected games list for further tracking as the prices are fetched in real time. The page also re-directs you to the correct store-front were the best deal is being hosted (mock response at the time)

This is a complete overhaul of the previous iteration of the DOM, utilizing JS REACT as the main language instead of vanilla JS. Further changes to fetching logic and rendering, etc.

## Prerequisites
Before running this application, ensure that you have the following:

1. An internet connection
2. A modern web browser

## Installation
No installation is required for this application. Simply open the index.html file in your web browser.

## Usage
1. Open the page URL on your web browser
2. Log in using the Admin credentials
3. Enter a search term in the search bar and click the "Search" button.
4. The search results will be displayed below the search bar.
5. To select a game from the search results, click the "Select" button associated with the game.
6. The selected games will be displayed in the "Wishlist" section.
6. To remove a game from the selected games, click the "Remove Game" button associated with the game.
7. The "Games to get" section displays a list of pre-selected games with their cheapest prices.
8. Click the "Get Deal" button to view a deal for a specific game (this is a simulated action).

## Development
If you want to modify or enhance this applicationon the Front-End side, follow these steps:

1. Clone this repository. [https://github.com/YellowSalamander/Phase-2-Whislist-Tracker-Revamped-Front-end]
2. Open the project in your preferred code editor.
3. Make the desired changes to the JavaScript code.
4. Test the application locally to ensure it functions as expected.
5. Commit and push your changes to the master repository.
6. Check your changes on this URL [https://phase-2-whislist-tracker-revamped-front-end.vercel.app]

If you wanna modify the data on the server:
1. Clone this repository. [https://github.com/YellowSalamander/Phase-2-Wishlist-server]
2. Open the project in your preferred code editor.
3. Make the desired changes to the server.
5. Commit and push your changes to the master repository.


## Future Development:
1. Continue Developing user accounts for accessing selected games anywhere!
2. Work on additional protections for ./wishlist unless user is logged in
3. Additional tweaks on CSS

## Credits
This application utilizes the CheapShark API to retrieve game data.
Special thanks to stackoverflow and Developer.mozilla !
also the IA that replt has which helped me find some more tenacious bugs on the code that aluded me for days
And obviously to all the database of Flatiron in canvas and all the domain examples in the previous exercises
All images and multimedia used on the site are sourced from the API, all rights belong to the publishing company or developer.


## License
This application is licensed under the GNU GENERAL PUBLIC LICENSE