let pieces = ["p",
  "ah",
  "bg",
  "cf",
  "d",
  "e"];
let turns = 0;
let turnSave = 0;

let whiteCastle = true;
let blackCastle = true;

/*making the board*/
let list = [];
let letters = "hgfedcba";

let firstSelect = true;
let img = "";
let firstPos = ""; /*chooseing piece initial location*/
let secPos = ""; /*selecting piece final location*/
let saveColor = "";

function makeBoard() {
  let board = document.getElementById("board");
  let build = "";
  let colornum = 0
  for (let i = 8; i > 0; i--) {
    let image = "";
    build += `<div class = "row">`;
    for (let n = 8; n > 0; n--) {
      colornum = i % 2 + n % 2; /*light/dark color*/
      if (i == 8) {
        for (let x = 0; x < pieces.length; x++) {
          if (pieces[x].includes(letters[n - 1])) {
            image = `<img class = "black" src = "Pieces/${pieces[x]}.png">`;
          }
        }
      } else if (i == 7) { /*black pawn*/
        image = `<img class = "black" src = "Pieces/${pieces[0]}.png">`;
      } else if (i == 2) { /*white pawn*/
        image = `<img src = "Pieces/${pieces[0]}.png">`;
      } else if (i == 1) { /*1 & 8*/
        for (let x = 0; x < pieces.length; x++) {
          if (pieces[x].includes(letters[n - 1])) {
            image = `<img src = "Pieces/${pieces[x]}.png">`;
          }
        }
      }

      let position = letters[n - 1] + i; /*assigning initial location labels*/
      build += `<div class = "color${colornum} square" id = "${position}" onClick = "move(this.id)">${position}<div class = "innerdiv">${image}</div></div>`;
      colornum = 0;
      list.push(position);

    }
    build += `</div>`;
  }
  board.innerHTML = build;
  document.getElementById("directions").innerHTML = `<b>WHITE</b> - Press <b>START</b> and state the position of the piece you want to move then press <b>STOP</b>`;
  firstSelect = true;
  firstPos = "";
  secPos = "";
  img = "";
  saveColor = "";
  turns = 0;
  turnSave = 0;
}

/**/
function getId(id) { /*gets id of elements*/
  return document.getElementById(id);
}

function move(i, s) {
  let directions = document.getElementById("directions");
  let board = getId("board");
  let innerboard = board.innerHTML;
  let element = getId(i);
  if (firstSelect == true && turns < 5) { /*select if div has piece*/
    firstPos = element.innerHTML.slice(0, 2); /*split label into letter and number*/
    let box = element.innerHTML; /*box = div selected (firstPos)*/
    for (let x = 0; x < box.length - 1; x++) { /*loop: receives img element*/
      if (box.slice(x, x + 2) == "<i") {
        img = box.slice(x, box.length - 6);
        firstSelect = false;
      }
    }

    /*onclick div = light up*/
    if (s == false) {
      let lowerCount = 0;
      let upperCount = 1;
      let innerboardpiece = "";
      let coord1, coord2 = 0;
      for (let x = 0; x < innerboard.length - 1; x++) { /*relooping board elements*/
        if (innerboard.slice(x, x + 3) == firstPos + `"`) {
          coord1 = x;
          coord2 = x + 3;
          while (innerboard[coord1 - lowerCount] != "<") {
            lowerCount++;
          } while (innerboard.slice(coord2 + upperCount, coord2 + upperCount + 12) != "</div></div>") {
            upperCount++;
          }
          innerboardpiece = innerboard.slice(coord1 - lowerCount, coord2 + upperCount + 12);
        }
      }

      for (let i = 0; i < innerboardpiece.length - 1; i++) {
        if (innerboardpiece.slice(i, i + 5) == "color") {
          saveColor = innerboardpiece[i + 5];
        }
      }

      let selectable = false;
      for (let x = 0; x < innerboardpiece.length - 1; x++) {
        if (innerboardpiece.slice(x, x + 2) == "<i") {
          selectable = true;
          x = innerboardpiece.length - 1;
        }
      }

      let newboardpiece = "";
      if (selectable == true) {
        newboardpiece = innerboardpiece.slice(0, 12) + "selected" + innerboardpiece.slice(18, innerboardpiece.length)
        board.innerHTML = innerboard.slice(0, coord1 - lowerCount) + newboardpiece + innerboard.slice(coord2 + upperCount + 12, innerboard.length);
      }
    }

    /**/
  } else {

    if (checkArray(message, list) == true) {
      secPos = element.innerHTML.slice(0, 2);
    }

    if (checkString("8", secPos) == true || checkString("1", secPos) == true) {
      if (checkString("p.png", img) == true) {
        if (turns < 5) {
          turnSave = turns;
        }
        let directions = document.getElementById("directions");
        let pos = document.getElementById("display");
        if (checkString("black", img) != true) {
          directions.innerHTML = "<b>White</b> - Your pawn has made it to the opposite end of the board. Click <b>START</b> and speak the name of the piece you want to change your pawn to from the following options then press <b>STOP</b>.<br><b>ROOK</b> - <b>KNIGHT</b> - <b>BISHOP</b> - <b>QUEEN</b>";
        } else {
          directions.innerHTML = "<b>Black</b> - Your pawn has made it to the opposite end of the board. Click <b>START</b> and speak the name of the piece you want to change your pawn to from the following options then press <b>STOP</b>.<br><b>ROOK</b> - <b>KNIGHT</b> - <b>BISHOP</b> - <b>QUEEN</b>";
        }
        if (turns < 5) {
          turns = 5;
          document.getElementById(secPos).className = "selected square";
        }
        pos.innerHTML = "Piece Selected: <b>None</b>";
        if (checkArray(i, ["d", "ah", "bg", "cf"]) == true) {
          if (checkString("black", document.getElementById(secPos).innerHTML) == true) {
            document.getElementById(secPos).innerHTML = `${secPos}<div class = "innerdiv"><img class = "black" src = "Pieces/${i}.png"></div>`;
          } else {
            document.getElementById(secPos).innerHTML = `${secPos}<div class = "innerdiv"><img src = "Pieces/${i}.png"></div>`
          }
        }
      }
    }

    if (turns < 6) {
      let rookId = "";
      let kingId = "";
      let castle = false;
      let success = false;

      if (firstPos == "e1" && (secPos == "a1" || secPos == "h1")) {
        castle = true;
        if (whiteCastle == true) {
          let first = document.getElementById(firstPos);
          if (checkString("e.png", first.innerHTML) == true && checkString("ah.png", element.innerHTML)) {
            if ((checkString("bg", document.getElementById("b1").innerHTML) != true && checkString("cf", document.getElementById("c1").innerHTML) != true || checkString("bg", document.getElementById("g1").innerHTML) != true && checkString("cf", document.getElementById("f1").innerHTML) != true) && checkString("d.png", document.getElementById("d1").innerHTML) != true) {
              if (checkString("a", secPos) == true) {
                rookId = "d1";
                kingId = "c1";
              } else if (checkString("h", secPos) == true) {
                rookId = "f1";
                kingId = "g1";
              }
              document.getElementById(rookId).innerHTML = `${rookId}<div class = "innerdiv"><img src = "Pieces/ah.png"></div>`;
              document.getElementById(kingId).innerHTML = `${kingId}<div class = "innerdiv"><img src = "Pieces/e.png"></div>`;
              element.innerHTML = `${secPos}<div class = "innerdiv"></div>`;
              success = true;
              whiteCastle = false;
            }
          }
        }
      } else if (firstPos == "e8" && (secPos == "a8" || secPos == "h8")) {
        castle = true;
        if (blackCastle == true) {
          let first = document.getElementById(firstPos);
          if (checkString("e.png", first.innerHTML) == true && checkString("ah.png", element.innerHTML)) {
            if ((checkString("bg", document.getElementById("b8").innerHTML) != true && checkString("cf", document.getElementById("c8").innerHTML) != true || checkString("bg", document.getElementById("g8").innerHTML) != true && checkString("cf", document.getElementById("f8").innerHTML) != true) && checkString("d.png", document.getElementById("d8").innerHTML) != true) {
              if (checkString("a", secPos) == true) {
                rookId = "d8";
                kingId = "c8";
              } else if (checkString("h", secPos) == true) {
                rookId = "f8";
                kingId = "g8";
              }
              document.getElementById(rookId).innerHTML = `${rookId}<div class = "innerdiv"><img class = "black" src = "Pieces/ah.png"></div>`;
              document.getElementById(kingId).innerHTML = `${kingId}<div class = "innerdiv"><img class = "black" src = "Pieces/e.png"></div>`;
              element.innerHTML = `${secPos}<div class = "innerdiv"></div>`;
              success = true;
              blackCastle = false;
            }
          }
        }
      } else {
        element.innerHTML = `${secPos}<div class = "innerdiv">${img}</div>`;
      }
      firstSelect = true;
      let fpos = document.getElementById(firstPos);
      if (firstPos == secPos) {
        fpos.innerHTML = `${firstPos}<div class = "innerdiv">${img}</div>`;
        board = getId("board");
        innerboard = board.innerHTML;
        fpos = document.getElementById(firstPos);

        let lowerCount = 0;
        let upperCount = 1;
        let innerboardpiece = "";
        let coord1, coord2 = 0;
        for (let x = 0; x < innerboard.length - 1; x++) {
          if (innerboard.slice(x, x + 3) == firstPos + `"`) {
            coord1 = x;
            coord2 = x + 3;
            while (innerboard[coord1 - lowerCount] != "<") {
              lowerCount++;
            } while (innerboard.slice(coord2 + upperCount, coord2 + upperCount + 12) != "</div></div>") {
              upperCount++;
            }
            innerboardpiece = innerboard.slice(coord1 - lowerCount, coord2 + upperCount + 12);
          }
        }
        /*assigning new piece label*/
        let newboardpiece = "";
        for (let i = 0; i < innerboardpiece.length - 8; i++) {
          if (innerboardpiece.slice(i, i + 8) == "selected") {
            newboardpiece = `${innerboardpiece.slice(0, i)}color${saveColor} ${innerboardpiece.slice(i + 9, innerboardpiece.length)}`;
          }
          board.innerHTML = innerboard.slice(0, coord1 - lowerCount) + newboardpiece + innerboard.slice(coord2 + upperCount + 12, innerboard.length);
        }
        firstPos = "";
        secPos = "";
      } else {
        fpos.innerHTML = `${firstPos}<div class = "innerdiv"></div>`;
      }

      if (s == false) {
        board = getId("board");
        innerboard = board.innerHTML;
        fpos = document.getElementById(firstPos);
        let lowerCount = 0;
        let upperCount = 1;
        let innerboardpiece = "";
        let coord1, coord2 = 0;

        for (let x = 0; x < innerboard.length - 1; x++) {
          if (innerboard.slice(x, x + 3) == firstPos + `"`) {
            coord1 = x;
            coord2 = x + 3;
            while (innerboard[coord1 - lowerCount] != "<") {
              lowerCount++;
            } while (innerboard.slice(coord2 + upperCount, coord2 + upperCount + 12) != "</div></div>") {
              upperCount++;
            }
            innerboardpiece = innerboard.slice(coord1 - lowerCount, coord2 + upperCount + 12);
          }
        }

        let newboardpiece = "";
        for (let i = 0; i < innerboardpiece.length - 8; i++) {
          if (innerboardpiece.slice(i, i + 8) == "selected") {
            newboardpiece = `${innerboardpiece.slice(0, i)}color${saveColor} ${innerboardpiece.slice(i + 9, innerboardpiece.length)}`;
          }
          board.innerHTML = innerboard.slice(0, coord1 - lowerCount) + newboardpiece + innerboard.slice(coord2 + upperCount + 12, innerboard.length);
        }
      }
      if (castle == true) {
        turns -= 2;
        if (success == false) {
          document.getElementById(firstPos).innerHTML = `${firstPos}<div class = "innerdiv">${img}</div>`;
        }
      }
    }
    if (turns == 5) {
      turns++;
    }
  }
}


/*voice recognition*/
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