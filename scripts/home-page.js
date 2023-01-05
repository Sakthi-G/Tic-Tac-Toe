let playerVsPlayerButton = document.getElementById("player-vs-player"),
  playerVsCpuButton = document.getElementById("player-vs-pc"),
  nextButton = document.getElementById("next-section"),
  startGameButton = document.querySelector(".start-game-button"),
  selfGamePage = document.querySelector(".character-selection"),
  againstCpuPage = document.querySelector(".character-choice"),
  gameModeSelectionPage = document.querySelector(".game-mode"),
  homeIcon = document.getElementById("home-icon"),
  profileIcon = document.getElementById("profile-icon"),
  LogoutIcon = document.getElementById("log-out-icon"),
  backArrow = document.querySelector(".back-arrow-button"),
  userChoiceForPlaying = document.querySelector(".choice"),
  choiceToPlayFirst = document.getElementById("choice-yes"),
  choiceToPlaySecond = document.getElementById("choice-no"),
  easyMode = document.getElementById("choice-easy"),
  mediumMode = document.getElementById("choice-medium"),
  hardMode = document.getElementById("choice-impossible"),
  opponentName = document.getElementById("opponent-name"),
  xIcons = document.querySelectorAll(".x-icon"),
  oIcons = document.querySelectorAll(".o-icon");

let userChoiceForOpponent, userChoiceForCharacter;

playerVsCpuButton.addEventListener("click", () => {
  userChoiceForOpponent = "playerVsCpu";
  sessionStorage.setItem("opponentChoice", userChoiceForOpponent);
  playerVsPlayerButton.style.boxShadow = "none";
  playerVsCpuButton.style.boxShadow = "0 0 1rem rgba(0, 0, 0, 0.5)";
});

playerVsPlayerButton.addEventListener("click", () => {
  userChoiceForOpponent = "playerVsPlayer";
  sessionStorage.setItem("opponentChoice", userChoiceForOpponent);
  playerVsCpuButton.style.boxShadow = "none";
  playerVsPlayerButton.style.boxShadow = "0 0 1rem rgba(0, 0, 0, 0.5)";
});

for (let i = 0; i < xIcons.length; i++) {
  xIcons[i].addEventListener("click", () => {
    userChoiceForCharacter = "x";
    sessionStorage.setItem("userChoice", userChoiceForCharacter);
    oIcons[i].style.boxShadow = "none";
    xIcons[i].style.boxShadow = "0 0 1rem rgba(0,0,0,0.4)";
  });
}

for (let i = 0; i < oIcons.length; i++) {
  oIcons[i].addEventListener("click", () => {
    userChoiceForCharacter = "o";
    sessionStorage.setItem("userChoice", userChoiceForCharacter);
    xIcons[i].style.boxShadow = "none";
    oIcons[i].style.boxShadow = "0 0 1rem rgba(0,0,0,0.4)";
  });
}

startGameButton.addEventListener("click", () => {
  sessionStorage.setItem("opponentName", opponentName.innerText);
  sessionStorage.setItem("timer", "startTimer");

  if (choiceToPlayFirst.checked) {
    sessionStorage.setItem("choiceToPlay", "First");
  } else {
    sessionStorage.setItem("choiceToPlay", "Second");
  }

  if (easyMode.checked) {
    sessionStorage.setItem("difficulty-choice", "Easy");
  } else if (mediumMode.checked) {
    sessionStorage.setItem("difficulty-choice", "Medium");
  } else {
    sessionStorage.setItem("difficulty-choice", "Impossible to Win");
  }
});

homeIcon.style = "filter:invert(1); cursor:default";

profileIcon.addEventListener("mouseover", () => {
  profileIcon.style = "filter:invert(1)";
});
profileIcon.addEventListener("mouseout", () => {
  profileIcon.style = "filter:invert(0)";
});

LogoutIcon.addEventListener("mouseover", () => {
  LogoutIcon.style = "filter:invert(1)";
});
LogoutIcon.addEventListener("mouseout", () => {
  LogoutIcon.style = "filter:invert(0)";
});

nextButton.addEventListener("click", switchPage);
backArrow.addEventListener("click", navigateToHome);

function navigateToHome() {
  window.location = "../html/home.html";
}

function switchPage() {
  if (userChoiceForOpponent === "playerVsCpu") {
    againstCpuPage.classList.remove("inactive");
  } else {
    selfGamePage.classList.remove("inactive");
  }
  backArrow.classList.remove("inactive");
  userChoiceForPlaying.classList.remove("inactive");
  startGameButton.classList.remove("inactive");
  gameModeSelectionPage.classList.add("inactive");
  nextButton.classList.add("inactive");
}

async function appendPlayerName() {
  let playerName = await getCurrentUserName();
  sessionStorage.setItem("accountHolder", playerName);
  opponentName.innerText = sessionStorage.getItem("accountHolder");
}
appendPlayerName();

function defaultValue() {
  xIcons[0].click();
  xIcons[1].click();
  playerVsCpuButton.click();
}

window.onload = () => {
  defaultValue();
};
