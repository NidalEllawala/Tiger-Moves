## Tiger-Moves

Bagh Chal or Tiger Moves is a 2 player board game originaly from Nepal. 

### Rules
The game is played on a 5×5 point grid with pieces positioned at the intersection of the lines and not inside the areas delimited by them. 

Directions of valid movement between these points are connected by lines. The game play takes place in two phases. In the first phase the goats are placed on the board while the tigers are moved. In the second phase both the goats and the tigers are moved. 

For the tigers, the objective is to "capture" five goats to win. Capturing is performed by jumping over the goats. The goats win by blocking all the tigers' legal moves.

### How to use
- A unique gameId is generated when you create a new game
- Your opponent can join the game using this gameId
- The scoreboard will keep track of the pieces and includes a turn indicator to let you know when the opponent has moved a piece
- A helper feature highlights all possibl moves when you click on a piece 

<img src="https://i.imgur.com/UmCjpXZ.png" width="800" >
<img src="https://i.imgur.com/dja4Kc3.png" width="800" >
<img src="https://i.imgur.com/OLf02Cp.png" width="800" >
<img src="https://i.imgur.com/sFRWoaW.png" width="800" >

# Getting started
Tiger-Moves will be deployed soon. Until then you can run the app to connect with another comouter in your local network.

In order to run this app you will need to have [MongoDB](https://www.mongodb.com/) installed and running. 

1. Clone this repo - `git clone https://github.com/NidalEllawala/Tiger-Moves` and open it with your favorite code editer
2. Change directory to the server folder `cd server`
3. run `npm i` to install the necessary dependencies
4. create a .env file in the root folder following the .env.example file provided
5. run `node index.js`

# Tech Stack
- currently refactoring front-end with React.js
- Node.js
- Express.js
- Handlebars
- MongoDB
- Mongoose
- Socket.io
