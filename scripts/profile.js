let gameData = JSON.parse(sessionStorage.getItem("gameReport"));
import gameDetails from "../data/game-history.json" assert { type: "json" };

let gameHistoryData = document.querySelector(".game-history-data"),
  userNameFirstLetter = document.querySelector(".profile-image"),
  totalGamesPlayed = document.getElementById("total-games-played"),
  gamesWon = document.getElementById("games-won"),
  gamesLost = document.getElementById("games-lost"),
  drawGames = document.getElementById("draw-games"),
  profileUserName = document.querySelector(".profile-username"),
  homeIcon = document.getElementById("home-icon"),
  profileIcon = document.getElementById("profile-icon"),
  LogoutIcon = document.getElementById("log-out-icon");

let accountHolder = sessionStorage.getItem("accountHolder");

profileIcon.style = "filter:invert(1); cursor:default";

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

let totalGames = 0,
  winGame = 0,
  lostGame = 0,
  draw = 0;
Object.keys(gameDetails).forEach((element) => {
  if (
    element.split(" ")[0] !== "undefined" &&
    element.split(" ")[0] === accountHolder
  ) {
    totalGames++;
    if (gameDetails[element].gameResult === "Won") winGame++;
    else if (gameDetails[element].gameResult === "Lost") lostGame++;
    else draw++;
  }
});

gamesWon.textContent = winGame;
gamesLost.textContent = lostGame;
drawGames.textContent = draw;
totalGamesPlayed.textContent = totalGames;
profileUserName.textContent = sessionStorage.getItem("accountHolder");
userNameFirstLetter.textContent = sessionStorage.getItem("accountHolder")[0];

Object.keys(gameDetails)
  .reverse()
  .forEach((element) => {
    if (
      element.split(" ")[0] !== "undefined" &&
      element.split(" ")[0] === accountHolder
    ) {
      gameHistoryData.innerHTML += `<div class="game-data">
                <div class="profile-opponent-name"> ${
                  gameDetails[element].opponentName
                }</div>
                <div class="profile-game-status">${
                  gameDetails[element].gameResult
                }</div>
                <div class= "time-taken">${gameDetails[element].timeTaken}</div>
                <div class = "difficulty-mode">${
                  gameDetails[element].difficulty
                }</div>
                <div class="replay">
                <a href="./replay.html">
                  <img
                    class = "history-button" data-cell-index=${
                      element.split(" ")[1]
                    }
                    id="replay-button"
                    src="../assets/play.png"
                    alt="play-icon"
                    height="15px"
                    width="15px"
                /></a>
              </div>
              </div>
              `;
    }
  });
let playHistory = document.querySelectorAll(".history-button");

playHistory.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick(clickedButtonEvent) {
  let clickedButton = clickedButtonEvent.target;
  let clickedButtonIndex = parseInt(
    clickedButton.getAttribute("data-cell-index")
  );
  sessionStorage.setItem("button", clickedButtonIndex);
}
