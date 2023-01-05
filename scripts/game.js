let exitButton = document.getElementById("exit-icon"),
  exitWindow = document.querySelector(".exit-window-holder"),
  noButton = document.querySelector(".no-button"),
  resultInfo = document.querySelector(".result-info-holder"),
  replayButton = resultInfo.querySelector(".replay-button"),
  gameStatus = resultInfo.querySelector(".game-status"),
  playersMove = document.querySelectorAll(".user-turn"),
  playersName = document.querySelectorAll(".player-name"),
  gameLevel = document.querySelector(".game-level"),
  playersScore = document.querySelectorAll(".player-score"),
  choosenCharacter = document.querySelectorAll(".choosen-character"),
  playerAvatar = document.querySelector(".user-avatar-1"),
  opponentAvatar = document.querySelector(".user-avatar-2");

let xIcon = `<img src="../assets/x-icon.png" alt="x-icon">`,
  oIcon = `<img src="../assets/o-icon.png" alt="o-icon">`,
  firstPlayer;

let gamePlayMode = [],
  scores = {},
  cells = [],
  winState = [],
  winMoves,
  gameActive = true,
  gameBoard = true,
  gameResult,
  opponentWinner,
  aiPlayer,
  humanPlayer,
  player1Score = (player2Score = 0);

let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let matchCells = document.getElementsByClassName("cell");
let gameState = ["", "", "", "", "", "", "", "", ""];

exitButton.addEventListener("click", () => {
  exitWindow.classList.remove("inactive");
});

noButton.addEventListener("click", () => {
  exitWindow.classList.add("inactive");
});

let userChoiceForCharacter = sessionStorage.getItem("userChoice"),
  userChoiceForPlaying = sessionStorage.getItem("choiceToPlay"),
  userChoiceForOpponent = sessionStorage.getItem("opponentChoice"),
  difficultyChoice = sessionStorage.getItem("difficulty-choice"),
  accountHolder = sessionStorage.getItem("accountHolder"),
  timingMessage = sessionStorage.getItem("timer"),
  opponentPlayerName = sessionStorage.getItem("opponentName");

if (userChoiceForCharacter === "x") {
  choosenCharacter[0].innerHTML = xIcon;
  choosenCharacter[1].innerHTML = oIcon;
} else {
  choosenCharacter[0].innerHTML = oIcon;
  choosenCharacter[1].innerHTML = xIcon;
}

if (userChoiceForPlaying === "First") {
  playersMove[0].classList.remove("inactive");
  firstPlayer = "left-player";
} else {
  playersMove[1].classList.remove("inactive");
  firstPlayer = "right-player";
}

playerAvatar.innerText = accountHolder.charAt(0);
if (userChoiceForOpponent === "playerVsCpu") {
  gameLevel.parentNode.classList.remove("inactive");
  playersName[1].innerHTML = "PC";
  opponentAvatar.innerText = "P";
} else {
  manualGamePlay();
  playersName[1].innerHTML = opponentPlayerName;
  opponentAvatar.innerText = accountHolder.charAt(0);
}

if (userChoiceForOpponent === "playerVsCpu") {
  if (difficultyChoice === "Easy") {
    onStartGame();
    gameLevel.style = "color:green";
    gameLevel.innerHTML = "Easy";
  } else if (difficultyChoice === "Medium") {
    onStartGame();
    gameLevel.style = "color:orange";
    gameLevel.innerHTML = "Medium";
  } else {
    onStartGame();
    gameLevel.style = "color: purple";
    gameLevel.innerHTML = "Impossible to Win";
  }
}

let playerEasyScore = 0,
  playerMediumScore = 0,
  playerHardScore = 0;

let opponentEasyScore = 0,
  opponentMediumScore = 0,
  opponentHardScore = 0;

humanPlayer = choosenCharacter[0].innerHTML;
aiPlayer = humanPlayer === xIcon ? oIcon : xIcon;

// timer
let gameTime,
  seconds = 0,
  minutes = 0;

function gameTiming() {
  ++seconds;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  gameTime =
    minutes.toString().padStart(2, 0) + ":" + seconds.toString().padStart(2, 0);
  document.querySelector(".timer").textContent = gameTime;
}
let timer = setInterval(gameTiming, 1000);

// Game begins - Manual Mode
let currentPlayer =
  firstPlayer === "left-player"
    ? choosenCharacter[0].innerHTML
    : choosenCharacter[1].innerHTML;

let starterPlayer =
  userChoiceForPlaying === "First"
    ? choosenCharacter[0].innerHTML
    : choosenCharacter[1].innerHTML;
let winBoxes = [];
function manualGamePlay() {
  let winningMessage = () => {
    clearInterval(timer);
    gameStatus.innerHTML = "Player " + currentPlayer + " has won !";
    resultInfo.classList.remove("inactive");
  };

  let drawMessage = () => {
    clearInterval(timer);
    gameStatus.innerHTML = "Game ended in a Draw!";
    resultInfo.classList.remove("inactive");
  };

  let changeCurrentPlayerTurn = () => {
    for (let i = 0; i < 2; i++) {
      if (playersMove[i].classList.contains("inactive")) {
        playersMove[i].classList.remove("inactive");
        if (i == 0) playersMove[1].classList.add("inactive");
        else playersMove[0].classList.add("inactive");
        break;
      }
    }
  };

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    cells[clickedCellIndex] = clickedCell;
    gamePlayMode.push(clickedCellIndex + " " + currentPlayer);
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.style = "background-color: white; cursor:not-allowed";
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === xIcon ? oIcon : xIcon;
    changeCurrentPlayerTurn();
  }

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      let winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        winState = winCondition;
        cells[winCondition[0]].style = "background-color: rgb(13, 222, 180)";
        cells[winCondition[1]].style = "background-color: rgb(13, 222, 180)";
        cells[winCondition[2]].style = "background-color: rgb(13, 222, 180)";

        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      if (currentPlayer === choosenCharacter[0].innerHTML) {
        player1Score++;
        gameResult = "Won";
      } else {
        player2Score++;
        gameResult = "Lost";
      }

      choosenCharacter[0].innerHTML === currentPlayer
        ? (playersScore[0].innerHTML = player1Score)
        : (playersScore[1].innerHTML = player2Score);
      winningMessage();
      gameActive = false;

      let gameHistory = {
        player: accountHolder,
        opponentGamerName: opponentPlayerName,
        matchResult: gameResult,
        difficulty: "--",
        timeTaken: gameTime,
        gameState: gamePlayMode,
        player1: starterPlayer,
        player2: starterPlayer === xIcon ? oIcon : xIcon,
        winState: winState,
      };

      sessionStorage.setItem("gameReport", JSON.stringify(gameHistory));
      appendGameHistory(JSON.stringify(gameHistory));

      return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      gameResult = "Draw";
      drawMessage();
      gameActive = false;

      let gameHistory = {
        player: accountHolder,
        opponentGamerName: opponentPlayerName,
        matchResult: gameResult,
        difficulty: "--",
        timeTaken: gameTime,
        gameState: gamePlayMode,
        player1: starterPlayer,
        player2: starterPlayer === xIcon ? oIcon : xIcon,
        winState: winState,
      };
      sessionStorage.setItem("gameReport", JSON.stringify(gameHistory));
      appendGameHistory(JSON.stringify(gameHistory));

      return;
    }

    handlePlayerChange();
  }

  function handleCellClick(clickedCellEvent) {
    let clickedCell = clickedCellEvent.target;
    let clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-cell-index")
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

// Hard Mode begins
function getMatchResult() {
  let gameHistory = {
    winState: winMoves,
    player: accountHolder,
    opponentGamerName: "PC",
    matchResult: gameResult,
    difficulty: difficultyChoice.split(" ")[0],
    timeTaken: gameTime,
    gameState: gamePlayMode,
    player1: starterPlayer,
    player2: starterPlayer === xIcon ? oIcon : xIcon,
  };
  sessionStorage.setItem("gameReport", JSON.stringify(gameHistory));
  appendGameHistory(JSON.stringify(gameHistory));
}

function onStartGame() {
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < matchCells.length; i++) {
    matchCells[i].style.removeProperty("background-color");
    matchCells[i].addEventListener("click", onTurnClick, false);
  }
  checkforPlaying();
}

function checkforPlaying() {
  if (userChoiceForPlaying === "Second") {
    let returnedIndex = emptySquares();
    onTurn(returnedIndex[4], choosenCharacter[1].innerHTML);
  }
}

function onTurnClick(e) {
  let clickedCell = e.target;
  let clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

  if (gameState[clickedCellIndex] !== "") {
    return;
  }

  const { id: squareId } = e.target;
  if (gameBoard) winningObject = onTurn(squareId, humanPlayer);
  if (winningObject) {
    gameResult = "Won";
    playersScore[0].innerHTML = ++player1Score;
    hardeModeWinningMessage(winningObject);
    getMatchResult();
  } else if (onCheckGameTie()) {
    gameResult = "Draw";
    hardeModeDrawMessage();
    getMatchResult();
  } else {
    setTimeout(() => {
      opponentWinner = onTurn(botPicksSpot(), aiPlayer);
    }, 1200);

    if (opponentWinner) {
      gameResult = "Lost";
      playersScore[1].innerHTML = ++player2Score;
      hardeModeWinningMessage(opponentWinner);
      getMatchResult();
    } else if (onCheckGameTie()) {
      gameResult = "Draw";
      hardeModeDrawMessage();
      getMatchResult();
    }
  }
}
function randomSpot(winningTile) {
  let emptyTiles = origBoard.filter((item) => typeof item === "number");
  for (let i = 0; i < emptyTiles.length; i++) {
    if (emptyTiles[i] !== winningTile) {
      return emptyTiles[i];
    }
  }
}

function onTurn(squareId, player) {
  if (player === aiPlayer || player === choosenCharacter[1].innerHTML) {
    playersMove[0].classList.remove("inactive");
    playersMove[1].classList.add("inactive");
  } else {
    playersMove[1].classList.remove("inactive");
    playersMove[0].classList.add("inactive");
  }

  origBoard[squareId] = player;
  gamePlayMode.push(squareId + " " + player);
  if (gameBoard) {
    let isGameWon = onCheckWin(origBoard, player);
    if (difficultyChoice === "Easy") {
      if (player === aiPlayer && isGameWon) {
        origBoard[squareId] = squareId;
        let choosenSpot = randomSpot(squareId);
        onTurn(choosenSpot, aiPlayer);
      } else {
        document.getElementById(squareId).innerHTML = player;
        document.getElementById(squareId).style =
          "background-color: white;cursor: not-allowed";
        gameState.push(document.getElementById(squareId) + " " + player);
        return isGameWon;
      }
    } else {
      document.getElementById(squareId).innerHTML = player;
      document.getElementById(squareId).style =
        "background-color: white;cursor: not-allowed";
      gameState.push(document.getElementById(squareId) + " " + player);
      return isGameWon;
    }
  }
}

function onCheckWin(board, player) {
  let plays = board.reduce((a, e, i) => {
    return e === player ? a.concat(i) : a;
  }, []);
  let gameWon = false;
  for (let [index, win] of winningConditions.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player,
      };
      break;
    }
  }
  return gameWon;
}

function hardeModeWinningMessage({ index, player }) {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style = "cursor:not-allowed";
    cell.removeEventListener("click", onTurnClick);
  });

  winMoves = winningConditions[index];
  gameBoard = false;
  clearInterval(timer);
  for (let i of winningConditions[index]) {
    document.getElementById(i).style.backgroundColor = "rgb(13, 222, 180)";
  }

  currentPlayer = player === humanPlayer ? humanPlayer : aiPlayer;
  gameStatus.innerHTML = "Player " + currentPlayer + " has won !";
  resultInfo.classList.remove("inactive");
}

function hardeModeDrawMessage() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style = "cursor:not-allowed";
    cell.removeEventListener("click", onTurnClick);
  });

  gameBoard = false;
  gameResult = "Draw";
  clearInterval(timer);

  gameStatus.innerHTML = "Game ended in a Draw!";
  resultInfo.classList.remove("inactive");
}

function onCheckGameTie() {
  if (emptySquares().length === 0) {
    return true;
  } else {
    return false;
  }
}

function emptySquares() {
  return origBoard.filter((item) => typeof item === "number");
}

function botPicksSpot() {
  if (difficultyChoice === "Easy" && userChoiceForPlaying === "First") {
    if (emptySquares().length >= 3) return emptySquares()[2];
    else return emptySquares()[1];
  } else if (difficultyChoice === "Easy" && userChoiceForPlaying === "Second") {
    if (emptySquares().length > 3) return emptySquares()[3];
    else return emptySquares()[1];
  } else if (difficultyChoice === "Medium") {
    if (player1Score % 2 === 0 && emptySquares().length >= 3)
      return emptySquares()[2];
    else return minimax(origBoard, aiPlayer).index;
  } else return minimax(origBoard, aiPlayer).index;
}

function minimax(newBoard, player) {
  let availableSpots = emptySquares();

  if (onCheckWin(newBoard, humanPlayer)) {
    return { score: -10 };
  } else if (onCheckWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availableSpots.length === 0) {
    return { score: 0 };
  }

  let moves = [];

  for (let i = 0; i < availableSpots.length; i++) {
    let move = {};
    move.index = newBoard[availableSpots[i]];
    newBoard[availableSpots[i]] = player;

    if (player === aiPlayer) {
      let result = minimax(newBoard, humanPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availableSpots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;

  if (player === aiPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

replayButton.addEventListener("click", () => {
  currentPlayer = starterPlayer;
  if (userChoiceForPlaying === "First") {
    playersMove[0].classList.remove("inactive");
    playersMove[1].classList.add("inactive");

    firstPlayer = "left-player";
  } else {
    playersMove[0].classList.remove("inactive");
    playersMove[1].classList.add("inactive");

    firstPlayer = "right-player";
  }
  seconds = minutes = 0;
  resultInfo.classList.add("inactive");
  timer = setInterval(gameTiming, 1000);
  gameActive = gameBoard = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style = "cursor:pointer";
    cell.innerHTML = "";
  });

  gameTime = null;
  gameState = ["", "", "", "", "", "", "", "", ""];
  gamePlayMode = [];
  winState = [];
  cells = [];
  if (userChoiceForOpponent === "playerVsCpu") onStartGame();
});
