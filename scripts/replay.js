import gameDetails from "../data/game-history.json" assert { type: "json" };

let opponentName = document.querySelector(".player-2"),
  playerAvatar = document.querySelector(".user-avatar-1"),
  opponentAvatar = document.querySelector(".user-avatar-2"),
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
  choosenCharacter = document.querySelectorAll(".choosen-character"),
  homeIcon = document.getElementById("home-icon"),
  profileIcon = document.getElementById("profile-icon"),
  LogoutIcon = document.getElementById("log-out-icon");

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

document.querySelectorAll(".cell").forEach((cell) => {
  cell.innerHTML = null;
  cell.style = "background:none; cursor:default";
});

Object.keys(gameDetails).forEach((element) => {
  if (element.split(" ")[1] === buttonIndex)
    replayObject = gameDetails[element];
});

replayObject.gameState.forEach((element) => {
  gamePlayOrder.push(element.split(" ")[0]);
  gamePlayIcons.push("<" + element.split("<")[1]);
});

playerAvatar.innerText = sessionStorage.getItem("accountHolder").charAt(0);
opponentAvatar.innerText = replayObject.opponentName.charAt(0);

normalSpeedButton.addEventListener("click", () => {
  normalSpeedButton.classList.add("selected-speed");
  reducedSpeedButton.classList.remove("selected-speed");
  increasedSpeedButton.classList.remove("selected-speed");

  pausePlayButton.src = "../assets/pause.png";
  pausePlayButton.alt = "pause-button";
  pausePlayButton.title = "Pause";

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
  pausePlayButton.title = "Pause";

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
  pausePlayButton.title = "Pause";

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
  pausePlayButton.title = "Pause";
  pausePlayButton.style = "cursor: pointer";
  pausePlayButton.addEventListener("click", pausePlayHistory);

  forwrdButton.style = "filter:invert(0.5); cursor:not-allowed";
  rewindButton.style = "filter:invert(0.5); cursor:not-allowed";
  pausePlayButton.style = "filter:invert(0); cursor:pointer";
  playbackSpeedButton.style = "filter:invert(0); cursor:pointer";
  clearInterval(initialTimer);
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = null;
    cell.style = "background:none; cursor:default";
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
        gameCells[winCondition[i]].style.backgroundColor = "rgb(13, 222, 180)";
      }
    }
    pausePlayButton.style = "filter:invert(0.5); cursor:not-allowed";
    pausePlayButton.removeEventListener("click", pausePlayHistory);
    playbackSpeedButton.style = "filter:invert(0.5); cursor:not-allowed";
    clearInterval(initialTimer);
  }
}

function forwardAppendCharacterOneByOne() {
  gameCells[gamePlayOrder[cnt++]].innerHTML = gamePlayIcons[cnt1++];
}

function reverseAppendCharacterOneByOne() {
  gameCells[gamePlayOrder[--cnt]].innerHTML = "";
  cnt1 = cnt1 - 1;
}

function pausePlayHistory() {
  if (pausePlayButton.alt === "pause-button") {
    clearInterval(initialTimer);
    forwrdButton.style = "filter:invert(0); cursor:pointer";
    rewindButton.style = "filter:invert(0); cursor:pointer";
  } else {
    initialTimer = setInterval(appendCharacter, playbackTime);
    forwrdButton.style = "filter:invert(0.5); cursor:not-allowed";
    rewindButton.style = "filter:invert(0.5); cursor:not-allowed";
  }
  pausePlayButton.src =
    pausePlayButton.alt === "pause-button"
      ? "../assets/play-buttton.png"
      : "../assets/pause.png";

  pausePlayButton.alt =
    pausePlayButton.alt === "pause-button" ? "play-button" : "pause-button";

  pausePlayButton.title =
    pausePlayButton.alt === "pause-button" ? "Pause" : "Play";
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
    if (cnt1 < gamePlayIcons.length && cnt1 >= 0 && cnt >= 0) {
      forwardAppendCharacterOneByOne();
    } else {
      pausePlayButton.style = "filter:invert(0.5); cursor:not-allowed";
      rewindButton.style = "cursor:not-allowed";
      forwrdButton.style = "cursor:not-allowed";
      playbackSpeedButton.style = "filter:invert(0.5); cursor:not-allowed";
      pausePlayButton.removeEventListener("click", pausePlayHistory);

      if (!(replayObject.gameResult === "Draw")) {
        for (let i = 0; i < 3; i++) {
          gameCells[winCondition[i]].style.backgroundColor =
            "rgb(13, 222, 180)";
        }
      }
    }
  }
});

rewindButton.addEventListener("click", () => {
  if (rewindButton.style.filter === "invert(0)") {
    if (cnt1 <= gamePlayIcons.length && cnt1 > 0 && cnt > 0) {
      reverseAppendCharacterOneByOne();
    } else {
      pausePlayButton.style = "filter:invert(0.5); cursor:not-allowed";
      rewindButton.style = "cursor:not-allowed";
      forwrdButton.style = "cursor:not-allowed";
      playbackSpeedButton.style = "filter:invert(0.5); cursor:not-allowed";
      pausePlayButton.removeEventListener("click", pausePlayHistory);
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

homeIcon.addEventListener("mouseover", () => {
  homeIcon.style = "filter:invert(1)";
});
homeIcon.addEventListener("mouseout", () => {
  homeIcon.style = "filter:invert(0)";
});

LogoutIcon.addEventListener("mouseover", () => {
  LogoutIcon.style = "filter:invert(1)";
});
LogoutIcon.addEventListener("mouseout", () => {
  LogoutIcon.style = "filter:invert(0)";
});

profileIcon.addEventListener("mouseover", () => {
  profileIcon.style = "filter:invert(1)";
});
profileIcon.addEventListener("mouseout", () => {
  profileIcon.style = "filter:invert(0)";
});
