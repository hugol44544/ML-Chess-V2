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
      /*
      if (position == "a8") {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_rook.svg"></div>`;
      } else if (position == "e2") {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_pawn.svg"></div>`;
      } else if (position == "d7") {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_pawn.svg"></div>`;
      } else if(position == "e1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_king.svg"></div>`;
      } else if(position == "a1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_bishop.svg"></div>`;
      } else if(position == "c1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_queen.svg"></div>`;
      } else if(position == "a3"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_knight.svg"></div>`;
      } else {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br>${image}</div>`;
      }*/
      if (position == "a1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_rook.svg"></div>`;
      }else if(position == "h1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_rook.svg"></div>`;
      }else if (position == "e1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_king.svg"></div>`;
      }else if (position == "a8"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_rook.svg"></div>`;
      }else if(position == "h8"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_rook.svg"></div>`;
      }else if (position == "e8"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_king.svg"></div>`;
      }else if(position == "c1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_knight.svg"></div>`;
      }else if(position == "f1"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_knight.svg"></div>`;
      }else{
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
      let tile = getElement(id);
      if(tileIsEmpty(id)){
        possibleMoves.push(id);
      }

      // checks if pawn is in its starting row. If yes, it can move 2 spaces forward.
      if (number == startingRow && tileIsEmpty(id)) {
        // 2 spaces forward in opposite direction based on pawn color.
        id = letter + (number + 2 * direction);
        tile = getElement(id);
        if(tileIsEmpty(id)){
          possibleMoves.push(id);
        }
      }

      // checks if pawn can capture a piece diagonally.
      // left & right checks are for ensuring the letters array is not indexed out of range; prevents errors
      let leftCheck = letters.indexOf(letter)+1 < letters.length;
      let rightCheck = letters.indexOf(letter)-1 > -1;
      let checks = [leftCheck,rightCheck];
      let factor = 0; // Factor determines the direction (up or down) we are looking at from the pawn (due to the pawns' different senses of "forward" depending on its color)
      for(let i = 0;i < checks.length;i++){
        factor = (i == 0 ? 1 : -1);
        if(checks[i]){
          id = letters[letters.indexOf(letter)+factor] + (number + 1 * direction);
          if(tileIsEmpty(id) == false){ // Checks if there is a piece on the tiles diagonal to the pawn
            let currentTile = getElement(starting);
            let currentPiece = currentTile.querySelector("img");
            tile = getElement(id);
            let targetPiece = tile.querySelector("img");
            if(getPieceColor(targetPiece.src) != getPieceColor(currentPiece.src)){ // Checks if a piece on a diagonal tile is an enemy piece, in which case diagonal movement is possible
              possibleMoves.push(id);
            }
          }
        }
      }

      // Checks if en passant is an option
      // leftCheck & rightCheck are used again to determine if the adjacent tiles from a pawn exist
      // the dataset enpassant attribute is associated with a tile that a pawn has just moved 2 tiles to from its starting position. This is added in phase 2 of the movement method, and after the next player's turn, the data is removed in move phase 1.
      leftCheck = letters.indexOf(letter)+1 < letters.length;
      rightCheck = letters.indexOf(letter)-1 > -1;
      checks = [leftCheck,rightCheck];
      let enPassantId, enPassantTile;
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
  let player = (playerMessage.innerHTML.includes("1") ? 1 : 2);
  let possibleMoves;
  switch (p) {
    // selection phase of movement method (phase 1); user selects a tile to move a piece from.
    case 1:
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

          // method that gets possible moves & method that shows possible moves is called here.
          possibleMoves = getPossibleMoves(starting.id, chessPiece.src);
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
      let pawnPromotionCheck = false;

      // get id of tile the user wants to move the selected piece to. If it is invalid, 2nd phase of move method fails & user must try again.
      starting = getElement(st);
      chessPiece = starting.querySelector("img"); // gets img element of tile and uses that as the piece.
      possibleMoves = getPossibleMoves(starting.id, chessPiece.src);
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

        //Next 2 block blocks check for special moves en passant & king castling. For both, we need the starting tile's number.
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

        // Gets the next player who moves; if the move actually moves a piece, then the player who will move next is not the player currently moving
        player = (playerMessage.innerHTML.includes("1") ? 2 : 1);

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
      playerMessage.innerHTML = (phase == 3 ? `Player ${player}: Promote pawn at ${targetTile.innerHTML.substring(0,2)} to queen, bishop, knight, or rook` : `Player ${player}: Select a tile with a piece`); // Update player message to either phase 2 selection or phase 3 pawn promotion
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