// each chess board column is assigned a letter. array is listed in reverse order, otherwise board is created horizontally flipped.
let letters = ["h", "g", "f", "e", "d", "c", "b", "a"];
// arrays to hold the images of the pieces.
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
  let tile = document.getElementById(tileId);
  img = tile.querySelector("img");
  return img == null;
}

// determines whether chess piece is white or black.
function getPieceColor(piece) {
  // if piece contains "w_", then it is white. Otherwise, it is black.
  // piece will be an image's "src" attribute.
  let color = "white";
  if (piece.indexOf("w_") == -1){
    color = "black";
  }
  return color;
}

// Function used by horizontal, vertical, and diagonal movement methods.
// Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
function addTileDetermination(pieceSelected, pieceFound, pieceFoundId, pieceFoundTile, possibleMoves){
  if(pieceFound != null){
    if(getPieceColor(pieceSelected) != getPieceColor(pieceFound.src)){
      possibleMoves.push(pieceFoundId);
      pieceFoundTile.classList.add("possible");
    }
  }
  return possibleMoves;
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
      if (position == "e4") {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_rook.svg"></div>`;
      } else if (position == "b2") {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_pawn.svg"></div>`;
      } else if (position == "b7") {
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_pawn.svg"></div>`;
      } else if(position == "g5"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_king.svg"></div>`;
      } else if(position == "e5"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/blackPieces/b_bishop.svg"></div>`;
      } else if(position == "c5"){
        build += `<div class = "color${colornum} square" id = "${position}">${position}<br><img src = "chessPieces/whitePieces/w_queen.svg"></div>`;
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
}

// method that gets all the tiles vertically from a starting point. Only does so in one direction (up or down)
// startPosition: String, represents the tile coordinate the piece being selected is on
// loopStop: int, can only be 0 or 9 since board tiles are numbered from 1 to 8 vertically, so if we reach 0 or 9, we're off the board & the loop should end
// accumulatorValue: int, can only be 1 or -1 to get increasing and decreasing board tiles; heavily related to loopStop
// piece: String, for determining if a potential moves tile has a piece on it that can be taken
function verticalMovement(startPosition, loopStop, accumulatorValue, piece) {
  let possibleMoves = [], tile, id;

  // split the label of tile into its letter and number.
  let letter = startPosition[0];
  let number = parseInt(startPosition[1]);

  // accumulator that will determine when to end the loop.
  let count = number + accumulatorValue;

  // loop to gather the id of tiles that can be moved to
  while (count != loopStop) {
    id = letter + count;
    tile = document.getElementById(id);

    // if there is an img in the tile we are checking as a potential move, there is a piece there & the loop ends prematurely.
    if(tileIsEmpty(id) == false){
      break;
    }

    // adding current tile being iterated through to the possibleMoves array. Also adds a new class to that tile, changing its color to show it is a potential move.
    possibleMoves.push(id);
    tile.classList.add("possible");

    count += accumulatorValue;

  }

  // Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
  return addTileDetermination(piece, img, id, tile, possibleMoves)
  
}

// method that gets all the tiles horizontally from a starting point. Only does so in one direction (left or right)
// startPosition: String, represents the tile coordinate the piece being selected is on
// loopStop: int, can only be -1 or 8 since we work our way through the global letters array going either towards index 0 or index 7, so we need to stop at -1 or 8 to avoid errors.
// accumulatorValue: int, can only be 1 or -1 to go forward or backward through the global letters array; heavily related to loopStop
// piece: String, for determining if a potential moves tile has a piece on it that can be taken
function horizontalMovement(startPosition, loopStop, accumulatorValue, piece){
  let possibleMoves = [], tile, id;
  
  // split the label of tile into its letter and number. letterPosition is for indexing the global letters array.
  let letter = startPosition[0];
  let letterPosition = letters.indexOf(letter);
  let number = parseInt(startPosition[1]);

  // count variable keeps track of what letter we are currently at.
  let count = letterPosition + accumulatorValue;

  // loop that gathers the id of all potential tiles that can be moved to
  while (count != loopStop) {
    id = letters[count] + number;
    tile = document.getElementById(id);

    // if there is an img in the tile we are checking as a potential move, there is a piece there & the loop ends prematurely.
    if(tileIsEmpty(id) == false){
      break;
    }

    // adding current tile being iterated through to the possibleMoves array. Also adds a new class to that tile, changing its color to show it is a potential move.
    possibleMoves.push(id);
    tile.classList.add("possible");

    count += accumulatorValue;

  }

  // Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
  return addTileDetermination(piece, img, id, tile, possibleMoves)
  
}

// method that gets all the tiles diagonally in one direction from a starting point.
// startPosition: String, represents the tile coordinate the piece being selected is on
// loopStopLetter: int, can only be -1 or 9 to work with the global letters array to avoid allowing tiles that are not on the board to be considered as potential tiles to move to (since the array is from 0 to 8 in index values)
// loopStopNumber: int, can only be 0 or 9 to avoid allowing tiles that are not on the board to be considered as potential tiles to move to (since board is from 1-8, inclusive)
// accumulatorValueLetter: int, can only be 1 or -1 to go forward or backward through the global letters array; heavily related to loopStopLetter
// accumulatorValueNumber: int, can only be 1 or -1 to get increasing and decreasing board tiles; heavily related to loopStopNumber
// piece: String, for determining if a potential moves tile has a piece on it that can be taken
function diagonalMovement(startPosition, loopStopLetter, loopStopNumber, accumulatorValueLetter, accumulatorValueNumber, piece){
  let possibleMoves = [], tile, id;

  // split the label of tile into its letter and number. letterPosition is for indexing the global letters array.
  let letter = startPosition[0];
  let letterPosition = letters.indexOf(letter);
  let numberAccumulator = parseInt(startPosition[1]) + accumulatorValueNumber;
  let letterAccumulator = letterPosition + accumulatorValueLetter;

  // important to note that since working with letters and numbers means we have different loop stopping values, we need to check both to prevent errors.
  while (letterAccumulator != loopStopLetter && numberAccumulator != loopStopNumber) {
    id = letters[letterAccumulator] + numberAccumulator;
    tile = document.getElementById(id);

    // if there is an img in the tile we are checking as a potential move, there is a piece there & the loop ends prematurely.
    if(tileIsEmpty(id) == false){
      break;
    }

    // adding current tile being iterated through to the possibleMoves array. Also adds a new class to that tile, changing its color to show it is a potential move.
    possibleMoves.push(id);
    tile.classList.add("possible");

    letterAccumulator += accumulatorValueLetter;
    numberAccumulator += accumulatorValueNumber;

  }
  
  // Returns the possibleMoves array, adding a tile that we found a piece on if that piece is an enemy
  return addTileDetermination(piece, img, id, tile, possibleMoves)
}

////////////////////////////////////////////////////////////////////////////////

// method that gets all the possible moves. Highlights each, and returns an array of all the possible moves (including the selected tile).
function getPossibleMoves(starting, piece, p) {
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
          let tile = document.getElementById(newSquare);
          let img = tile.querySelector("img");

          // checks if tile already has a piece on it. If yes, remove that label from possible moves.
          if (img == null || img.src.indexOf("_") - 1 != piece.indexOf("_") - 1) {
            tile.classList.add("possible");
            possibleMoves.push(newSquare);
          }
        }
      }
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

      // NOTE: Currently, if a pawn is in the top or bottom row, pawn movement fails because the tiles it should move to do not exist. This will be handled when pawn promotion is developed.
      let id = letter + (number + 1 * direction);
      let tile = document.getElementById(id);
      if(tileIsEmpty(id)){
        tile.classList.add("possible");
        possibleMoves.push(id);
      }

      // checks if pawn is in its starting row. If yes, it can move 2 spaces forward.
      if (number == startingRow && tileIsEmpty(id)) {
        // 2 spaces forward in opposite direction based on pawn color.
        id = letter + (number + 2 * direction);
        tile = document.getElementById(id);
        if(tileIsEmpty(id)){
          tile.classList.add("possible");
          possibleMoves.push(id);
        }
      }

      // checks if pawn can capture a piece diagonally.
      let leftCheck = letters.indexOf(letter)+1 < letters.length;
      let rightCheck = letters.indexOf(letter)-1 > -1;
      let checks = [leftCheck,rightCheck];
      let factor = 0;
      for(let i = 0;i < checks.length;i++){
        factor = (i == 0 ? 1 : -1);
        console.log(checks[i]);
        if(checks[i]){
          console.log(letters[letters.indexOf(letter)+factor])
          console.log((number + 1 * direction));
          id = letters[letters.indexOf(letter)+factor] + (number + 1 * direction);
          console.log(id);
          if(tileIsEmpty(id) == false){
            let currentTile = document.getElementById(starting);
            let currentPiece = currentTile.querySelector("img");
            tile = document.getElementById(id);
            let targetPiece = tile.querySelector("img");
            if(getPieceColor(targetPiece.src) != getPieceColor(currentPiece.src)){
              tile.classList.add("possible");
              possibleMoves.push(id);
            }
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
  let result, tileId, starting, chessPiece;

  switch (p) {
    // selection phase of movement method (phase 1); user selects a tile to move a piece from.
    case 1:
      // get id of tile of piece user wants to move. If it is invalid, 1st phase of move method fails & user must try again.
      tileId = getElement("tile").value;
      if (checkArray(tileId, list) == false) { // if tileId is not in list, then it is invalid.
        break;
      }

      // Tiles with img elements have pieces, so if chessPiece is not null, the move operation proceeds with its selection phase.
      starting = getElement(tileId);
      chessPiece = starting.querySelector("img"); // gets img element of tile and uses that as the piece.

      if (chessPiece != null) {
        starting.classList.add("selected");
        result = tileId;
        phase = 2; // phase 2 = selecting where to move that piece and moves it there.
        // method that shows possible tile movements is called here.
        getPossibleMoves(starting.id, chessPiece.src);
      }
      break;

    // actually moves the chess piece to its new tile; movement phase of move method.
    case 2:
      // get id of tile the user wants to move the selected piece to. If it is invalid, 2nd phase of move method fails & user must try again.
      tileId = getElement("tile").value;
      starting = getElement(st);
      chessPiece = starting.querySelector("img");
      let possibleMoves = getPossibleMoves(starting.id, chessPiece.src, p);

      if (checkArray(tileId, possibleMoves) == false) {
        result = st;
        break;
      }

      // checks if the starting tile is different from the target tile. If different, that means the user is trying to move a piece to a new tile, in which case the movement method completes. If the two tiles are the same, then you are trying to move a piece to the tile it is already on, in which case the piece is deselected. The user does not lose a turn.
      if (tileId != st) {
        let targetTile = getElement(tileId);

        // If there is a piece (img element) on the target tile, the user eliminates that piece by moving to the target tile.
        if(targetTile.querySelector("img") != null){
          targetTile.removeChild(targetTile.children[1]);
        }
        starting.removeChild(chessPiece);
        targetTile.appendChild(chessPiece);
      }

      // regardless of what happens, the originally selected tile is deselected.
      starting.classList.remove("selected");
      for (let i = 0; i < possibleMoves.length; i++) {
        let tile = getElement(possibleMoves[i]);
        tile.classList.remove("possible");
      }
      phase = 1; // phase 1 = selecting what piece to move
      break;
  }

  getElement("tile").value = "";
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