// each chess board column is assigned a letter. array is listed in reverse order, otherwise board is created horizontally flipped.
let letters = ["h", "g", "f", "e", "d", "c", "b", "a"];
// arrays to hold the images of the pieces & put them in their correct starting positions.
let whitePieces = ["w_rook.svg", "w_knight.svg", "w_bishop.svg", "w_king.svg", "w_queen.svg", "w_bishop.svg", "w_knight.svg", "w_rook.svg", "w_pawn.svg"];
let blackPieces = ["b_rook.svg", "b_knight.svg", "b_bishop.svg", "b_king.svg", "b_queen.svg", "b_bishop.svg", "b_knight.svg", "b_rook.svg", "b_pawn.svg"];

//Stores all possible tiles; tiles will be added during board creation.
let list = [];

// HELPER FUNCTIONS
// gets an element by its id.
function getElement(id) {
  return document.getElementById(id);
}

// determines if a value is in an array.
function checkArray(value, array) {
  return array.includes(value);
}

function tileIsEmpty(tileId){
  let tile = getElement(tileId);
  img = tile.querySelector("img");
  return img == null;
}

// determines whether chess piece is white or black.
function getPieceColor(piece) {
  // if piece contains "w_", then it is white. Otherwise, it is black.
  // piece will be an image's "src" attribute.
  return (piece.indexOf("white") != -1 ? "white" : "black");
}

// Function used by horizontal, vertical, and diagonal movement methods.
// Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
function addTileDetermination(pieceSelected, pieceFound, pieceFoundId, possibleMoves){
  if(pieceFound != null){
    if(getPieceColor(pieceSelected) != getPieceColor(pieceFound)){
      possibleMoves.push(pieceFoundId);
    }
  }
  return possibleMoves;
}

function showPossibleMoves(possibleMoves){
  getElement(possibleMoves[0]).classList.add("selected");
  for(let i = 1;i < possibleMoves.length;i++){
    getElement(possibleMoves[i]).classList.add("possible");
  }
}

function hidePossibleMoves(possibleMoves){
  getElement(possibleMoves[0]).classList.remove("selected");
  for(let i = 1;i < possibleMoves.length;i++){
    getElement(possibleMoves[i]).classList.remove("possible");
  }
}

// function to create the chess board.
function makeBoard() {
  let board = getElement("board");
  // chess board is created using divs. "build" variable will contain a row and add it to the board.
  let build = "";
  // variable to determine the color of the board tile (dark brown as default).
  let colornum = 0;

  // creates the rows of the chess board.
  for (let i = 8; i > 0; i--) {
    // variable to hold the image of the chess piece.
    let image = "";
    build += `<div class = "row">`;

    for (let n = 8; n > 0; n--) {
      colornum = i % 2 + n % 2; // determines board tile color (dark/light brown).

      // places the pieces on the board in the correct positions (based on array order).
      switch (i) {
        case 8:
          image = `<img src = "chessPieces/blackPieces/${blackPieces[n - 1]}">`;
          break;
        case 7:
          image = `<img src = "chessPieces/blackPieces/${blackPieces[8]}">`;
          break;
        case 2:
          image = `<img src = "chessPieces/whitePieces/${whitePieces[8]}">`;
          break;
        case 1:
          image = `<img src = "chessPieces/whitePieces/${whitePieces[n - 1]}">`;
          break;
      }

      // assigning the initial position labels to the board tiles.
      let position = letters[n - 1] + i;

      // "build" variable adds a new tile to the row currently being created.
      // determines color of tile, assigns it an id (its tile position), and makes its tile position visible, along with any image.

      // If-statement chain below here are JUST FOR TESTING THE PIECES AND MAKING SURE THEY WORK AS INTENDED. The if-statement chain will be removed once the pieces are thoroughly tested.
      // This also means removing the image = ""; right below, since that is used to override the board putting the pieces in the right places at the beginning of the game.
      image = "";
      if (position == "g1") {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_bishop.svg"></div>`;
      } else if(position == "e1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_king.svg"></div>`;
      } else if(position == "e8"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_king.svg"></div>`;
      } else if(position == "f5"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_queen.svg"></div>`;
      } else if(position == "h8"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_queen.svg"></div>`;
      } else {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br>${image}</div>`;
      }

      // resets colornum, so new tiles can have their color be determined.
      colornum = 0;
      // adds each tile position to be used in voice recognition methods.
      list.push(position);
    }
    // ends the row (and board).
    build += `</div>`;

  }
  board.innerHTML = build;

  // Upon initializing the board, tiles that contain kings & rooks have "castle" data associated with them. This enables castling; if the data is there, then that piece can be used in castling.
  let tileId, castleTile;
  let castleLetters = ["a","e","h"];
  for(let i = 1;i < 9;i+=7){
    for(let j = 0;j < castleLetters.length;j++){
      tileId = castleLetters[j] + i;
      castleTile = getElement(tileId);
      castleTile.dataset.castle = 1;
    }
  }
}

// method that gets all the tiles vertically from a starting point. Only does so in one direction (up or down)
// startPosition: String, represents the tile coordinate the piece being selected is on
// loopStop: int, can only be 0 or 9 since board tiles are numbered from 1 to 8 vertically, so if we reach 0 or 9, we're off the board & the loop should end
// accumulatorValue: int, can only be 1 or -1 to get increasing and decreasing board tiles; heavily related to loopStop
// piece: String, for determining if a potential moves tile has a piece on it that can be taken
function verticalMovement(startPosition, loopStop, accumulatorValue, piece) {
  let possibleMoves = [], id, tile, img = null;

  // split the label of tile into its letter and number.
  let letter = startPosition[0];
  let number = parseInt(startPosition[1]);

  // accumulator that will determine when to end the loop.
  let count = number + accumulatorValue;

  // loop to gather the id of tiles that can be moved to
  while (count != loopStop) {
    // if there is an img in the tile we are checking as a potential move, there is a piece there & the loop ends prematurely.
    id = letter + count;
    tile = getElement(id);
    if(tileIsEmpty(id) == false){
      img = tile.querySelector("img").src;
      break;
    }

    // adding current tile being iterated through to the possibleMoves array. Also adds a new class to that tile, changing its color to show it is a potential move.
    possibleMoves.push(id);

    count += accumulatorValue;

  }

  // Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
  return addTileDetermination(piece, img, id, possibleMoves);
  
}

// method that gets all the tiles horizontally from a starting point. Only does so in one direction (left or right)
// startPosition: String, represents the tile coordinate the piece being selected is on
// loopStop: int, can only be -1 or 8 since we work our way through the global letters array going either towards index 0 or index 7, so we need to stop at -1 or 8 to avoid errors.
// accumulatorValue: int, can only be 1 or -1 to go forward or backward through the global letters array; heavily related to loopStop
// piece: String, for determining if a potential moves tile has a piece on it that can be taken
function horizontalMovement(startPosition, loopStop, accumulatorValue, piece){
  let possibleMoves = [], tile, id, img = null;
  
  // split the label of tile into its letter and number. letterPosition is for indexing the global letters array.
  let letter = startPosition[0];
  let letterPosition = letters.indexOf(letter);
  let number = parseInt(startPosition[1]);

  // count variable keeps track of what letter we are currently at.
  let count = letterPosition + accumulatorValue;

  // loop that gathers the id of all potential tiles that can be moved to
  while (count != loopStop) {

    // if there is an img in the tile we are checking as a potential move, there is a piece there & the loop ends prematurely.
    id = letters[count] + number;
    tile = getElement(id);
    if(tileIsEmpty(id) == false){
      img = tile.querySelector("img").src;
      break;
    }

    // adding current tile being iterated through to the possibleMoves array. Also adds a new class to that tile, changing its color to show it is a potential move.
    possibleMoves.push(id);

    count += accumulatorValue;

  }

  // Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
  return addTileDetermination(piece, img, id, possibleMoves)
  
}

// method that gets all the tiles diagonally in one direction from a starting point.
// startPosition: String, represents the tile coordinate the piece being selected is on
// loopStopLetter: int, can only be -1 or 9 to work with the global letters array to avoid allowing tiles that are not on the board to be considered as potential tiles to move to (since the array is from 0 to 8 in index values)
// loopStopNumber: int, can only be 0 or 9 to avoid allowing tiles that are not on the board to be considered as potential tiles to move to (since board is from 1-8, inclusive)
// accumulatorValueLetter: int, can only be 1 or -1 to go forward or backward through the global letters array; heavily related to loopStopLetter
// accumulatorValueNumber: int, can only be 1 or -1 to get increasing and decreasing board tiles; heavily related to loopStopNumber
// piece: String, for determining if a potential moves tile has a piece on it that can be taken
function diagonalMovement(startPosition, loopStopLetter, loopStopNumber, accumulatorValueLetter, accumulatorValueNumber, piece){
  let possibleMoves = [], tile, id, img = null;

  // split the label of tile into its letter and number. letterPosition is for indexing the global letters array.
  let letter = startPosition[0];
  let letterPosition = letters.indexOf(letter);
  let numberAccumulator = parseInt(startPosition[1]) + accumulatorValueNumber;
  let letterAccumulator = letterPosition + accumulatorValueLetter;

  // important to note that since working with letters and numbers means we have different loop stopping values, we need to check both to prevent errors.
  while (letterAccumulator != loopStopLetter && numberAccumulator != loopStopNumber) {
    id = letters[letterAccumulator] + numberAccumulator;
    tile = getElement(id);

    // if there is an img in the tile we are checking as a potential move, there is a piece there & the loop ends prematurely.
    if(tileIsEmpty(id) == false){
      img = tile.querySelector("img").src;
      break;
    }

    // adding current tile being iterated through to the possibleMoves array. Also adds a new class to that tile, changing its color to show it is a potential move.
    possibleMoves.push(id);

    letterAccumulator += accumulatorValueLetter;
    numberAccumulator += accumulatorValueNumber;

  }
  
  // Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
  return addTileDetermination(piece, img, id, possibleMoves)
}

// Function that gets tiles a king can castle to. Used exclusively by getPossibleMoves' king case.
// kingTileId contains the 2 character id the king is currently located at
// kingNumber is a 1 digit integer value that provides the row the king is.
// Note that the vast majority of this function's logic is dependent on the king not having moved. Because of this, the king will always be at an "e" tile, which is where the "e" magic value comes from.
// Similar idea for the magic values "a" and "h". On those lettered tiles exist rooks at the start of the game, so if they have not moved, they are on a or h tiles.
function getCastle(kingTileId, kingNumber){
  let castleTiles = [];
  if(getElement(kingTileId).dataset.castle == 1){
    // "checks" array holds values that are dependent on if there are any pieces between a king and a rook if the king is at its starting position. Index 0 is for the left of the king, index 1 is for the right of the king.
    // Nested loop looks to the left and right of a king from the king's starting position to see if the tiles between the king and the rooks on its same team are empty. If not, depending on which direction is being looked at, the corresponding checks array index is updated (explained in previous comment)
    let checks = [true, true], imgFound, currentId, currentTile;
    let currentIndex, factor;
    for(let i = 0;i < 2;i++){
      imgFound = null;
      factor = (i == 0 ? 1 : -1);
      currentIndex = letters.indexOf("e") + factor
      while(letters[currentIndex] != "a" && letters[currentIndex] != "h" && imgFound == null){
        currentId = letters[currentIndex] + kingNumber;
        currentTile = getElement(currentId);
        if(currentTile.querySelector("img") != null){
          imgFound = currentTile.querySelector("img");
          checks[i] = false
        }
        currentIndex += factor;
      }
    }

    // If the tiles between a king and its rook are empty, AND if the rook hasn't moved (still has the data associated with castling), then the king can possibly move to its castling tile.
    // Magic values a & h are explained in the final comment before the function definition
    // magic values "c" and "g" come from the fact that whenever a king castles, it always moves 2 tiles from where it currently is. Where the king currently is, when castling, will always be an e tile, and 2 tiles away from an "e" tile if considering just letters (which we do for castling) means a king can only move to a "c" or "g" tile, which is why those are magic values.
    if(checks[0] && getElement("a"+kingNumber).dataset.castle == 1){
      castleTiles.push("c"+kingNumber);
    }
    if(checks[1] && getElement("h"+kingNumber).dataset.castle == 1){
      castleTiles.push("g"+kingNumber);
    }
  }
  
  return castleTiles;

}

// checks if pawn diagonal movement is possible
function getPawnDiagonals(pawnId, pawnLetter, pawnNumber, direction){
  // left & right checks are for ensuring the letters array is not indexed out of range; prevents errors
  let leftCheck = letters.indexOf(pawnLetter)+1 < letters.length;
  let rightCheck = letters.indexOf(pawnLetter)-1 > -1;
  let checks = [leftCheck,rightCheck];
  let factor = 0; // Factor determines the direction (up or down) we are looking at from the pawn (due to the pawns' different senses of "forward" depending on its color)
  let id, tile;
  let diagonalMoves = [];
  for(let i = 0;i < checks.length;i++){
    factor = (i == 0 ? 1 : -1);
    if(checks[i]){
      id = letters[letters.indexOf(pawnLetter)+factor] + (pawnNumber + 1 * direction);
      if(tileIsEmpty(id) == false){ // Checks if there is a piece on the tiles diagonal to the pawn
        let currentTile = getElement(pawnId);
        let currentPiece = currentTile.querySelector("img");
        tile = getElement(id);
        let targetPiece = tile.querySelector("img");
        if(getPieceColor(targetPiece.src) != getPieceColor(currentPiece.src)){ // Checks if a piece on a diagonal tile is an enemy piece, in which case diagonal movement is possible
          diagonalMoves.push(id);
        }
      }
    }
  }
  return diagonalMoves;
}

// Gets all the enemy moves; player parameter is either 1 or 2
// Mainly used to determine all the tiles a king cannot move to (for check & checkmate)
function getAllEnemyMoves(player){
  let color = (player == 1 ? "white" : "black");
  let currentElement, currentPiece;
  let allMoves = [], enemyMoves = [];

  // We go through the entire board to search for all pieces; if we come across a piece, and it's the color of the player we're looking at, then we get its possible moves.
  // Since this function is used by king for check & checkmate, we only check a pawn's diagonal moves, since a pawn moving forward & en passant does not affect check or checkmate; if we included forward movement, a king would be unable to move in front of an enemy pawn.
  for(let i = 0;i < list.length;i++){
    enemyMoves = [];
    if(tileIsEmpty(list[i]) == false){
      currentElement = getElement(list[i]);
      currentPiece = currentElement.querySelector("img").src;
      if(currentPiece.includes(color) == false){
        if(currentPiece.includes("pawn")){
          let pawnLetter = list[i].substring(0,1), pawnNumber = parseInt(list[i].substring(1,2)), direction = (color == "white" ? -1 : 1);
          // left & right checks are for ensuring the letters array is not indexed out of range; prevents errors
          let leftCheck = letters.indexOf(pawnLetter)+1 < letters.length, rightCheck = letters.indexOf(pawnLetter)-1 > -1;
          let checks = [leftCheck,rightCheck];
          let factor = 0; // Factor determines the direction (up or down) we are looking at from the pawn (due to the pawns' different senses of "forward" depending on its color)
          let id;
          for(let i = 0;i < checks.length;i++){
            factor = (i == 0 ? 1 : -1);
            if(checks[i]){
              id = letters[letters.indexOf(pawnLetter)+factor] + (pawnNumber + 1 * direction);
              enemyMoves.push(id);
            }
          }
        }else{ // If the piece is not a pawn, we just get all possible moves regularly
          enemyMoves = getPossibleMoves(list[i],currentPiece);
          enemyMoves.shift();
        }
        // We push a JSON including all relevant information, which can be used later
        allMoves.push({"piece":currentPiece,"tile":list[i],"moves":enemyMoves});
      }
    }
  }
  return allMoves;
}

// Compares a king's moves to all enemy pieces' moves. Prevents a king from moving to a tile where an enemy piece can move to, since the king would be in check.
// playerNumber is either 1 or 2, and possibleMoves is the selected king's possible moves
function checkKingMoves(playerNumber, possibleMoves){
  let allEnemyMoves = getAllEnemyMoves(playerNumber);
  let currentEnemy, currentEnemyMoves;
  let tilesToRemove = [];
  for(let i = 1; i < possibleMoves.length;i++){
    for(let j = 0; j < allEnemyMoves.length;j++){
      currentEnemy = allEnemyMoves[j];
      currentEnemyMoves = currentEnemy["moves"];
      if(currentEnemyMoves.includes(possibleMoves[i])){
        tilesToRemove.push(possibleMoves[i]);
      }
    }
  }
  let newPossibleMoves = [];
  for(let i = 0; i < possibleMoves.length;i++){
    if(tilesToRemove.includes(possibleMoves[i]) == false){
      newPossibleMoves.push(possibleMoves[i]);
    }
  }
  return newPossibleMoves;
}

// Restricts allied piece movement if an ally's potential move puts its king in check or can help the king if the king is already in check. Does this by updating the board with all possible movements by the selected piece and simulating the board afterwards, determining if the king is safe, and then returning the board to normal once all possible moves are considered.
// Used in phase 1 & 2 of the movement method on a selected piece
// possibleMoves is the selected piece's possible moves
// pieceId is the ID of the tile the selected piece is on
// player is the current player that is moving
// kingId is the ID of the tile the allied king is currently on
// kingIsPiece is a flag that grants the function a bit of a double usage; the only change is that we check if a move by a selected king will actually get the king out of check
function simulateMovesThatKeepKingSafe(possibleMoves, pieceId, player, kingId, kingIsPiece){

  // Prepare the board for simulation
  let originalTile = getElement(pieceId);
  let originalPieceImg = originalTile.querySelector("img");
  originalTile.removeChild(originalTile.children[1]);

  let newPossibleMoves = [possibleMoves[0]]; // Regardless, we can always deselect our current piece
  let enemyPieces, targetTile, targetTileImg, hasImage = false, tileCheck = true;

  for(let i = 1;i < possibleMoves.length;i++){
    // If the tile we encounter has an enemy piece on it, then we simulate taking that piece too; piece found is returned to its original spot at the end of each iteration to provide the original board for the next simulation of a move
    hasImage = false;
    targetTile = getElement(possibleMoves[i]);
    if(targetTile.querySelector("img") != null){
      targetTileImg = targetTile.querySelector("img");
      if(getPieceColor(targetTileImg.src) != getPieceColor(originalPieceImg.src)){
        hasImage = true;
        targetTile.removeChild(targetTile.children[1]);
      }
    }
    targetTile.appendChild(originalPieceImg);

    // We get all the enemy moves, and see if our new, simulated move puts the king in check; if so, then the move we are currently simulating cannot be done
    enemyPieces = getAllEnemyMoves(player);
    tileCheck = true;
    for(let j = 0;j < enemyPieces.length;j++){
      if(kingIsPiece){ // Flagged case explained in the function definition; if the selected piece is the king, then we look to see if a king's move will take him out of check
        if(enemyPieces[j]["moves"].includes(possibleMoves[i])){
          tileCheck = false;
        }
      }else{
        if(enemyPieces[j]["moves"].includes(kingId)){
          tileCheck = false;
        }
      }
    }

    // If the move does not put the king in check, then it's ok to move there
    if(tileCheck){
      newPossibleMoves.push(possibleMoves[i]);
    }

    // Reverse the simulation to prepare for next iteration
    targetTile.removeChild(targetTile.children[1]);
    if(hasImage){
      targetTile.appendChild(targetTileImg);
    }
  }

  // fully restore the board to its state before the function was called (before the simulation began)
  originalTile.appendChild(originalPieceImg);
  return newPossibleMoves;
}

// Gets the element associated with all tiles that have an image; used in determineInsufficientPieces() function
function getAllPieceTiles(){
  let whitePieces = [], blackPieces = [];
  let currentElement, currentElementImg, imageSource;
  for(let i = 0; i < list.length;i++){
    currentElement = getElement(list[i]); // once again using global list[] that's defined upon board creation (contains all tiles)
    currentElementImg = currentElement.querySelector("img");
    if(currentElementImg != null){
      imageSource = currentElementImg.src;
      if(getPieceColor(imageSource) == "white"){
        whitePieces.push(currentElement);
      }else{
        blackPieces.push(currentElement);
      }
    }
  }
  let allPieces = [whitePieces,blackPieces];
  return allPieces;
}

// Used for determining if a draw occurs due to insufficient pieces
// allTiles parameter is all the tiles that have pieces
function determineInsufficientPieces(allTiles){
  // All arrays follow the pattern that index 0 is associated with white pieces & index 1 is associated with black pieces
  // soloKing is used to store if a player only has a king in their pieces
  // badCombo refers to the case where a player has a king and either a bishop or knight
  // hasBishop refers to if a player has a bishop
  // tileColors refers to the condition that both players have kings and 1 bishop each, but the bishops are on the same colored tile, which cannot produce a checkmate and thus produces a draw
  let soloKing = [false, false];
  let badCombo = [false, false];
  let hasBishop = [false, false];
  let tileColors = [];
  for(let i = 0;i < allTiles.length;i++){
    let team = allTiles[i]; // allTiles[i] give sus either the whitePieces[] array or blackPieces[] array from getAllPieceTiles depending on the index value
    if(team.length == 1){ // If the player only has a king, we can just skip everything else
      soloKing[i] = true;
    }else if(team.length == 2){ // If a player has 2 pieces, we only care if those pieces are a knight or bishop, and if it's a bishop, we care what color tile it's on, which we get form the classList
      //Remember that team is a list of elements, specifically the tiles on the board
      for(let j = 0; j < team.length;j++){
        currentImg = team[j].querySelector("img");
        if(currentImg.src.includes("bishop")){
          badCombo[i] = true;
          hasBishop[i] = true;
          tileColors.push(team[j].classList[0]);
        }else if(currentImg.src.includes("knight")){
          badCombo[i] = true;
        }
      }
    }
  }

  // bishops are involved in 2 different ways to draw by insufficient pieces, so we need to do a bit more lengthy logic
  let insufficientByBishop = false;
  if(tileColors.length == 2){
    let tileColorsNumbers = [ tileColors[0].substring(tileColors[0].length-1) , tileColors[1].substring(tileColors[1].length-1)];
    insufficientByBishop = hasBishop[0] && hasBishop[1] && tileColorsNumbers[0]%2 == tileColorsNumbers[1]%2;
    // Recall that the tiles recieve their color depending on their number: 0, 1, or 2. 0 & 2 produce the same color tile, so we need math to determine if the colors are the same or not
  }
  let insufficientByKings = soloKing[0] && soloKing[1];
  let insufficientByCombo = soloKing[0] && badCombo[1] || soloKing[1] && badCombo[0];

  // Checks if any of the insufficient checks are true, because if even one is, then checkmate cannot be achieved and we have a draw.
  let insufficientByAny = insufficientByBishop || insufficientByKings || insufficientByCombo;
  return insufficientByAny;
}

////////////////////////////////////////////////////////////////////////////////

// method that gets all the possible moves. Highlights each, and returns an array of all the possible moves (including the selected tile).
function getPossibleMoves(starting, piece) {
  let possibleMoves = [starting];
  // split the label of tile into its letter and number.
  let letter = starting[0];
  let number = parseInt(starting[1]);
  // only gets the name of the piece from its image source.
  let substringFirstNumber = piece.indexOf("_") + 1;
  let substringSecondNumber = piece.indexOf(".svg");
  let pieceName = piece.substring(substringFirstNumber, substringSecondNumber);
  // determines what piece is being moved and shows possible moves.
  switch (pieceName) {
    case "rook":
      // verticalMovement and horizontalMovement functions only work in one direction at a time, so they are called multiple times. Magic numbers are explained in the function definitions.
      possibleMoves = possibleMoves.concat(verticalMovement(starting, 0, -1, piece)); //Gets all the possible moves vertically below the selected tile. 
      possibleMoves = possibleMoves.concat(verticalMovement(starting, 9, 1, piece)); //Gets all the possible moves vertically above the selected tile. 
      possibleMoves = possibleMoves.concat(horizontalMovement(starting, 8, 1, piece)); //Gets all the possible moves horizontally to the left of the selected tile. 
      possibleMoves = possibleMoves.concat(horizontalMovement(starting, -1, -1, piece)); //Gets all the possible moves horizontally to the right of the selected tile. 
      break;
    case "knight":
      let factors = [[1,1],[-1,1],[1,-1],[-1,-1]]; // factors manipulate the direction of the tiles from the knight, working in a similar way to quadrants in math graphs.
      let newLetter, newNumber, newCoord, closeOrFarFactor, targetLettersIndex; // closeOrFarFactor uses the ideas of "close" (closer to knight vertically) and "far" (further from knight vertically), since the knight's possible tiles are just 2 tiles mirrored in different ways
      for(let i = 0;i < factors.length;i++){
        for(let j = 0;j < 2;j++){ // Loop for the two aforementioned tiles
          closeOrFarFactor = (j%2 == 0 ? [2,1] : [1,2]); // a knight's 2 core tiles are: (2 letters away & 1 number away) AND (1 letter away & 2 numbers away), which is reflected in the closeOrFarFactor
          targetLettersIndex = letters.indexOf(letter) + closeOrFarFactor[0] * factors[i][0];
          if(targetLettersIndex < letters.length && targetLettersIndex >= 0){ // Checks are done to ensure the letters array is not being indexed out of range; prevents errors
            newLetter = letters[letters.indexOf(letter) + closeOrFarFactor[0] * factors[i][0]];
            newNumber = number + closeOrFarFactor[1] * factors[i][1];
            if(newNumber <= 8 && newNumber > 0){ // Board is from 1-8, so only numbers 1-8 are valid
              newCoord = newLetter + newNumber;
              // The following code determines if a target tile has a piece, and whether or not that piece is an enemy
              if(getElement(newCoord).querySelector("img") == null){
                possibleMoves.push(newCoord);
              }else{
                foundPiece = getElement(newCoord).querySelector("img");
                currentPiece = getElement(starting).querySelector("img");
                if(getPieceColor(currentPiece.src) != getPieceColor(foundPiece.src)){
                  possibleMoves.push(newCoord);
                }
              }
            }
          }
        }
      }
      break;
    case "bishop":
      // diagonalMovement function only works in one direction at a time, so they are called multiple times. Magic numbers are explained in the function definitions.
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, -1, 0, -1, -1, piece)); // Gets all the possible moves down and right from the selected tile
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, 8, 0, 1, -1, piece)); // Gets all the possible moves down and left from the selected tile
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, -1, 9, -1, 1, piece)); // Gets all the possible moves up and right from the selected tile
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, 8, 9, 1, 1, piece)); // Gets all the possible moves up and left from the selected tile
      break;
    case "king":
      let kingLetterPosition = letters.indexOf(letter);

      // all 8 directions: up, down, left, right, and 4 diagonals
      let kingMoves = [
                        [0, 1],   // up
                        [0, -1],  // down
                        [-1, 0],  // left
                        [1, 0],   // right
                        [-1, 1],  // up-left
                        [1, 1],   // up-right
                        [-1, -1], // down-left
                        [1, -1]   // down-right
                      ];

      for (let i = 0; i < kingMoves.length; i++) {
        let newLetter = kingLetterPosition + kingMoves[i][0];
        let newNumber = number + kingMoves[i][1];

        // checks if new position is within bounds of chess board.
        if (newLetter >= 0 && newLetter < 8 && newNumber >= 1 && newNumber <= 8) {
          let newSquare = letters[newLetter] + newNumber;
          let tile = getElement(newSquare);
          let img = tile.querySelector("img");

          // checks if tile already has a piece on it. If yes, remove that label from possible moves.
          if (img == null || getPieceColor(img.src) != getPieceColor(piece)) {
            possibleMoves.push(newSquare);
          }
        }
      }

      // gets the castling tiles a king can move to if castling is possible & makes them possible moves
      let castleMoves = getCastle(starting, number);
      possibleMoves = possibleMoves.concat(castleMoves);

      break;
    case "queen":
      // verticalMovement, horizontalMovement, and diagonalMovement functions only work in one direction at a time, so they are called multiple times. Magic numbers are explained in the function definitions.
      //Vertical tiles
      possibleMoves = possibleMoves.concat(verticalMovement(starting, 0, -1, piece)); //Gets all the possible moves vertically below the selected tile. 
      possibleMoves = possibleMoves.concat(verticalMovement(starting, 9, 1, piece)); //Gets all the possible moves vertically above the selected tile. 

      //Horizontal tiles
      possibleMoves = possibleMoves.concat(horizontalMovement(starting, 8, 1, piece)); //Gets all the possible moves horizontally to the left of the selected tile. 
      possibleMoves = possibleMoves.concat(horizontalMovement(starting, -1, -1, piece)); //Gets all the possible moves horizontally to the right of the selected tile. 

      //Diagonal tiles
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, -1, 0, -1, -1, piece)); // Gets all the possible moves down and right from the selected tile
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, 8, 0, 1, -1, piece)); // Gets all the possible moves down and left from the selected tile
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, -1, 9, -1, 1, piece)); // Gets all the possible moves up and right from the selected tile
      possibleMoves = possibleMoves.concat(diagonalMovement(starting, 8, 9, 1, 1, piece)); // Gets all the possible moves up and left from the selected tile
      break;
    case "pawn":
      let pawnColor = getPieceColor(piece);
      // determines direction of pawn movement. white pawn moves up, black pawn moves down.
      let direction = (pawnColor == "white" ? 1 : -1);
      // determines starting row of pawn. white pawns start on row 2, black pawns start on row 7.
      let startingRow = (pawnColor == "white" ? 2 : 7);

      // if pawn is not in starting row, it can only move 1 space forward.
      let id = letter + (number + 1 * direction);
      if(tileIsEmpty(id)){
        possibleMoves.push(id);
      }

      // checks if pawn is in its starting row. If yes, it can move 2 spaces forward.
      if (number == startingRow && tileIsEmpty(id)) {
        // 2 spaces forward in opposite direction based on pawn color.
        id = letter + (number + 2 * direction);
        if(tileIsEmpty(id)){
          possibleMoves.push(id);
        }
      }

      // checks if pawn can capture a piece diagonally.
      possibleMoves = possibleMoves.concat(getPawnDiagonals(starting, letter, number, direction));

      // Checks if en passant is an option
      // leftCheck & rightCheck are used again to determine if the adjacent tiles from a pawn exist
      // the dataset enpassant attribute is associated with a tile that a pawn has just moved 2 tiles to from its starting position. This is added in phase 2 of the movement method, and after the next player's turn, the data is removed in move phase 1.
      leftCheck = letters.indexOf(letter)+1 < letters.length;
      rightCheck = letters.indexOf(letter)-1 > -1;
      checks = [leftCheck,rightCheck];
      let enPassantId, enPassantTile, factor;
      for(let i = 0; i < checks.length;i++){
        factor = (i == 0 ? 1 : -1);
        if(checks[i]){
          enPassantId = letters[letters.indexOf(letter)+factor] + number;
          enPassantTile = getElement(enPassantId);
          if(enPassantTile.dataset.enpassant != undefined){
            id = letters[letters.indexOf(letter)+factor] + (number + direction);
            possibleMoves.push(id);
          }
        }
      }

      break;
  }

  return possibleMoves;

}

// global variables for movement method.
let phase = 1;
let startingTile;

// function to move pieces.
function move(p, st) { // p = phase of movement method, st = starting tile.
  let tileId = getElement("tile").value;
  let result, starting, chessPiece;
  let playerMessage = getElement("playerTurn");
  let player = (playerMessage.innerHTML.includes("Player 1") ? 1 : 2);
  let possibleMoves;
  let kingColor = (player == 1 ? "white" : "black");
  let kingId = document.querySelector(`img[src="chessPieces/${kingColor}Pieces/${kingColor[0]}_king.svg"]`).parentElement.id;
  switch (p) {
    // selection phase of movement method (phase 1); user selects a tile to move a piece from.
    case 1:
      // Checks if user initiates a draw request. If so, next player can either accept or decline. If decline, game ends in a draw; if accept, game resumes with the player that initiated the draw's turn
      if(playerMessage.dataset.draw != undefined){
        if(tileId.toLowerCase() == "accept"){
          playerMessage.innerHTML = `Draw - Induced by players`;
          phase = 4;
        }else if(tileId.toLowerCase() == "decline"){
          playerMessage.innerHTML = `Player ${playerMessage.dataset.draw}: Select a tile with a piece`;
          delete playerMessage.dataset.draw;
        }else{
          break
        }
        break;
      }else{
        if(tileId.toLowerCase() == "draw"){
          let nextPlayer = (player == 1 ? 2 : 1);
          playerMessage.dataset.draw = player;
          playerMessage.innerHTML = `Player ${player} is requesting a draw - Player ${nextPlayer}, either "accept" or "decline" the offer`;
          break
        }
      }


      // get id of tile of piece user wants to move. If it is invalid, 1st phase of move method fails & user must try again.
      if (checkArray(tileId, list) == false) { // if tileId is not in list, then it is invalid.
        break;
      }

      // Tiles with img elements have pieces, so if chessPiece is not null, the selection phase of the move operation proceeds.
      starting = getElement(tileId);
      chessPiece = starting.querySelector("img"); // gets img element of tile and uses that as the piece.

      if (chessPiece != null) {
        // Final check for ensuring players can only select their own pieces.
        let colorCheck = (playerMessage.innerHTML.includes("1") ? "white" : "black");
        //if(getPieceColor(chessPiece.src) == getPieceColor(colorCheck)){
          result = tileId;

          // method that gets possible moves. Also used to determine where a king cannot move, and if the king is in check or checkmate.
          possibleMoves = getPossibleMoves(starting.id, chessPiece.src);
          
          // Ensures that a selected king cannot move to tiles that put him in check & ensures that all other pieces cannot move to tiles that put the king in check
          if(chessPiece.src.includes("king")){
            possibleMoves = checkKingMoves(player,possibleMoves);
            possibleMoves = simulateMovesThatKeepKingSafe(possibleMoves, tileId, player, kingId, true);
          }else{
            possibleMoves = simulateMovesThatKeepKingSafe(possibleMoves, tileId, player, kingId, false);
          }

          // All possible moves light up
          showPossibleMoves(possibleMoves);

          phase = 2; // phase 2 = selecting where to move that piece and moves it there (case 2)

          // Goes through all tiles that could possibly support en passant special move. If the player data associated with the en passant tile is the same as the current player's number, that means the time frame for en passant is over and the data is removed from the en passant tile.
          let enPassantId, enPassantAttribute, skippedId;
          for(let i = 4; i <= 5;i++){
            for(let j = 0; j < letters.length;j++){
              enPassantId = letters[j] + i;
              enPassantAttribute = getElement(enPassantId).dataset.enpassant;
              if(enPassantAttribute == player){
                delete getElement(enPassantId).dataset.enpassant;
                let colorFactor = (player == 1 ? -1 : 1);
                skippedId = enPassantId[0] + (parseInt(enPassantId[1]) + colorFactor);
                delete getElement(skippedId).dataset.skipped;
              }
            }
          }

          // Updating player message with tile & piece selected
          let substringFirstNumber = chessPiece.src.indexOf("_") + 1;
          let substringSecondNumber = chessPiece.src.indexOf(".svg");
          let pieceName = chessPiece.src.substring(substringFirstNumber, substringSecondNumber);
          playerMessage.innerHTML = `Player ${player}: Selected ${pieceName} ${tileId} - Select a tile to move it to`;
        }
      //}
      break;

    // actually moves the chess piece to its new tile; movement phase of move method.
    case 2:
      let pawnPromotionCheck = false, successfulMove = false;
      // get id of tile the user wants to move the selected piece to. If it is invalid, 2nd phase of move method fails & user must try again.
      starting = getElement(st);
      chessPiece = starting.querySelector("img"); // gets img element of tile and uses that as the piece.
      possibleMoves = getPossibleMoves(starting.id, chessPiece.src);
      // Ensures that a selected king cannot move to tiles that put him in check & ensures that all other pieces cannot move to tiles that put the king in check
      if(chessPiece.src.includes("king")){
        possibleMoves = checkKingMoves(player,possibleMoves);
        possibleMoves = simulateMovesThatKeepKingSafe(possibleMoves, st, player, kingId, true);
      }else if(chessPiece != null){
        possibleMoves = simulateMovesThatKeepKingSafe(possibleMoves, st, player, kingId, false);
      }
      let targetTile = "";

      // checks if the user entered a tile that the piece can actually move to; if not, restart movement phase
      if (checkArray(tileId, possibleMoves) == false) {
        result = st;
        break;
      }

      // checks if the starting tile is different from the target tile. If different, that means the user is trying to move a piece to a new tile, in which case the movement method proceeds with actual movement. If the two tiles are the same, then you are trying to move a piece to the tile it is already on, in which case the piece is deselected. The user does not lose a turn.
      // THIS IS WHERE ACTUAL MOVEMENT LOGIC IS
      if (tileId != st) {
        targetTile = getElement(tileId);

        // If there is a piece (img element) on the target tile, the user eliminates that piece by moving to the target tile.
        if(targetTile.querySelector("img") != null){
          targetTile.removeChild(targetTile.children[1]);
        }
        starting.removeChild(chessPiece);
        targetTile.appendChild(chessPiece);

        // Enables later logic
        successfulMove = true;

        //Next 2 code blocks check for special moves en passant & king castling. For both, we need the starting tile's number.
        let numOfStarting = parseInt(st[1]);

        //Handles special moves en passant & castling
        // Checks if a pawn has been moved 2 tiles from its starting position; if so, that is the first time, and en passant is an option for the next player. Data that is the current player's number is associated with the tile the pawn just landed on, making it an "en passant tile". Also adds "true" data to the skipped tile. Also handles when en passant is actually being done.
        if(chessPiece.src.includes("pawn")){
          let numOfTarget = parseInt(tileId[1]);
          let colorFactor = (player == 1 ? 1 : -1);
          if(Math.abs(numOfStarting - numOfTarget) > 1){ // Prepares a tile for potentially facing en passant
            targetTile.dataset.enpassant = player;
            let skippedTileId = st[0] + (numOfStarting + colorFactor);
            getElement(skippedTileId).dataset.skipped = true;
          }else if(targetTile.dataset.skipped != undefined){ // If the targetTile was skipped, then the actual en passant movement proceeds
            let enPassantId = tileId[0] + numOfStarting;
            let enPassantTile = getElement(enPassantId);
            enPassantTile.removeChild(enPassantTile.children[1])
          }
        // Handles castling logic.
        // If the piece is a king, then the king is being moved & thus castling is no longer an option, so the castle tag is removed from both king & rooks on a team
        }else if(starting.dataset.castle == 1){
          if(chessPiece.src.includes("king")){
            delete starting.dataset.castle;
            delete getElement("a"+numOfStarting).dataset.castle;
            delete getElement("h"+numOfStarting).dataset.castle;
            let letterDistance = Math.abs(letters.indexOf(st[0])-letters.indexOf(tileId[0]));
            if(letterDistance > 1){ // If the king moves 2 tiles from its targeting tile, then it is castling and the castling logic proceeds
              let color = getPieceColor(chessPiece.src);
              let direction = (letters.indexOf(tileId[0]) > letters.indexOf(st[0]) ? -1 : 1);
              let rookLetter = (direction == -1 ? "a" : "h");
              let newRookTileId = letters[letters.indexOf(tileId[0])+direction] + numOfStarting;
              let newRookTile = getElement(newRookTileId);
              let newRookImg = document.createElement("img");
              newRookImg.src = `chessPieces/${color}Pieces/${color.substring(0,1)}_rook.svg`;
              newRookTile.appendChild(newRookImg);
              let currentRookTile = getElement(rookLetter + numOfStarting);
              currentRookTile.removeChild(currentRookTile.children[1]);
            }
          }else{ // Only other pieces with castle data are rooks, so if one moves, it can no longer castle with the king. However, king can still castle with other rook if the other rook has not castled.
            delete starting.dataset.castle;
          }
        } // Regardless of castling or not, any piece that moves to a tile with castle data associated with it captures the rook on that tile, and thus castling for that tile is disabled.
        if(targetTile.dataset.castle == 1){
          delete targetTile.dataset.castle;
        }

        // If movement is successful, then if any king was in check, it is no longer.
        delete playerMessage.dataset.check;

        // Logic to determine if pawn promotion is an option
        pawnPromotionCheck = chessPiece.src.includes("pawn") && (targetTile.innerHTML.includes("1") || targetTile.innerHTML.includes("8"));

      }

      // regardless of what happens, the current tile is deselected and the possible moves are removed
      hidePossibleMoves(possibleMoves);
      
      phase = (pawnPromotionCheck ? 3 : 1); // phase 1 = selecting what piece to move (case 1), phase 3 = pawn promotion
      if(phase == 3){
        targetTile.classList.add("selected");
        let input = getElement("tile");
        input.placeholder = "enter piece";
      }
      // Need to determine which player it is, since if the current player moves, player needs to change; if current player deselected piece, it is still their turn.
      let oppositePlayer = (player == 1 ? 2 : 1);
      let nextPlayer = (successfulMove == true ? oppositePlayer : player);
      playerMessage.innerHTML = (phase == 3 ? `Player ${nextPlayer}: Promote pawn at ${targetTile.innerHTML.substring(0,2)} to queen, bishop, knight, or rook` : `Player ${nextPlayer}: Select a tile with a piece`); // Update player message to either phase 2 selection or phase 3 pawn promotion

      // Determines if the king of the next player is in check after the current player has finished moving
      kingColor = (player == 1 ? "black" : "white");
      kingId = document.querySelector(`img[src="chessPieces/${kingColor}Pieces/${kingColor[0]}_king.svg"]`).parentElement.id;
      let enemyPieces = getAllEnemyMoves(nextPlayer);
      let amount = 0; // reflects how many pieces put a king in check
      for(let i = 0;i < enemyPieces.length;i++){
        if(enemyPieces[i]["moves"].includes(kingId)){
          playerMessage.dataset.check = true;
          amount++;
        }
      }

      // Updated message if the next player is in check
      if(playerMessage.dataset.check){
        playerMessage.innerHTML = `Player ${nextPlayer}: Check - Defend your king`;
      }
      
      // If we're going to the next player, we need to determine if the current move just put the next player in checkmate.
      if(player != nextPlayer){
        allEmpty = true; // If a player has no current moves, that could spell for draw or checkmate
        if(amount < 2){ // if less than 2 piece sput a king in check, then it is possible that an ally piece can get a king out of check with a single move. If not, then no single move from any allied piece can get a king out of check
          // We need to determine the possible moves of the next player, so we get all the moves the next player can make. If the player can make moves (does not include deselection, aka moving a piece to the tile it is currently on), then we can avoid draw/checkmate by having no moves
          let nextPlayerPieces = getAllEnemyMoves(player);
          let currentId, currentImg;
          for(let i = 0; i < nextPlayerPieces.length;i++){
            possibleMoves = [];
            currentId = nextPlayerPieces[i]["tile"];
            currentImg = nextPlayerPieces[i]["piece"];
            possibleMoves = getPossibleMoves(currentId, currentImg);
            if(currentImg.includes("king")){
              possibleMoves = checkKingMoves(nextPlayer,possibleMoves);
              possibleMoves = simulateMovesThatKeepKingSafe(possibleMoves, currentId, nextPlayer, kingId, true);
            }else if(chessPiece != null){
              possibleMoves = simulateMovesThatKeepKingSafe(possibleMoves, currentId, nextPlayer, kingId, false);
            }
            possibleMoves.shift();
            if(possibleMoves.length != 0){
              allEmpty = false;
            }
          }
        }

        let isInsufficient = determineInsufficientPieces(getAllPieceTiles()); // determines if there are insufficient pieces by either side for a checkmate
        // Handles logic for check & checkmate
        if(allEmpty || isInsufficient){
          if(playerMessage.dataset.check){
            oppositePlayer = (player == 1 ? 2 : 1);
            playerMessage.innerHTML = `Checkmate - Player ${player} wins`;
          }else{
            if(isInsufficient){
              playerMessage.innerHTML = `Draw - Insufficient pieces for checkmate`;
            }else{
              playerMessage.innerHTML = `Draw - Player ${oppositePlayer} has no legal moves`;
            }
          }
          phase = 4; // End phase; game over
        }
      }
      break;
    case 3:
      let pawnMessage = playerMessage.innerHTML;
      let pawnTile = pawnMessage.substring(26,28); //Magic numbers are for indexing the playerMessage to get the pawn's coordinate
      starting = getElement(pawnTile);
      chessPiece = starting.querySelector("img");
      let pawnColor = getPieceColor(chessPiece.src);

      let validPieces = ["queen","bishop","knight","rook"];
      if(checkArray(tileId.toLowerCase(), validPieces)){
        chessPiece.src = `chessPieces/${pawnColor}Pieces/${pawnColor[0]}_${tileId}.svg`;
        phase = 1;
        playerMessage.innerHTML = `Player ${player}: Select a tile with a piece`;
        starting.classList.remove("selected");
        let input = getElement("tile");
        input.placeholder = "enter tile position";
      }
    case 4:
      // Game over phase.
      break;
  }

  getElement("tile").value = ""; //Resets text box
  return result;

}













////////////////////////////////////////////////////////////////////

//voice recognition

// function to start the voice recognition
window.onload = function() {
  window.onload = makeBoard();
}

let message = "";

function audio(status) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();
    const onResult = function(event) {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        let res = event.results[i];
        console.log("%cInterim: " + res[0].transcript, "color:green;");
        if (res.isFinal) {
          console.log("%cFinal: " + res[0].transcript, "color:red");
          message = res[0].transcript;
          let pos = document.getElementById("display");
          if (turns < 5) {
            message = convert("position", message);
            if (checkArray(message, list) == true) {
              pos.innerHTML = `Selected Position: <b>${message}</b>`;
            } else {
              pos.innerHTML = `Selected Position: <b>Invalid</b>. Please try again.`;
            }
          } else {
            console.log("before" + message);
            message = convert("piece", message)
            console.log("after" + message);
            let realPiece = "";
            for (let i = 0; i < pieceNames.length; i++) {
              let p = pieceNames[i].ideal;
              if (p == message) {
                realPiece = pieceNames[i].name;
              }
            }
            console.log("message: " + message);
            console.log("real piece" + realPiece);
            if (checkArray(message, ["d", "ah", "cf", "bg"]) == true) {
              pos.innerHTML = `Selected Piece: <b>${realPiece}</b>`;
            } else {
              pos.innerHTML = `Selected Piece: <b>Invalid</b>. Please try again.`;
            }
          }
        }
      }
    };

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);
    recognition.start();
    if (status == false) {
      recognition.stop();
    }
  }

  if (status == false) {
    let pos = document.getElementById("display");
    if (turns < 5) {
      move(message, status);
      pos.innerHTML = `Selected Position: <b>None</b>`;
      let element = document.getElementById(firstPos);
      if (firstPos != secPos) {
        if (checkString("img", element.innerHTML) != true) {
          if (firstSelect == true) {
            if (secPos != "") {
              turns++;
            }
          }
        } else {
          turns++;
        }
      } else {
        turns--;
      }
    } else if (turns >= 5) {
      move(message, status);
      pos.innerHTML = `Selected Position: <b>None</b>`;
      if (turnSave % 2 == 0) {
        turns = turnSave + 2;
      } else {
        turns = turnSave + 1;
      }
    }
  }
  if (turns == 4) {
    turns = 0;
  }
  let directions = document.getElementById("directions");
  if (status == false) {
    if (turns == 0) {
      directions.innerHTML = "<b>WHITE</b> - Press <b>START</b> and state the position of the piece you want to move then press <b>STOP</b>.";
    } else if (turns == 2) {
      directions.innerHTML = "<b>BLACK</b> - Press <b>START and state the position of the piece you want to move then press <b>STOP</b>.";
    } else if (turns == 1) {
      directions.innerHTML = "<b>WHITE</b> - Press <b>START</b> and state the position where you want to move your selected piece to then press <b>STOP</b>.";
    } else if (turns == 3) {
      directions.innerHTML = "<b>BLACK</b> - Press <b>START</b> and state the position where you want to move your selected piece to then press <b>STOP</b>";
    }
  }
}

//When saying certain coordinates, the values are strange. This array of json has those strange values and their ideal values (what they should be).
let specials = [{ "actual": ["1/8", "88"], "ideal": "A8" },
{ "actual": ["87"], "ideal": "A7" },
{ "actual": ["Asics", "a sex", "a 6", "86"], "ideal": "A6" }, { "actual": ["see sex"], "ideal": "C6" }, { "actual": ["esox", "e-cigs", "e-cig"], "ideal": "E6" },
{ "actual": ["define", "Define"], "ideal": "D5" },
{ "actual": ["84"], "ideal": "A4" }, { "actual": ["before"], "ideal": "B4" },
{ "actual": ["AO3", "83"], "ideal": "A3" },
{ "actual": ["82"], "ideal": "A2" },
{ "actual": ["do you want"], "ideal": "D1" }, { "actual": ["you won", "he won"], "ideal": "E1" }, { "actual": ["bb8", "ba"], "ideal": "B8" }];

let pieceNames = [{ "actual": ["Queen", "queen"], "ideal": "d", "name": "Queen" }, { "actual": ["night"], "ideal": "bg", "name": "Knight" }, { "actual": ["Bishop"], "ideal": "cf", "name": "Bishop" }, { "actual": ["Brooke", "rough", "Run", "Ruck"], "ideal": "ah", "name": "Rook" }]

//Will convert a strange value to an ideal value.
function convert(status, m) {
  m = m.replace(" ", "");
  if (status == "position") {
    for (let i = 0; i < specials.length; i++) {
      let list = specials[i].actual;

      for (let x = 0; x < list.length; x++) {

        let word = list[x];
        if (word == m) {
          m = specials[i].ideal;
        }
      }
    }
  } else if (status == "piece") {
    for (let i = 0; i < pieceNames.length; i++) {
      let list = pieceNames[i].actual;

      for (let x = 0; x < list.length; x++) {

        let word = list[x];
        if (word == m) {
          m = pieceNames[i].ideal;
        }
      }
    }
  }
  m = m.toLowerCase();
  m = m.replace(" ", "");
  return m
}

function checkArray(m, a) {
  return a.includes(m);
}

function checkString(sequence, string) {
  for (let i = 0; i < string.length - sequence.length + 1; i++) {
    if (string.slice(i, i + sequence.length) == sequence) {
      return true;
    }
  }
}