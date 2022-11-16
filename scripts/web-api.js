async function newUserLog(userdetails) {
  try {
    let signUpValidation = await fetch("http://localhost:9999/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdetails),
    });
    if (signUpValidation.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error");
  }
}

async function existingUserLog(loginUserDetails) {
  try {
    let loginValidation = await fetch("http://localhost:9999/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserDetails),
    });
    if (loginValidation.status === 200) {
      return "valid";
    } else if (loginValidation.status === 205) {
      return "wrongPassword";
    } else {
      return "notFound";
    }
  } catch (error) {
    console.log("Error");
  }
}

async function getCurrentUserName() {
  let currentPlayer = await fetch("http://localhost:9999/currentUser", {
    method: "GET",
  });
  if (currentPlayer.status === 200) {
    return await currentPlayer.text();
  }
}

async function appendGameHistory(gameReport) {
  let gameData = await fetch("http://localhost:9999/gameHistory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: gameReport,
  });
}
