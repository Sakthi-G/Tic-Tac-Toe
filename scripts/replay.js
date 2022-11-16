import gameDetails from "../data/game-history.json" assert { type: "json" };

let opponentName = document.querySelector(".player-2"),
  matchMode = document.querySelector(".gaming-mode"),
  time = document.querySelector(".game-time"),
  result = document.querySelector(".game-result"),
  rewindButton = document.querySelector(".reverse-seeking-button"),
  pausePlayButton = document.querySelector(".pause-button"),
  forwrdButton = document.querySelector(".forward-seeking-button"),
  playbackSpeedTab = document.querySelector(".playback-speed-tab"),
  playbackSpeedButton = document.querySelector(".playback-speed-button"),
  playersName = document.querySelectorAll(".player-name"),
  playAgainButton = document.querySelector(".play-again-button"),
  normalSpeedButton = playbackSpeedTab.querySelector(".normal-speed"),
  reducedSpeedButton = playbackSpeedTab.querySelector(".reduced-speed"),
  playbackSpeedDesign = window.getComputedStyle(playbackSpeedTab),
  increasedSpeedButton = playbackSpeedTab.querySelector(".increased-speed"),
  choosenCharacter = document.querySelectorAll(".choosen-character");

let buttonIndex = sessionStorage.getItem("button"),
  replayObject,
  initialTimer,
  playbackTime,
  normalSpeed = 1500,
  reducedSpeed = 2250,
  increasedSpeed = 750,
  gamePlayIcons = [],
  gamePlayOrder = [],
  gameCells = [];

Object.keys(gameDetails).forEach((element) => {
  if (element.split(" ")[1] === buttonIndex)
    replayObject = gameDetails[element];
});

replayObject.gameState.forEach((element) => {
  gamePlayOrder.push(element.split(" ")[0]);
  gamePlayIcons.push("<" + element.split("<")[1]);
});

normalSpeedButton.addEventListener("click", () => {
  normalSpeedButton.classList.add("selected-speed");
  reducedSpeedButton.classList.remove("selected-speed");
  increasedSpeedButton.classList.remove("selected-speed");

  pausePlayButton.src = "../assets/pause.png";
  pausePlayButton.alt = "pause-button";
  clearInterval(initialTimer);
  playbackTime = normalSpeed;
  initialTimer = setInterval(appendCharacter, playbackTime);
});

reducedSpeedButton.addEventListener("click", () => {
  normalSpeedButton.classList.remove("selected-speed");
  reducedSpeedButton.classList.add("selected-speed");
  increasedSpeedButton.classList.remove("selected-speed");

  pausePlayButton.src = "../assets/pause.png";
  pausePlayButton.alt = "pause-button";
  clearInterval(initialTimer);
  playbackTime = reducedSpeed;
  initialTimer = setInterval(appendCharacter, playbackTime);
});

increasedSpeedButton.addEventListener("click", () => {
  normalSpeedButton.classList.remove("selected-speed");
  reducedSpeedButton.classList.remove("selected-speed");
  increasedSpeedButton.classList.add("selected-speed");

  pausePlayButton.src = "../assets/pause.png";
  pausePlayButton.alt = "pause-button";
  clearInterval(initialTimer);
  playbackTime = increasedSpeed;
  initialTimer = setInterval(appendCharacter, playbackTime);
});

document.querySelectorAll(".cell").forEach((cell) => {
  gameCells.push(cell);
});

playAgainButton.addEventListener("click", () => {
  pausePlayButton.src = "../assets/pause.png";
  pausePlayButton.alt = "pause-button";
  pausePlayButton.style = "cursor: pointer";
  pausePlayButton.addEventListener("click", pausePlayHistory);

  forwrdButton.style = "filter:invert(0.5)";
  rewindButton.style = "filter:invert(0.5)";
  pausePlayButton.filter = "invert(0)";
  playbackSpeedButton.style.filter = "invert(0)";
  playbackTime = normalSpeed;
  clearInterval(initialTimer);
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = null;
    cell.style = "backgroundcolor:none";
  });
  cnt = cnt1 = 0;
  initialTimer = setInterval(appendCharacter, playbackTime);
});

opponentName.textContent = replayObject.opponentName;
matchMode.textContent = replayObject.difficulty;
time.textContent = replayObject.timeTaken;
result.textContent = replayObject.gameResult;

let winCondition = replayObject.winCondition;

choosenCharacter[0].innerHTML = replayObject.player1;
choosenCharacter[1].innerHTML = replayObject.player2;
playersName[1].innerHTML = replayObject.opponentName;

let cnt = 0;
let cnt1 = 0;

function appendCharacter() {
  if (cnt1 < gamePlayIcons.length) {
    gameCells[gamePlayOrder[cnt++]].innerHTML = gamePlayIcons[cnt1++];
  } else {
    cnt = cnt1 = 0;
    if (!(replayObject.gameResult === "Draw")) {
      for (let i = 0; i < 3; i++) {
        gameCells[winCondition[i]].style.backgroundColor = "rgb(185, 220, 162)";
      }
    }
    pausePlayButton.style.filter = "invert(0.5)";
    pausePlayButton.removeEventListener("click", pausePlayHistory);
    playbackSpeedButton.style.filter = "invert(0.5)";
    clearInterval(initialTimer);
  }
}

function forwardAppendCharacterOneByOne(gamePlayIcons, gamePlayOrder) {
  if (cnt1 < gamePlayIcons.length && cnt1 >= 0 && cnt >= 0)
    gameCells[gamePlayOrder[cnt++]].innerHTML = gamePlayIcons[cnt1++];
}

function reverseAppendCharacterOneByOne(gamePlayOrder) {
  if (cnt1 < gamePlayIcons.length && cnt1 >= 0 && cnt >= 0) {
    gameCells[gamePlayOrder[cnt--]].innerHTML = null;
    cnt1--;
  }
}

function pausePlayHistory() {
  if (pausePlayButton.alt === "pause-button") {
    clearInterval(initialTimer);
    forwrdButton.style = "filter:invert(0)";
    rewindButton.style = "filter:invert(0)";
  } else {
    initialTimer = setInterval(appendCharacter, playbackTime);
    forwrdButton.style = "filter:invert(0.5)";
    rewindButton.style = "filter:invert(0.5)";
  }
  pausePlayButton.src =
    pausePlayButton.alt === "pause-button"
      ? "../assets/play-buttton.png"
      : "../assets/pause.png";

  pausePlayButton.alt =
    pausePlayButton.alt === "pause-button" ? "play-button" : "pause-button";
}

function changeVisiblity() {
  if (playbackSpeedButton.style.filter === "invert(0)") {
    if (playbackSpeedDesign.visibility === "hidden")
      playbackSpeedTab.style = "visibility:visible";
    else playbackSpeedTab.style = "visibility:hidden";
  }
}

pausePlayButton.addEventListener("click", pausePlayHistory);

forwrdButton.addEventListener("click", () => {
  if (forwrdButton.style.filter === "invert(0)") {
    if (cnt1 < gamePlayIcons.length && cnt1 >= 0 && cnt >= 0)
      forwardAppendCharacterOneByOne(gamePlayIcons, gamePlayOrder);
    else {
      pausePlayButton.style.filter = "invert(0.5)";
      rewindButton.style.filter = "invert(0.5)";
      forwrdButton.style.filter = "invert(0.5)";
      pausePlayButton.removeEventListener("click", pausePlayHistory);
      playbackSpeedButton.style.filter = "invert(0.5)";
    }
  }
});

rewindButton.addEventListener("click", () => {
  if (rewindButton.style.filter === "invert(0)") {
    if (cnt1 < gamePlayIcons.length && cnt1 >= 0 && cnt >= 0)
      reverseAppendCharacterOneByOne(gamePlayOrder);
    else {
      pausePlayButton.style.filter = "invert(0.5)";
      rewindButton.style.filter = "invert(0.5)";
      forwrdButton.style.filter = "invert(0.5)";
      pausePlayButton.removeEventListener("click", pausePlayHistory);
      playbackSpeedButton.style.filter = "invert(0.5)";
    }
  }
});

playbackSpeedButton.style.filter = "invert(0)";
playbackSpeedButton.addEventListener("click", changeVisiblity);

document.addEventListener("click", function handleClickOutsideBox(event) {
  if (!playbackSpeedButton.contains(event.target)) {
    playbackSpeedTab.style = "visibility:hidden";
  }
});
normalSpeedButton.click();
