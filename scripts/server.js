let express = require("express");
let app = express();
let fs = require("fs");
let path = require("path");

let gameDetails = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/game-history.json"))
);
let currentUserName, counter;

if (Object.keys(gameDetails).length === 0) {
  counter = 1;
} else {
  counter =
    Object.keys(gameDetails)[Object.keys(gameDetails).length - 1].split(" ")[1];
}

// Middlewares to load the static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../html/index.html"));
});

app.get("/index.html", (request, response) => {
  response.sendFile(path.join(__dirname, "../html/index.html"));
});

app.get("/home.html", (request, response) => {
  response.sendFile(path.join(__dirname, "../html/home.html"));
});

app.get("/replay.html", (request, response) => {
  response.sendFile(path.join(__dirname, "../html/replay.html"));
});

app.get("/game.html", (request, response) => {
  response.sendFile(path.join(__dirname, "../html/game.html"));
});

app.get("/profile.html", (request, response) => {
  response.sendFile(path.join(__dirname, "../html/profile.html"));
});

app.post("/signup", function (request, response) {
  let userCredentials = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/user-details.json"))
  );
  if (!(request.body.userEmail in userCredentials)) {
    userCredentials[request.body.userEmail] = {
      username: request.body.userName,
      useremail: request.body.userEmail,
      password: request.body.password,
    };
    fs.writeFile(
      path.join(__dirname, "../data/user-details.json"),
      JSON.stringify(userCredentials),
      (error) => {
        if (error) console.log(error);
      }
    );
    response.status(200).json({ message: "Success" });
    response.end();
  } else {
    response.status(300).json({ message: "User already exists" });
    response.end();
  }
});

// Post request for Login validation
app.post("/login", function (request, response) {
  let userCredentials = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/user-details.json"))
  );
  if (request.body.userEmail in userCredentials) {
    if (
      request.body.userPassword ===
      userCredentials[request.body.userEmail].password
    ) {
      currentUserName = userCredentials[request.body.userEmail].username;
      response
        .status(200)
        .end(JSON.stringify(userCredentials[request.body.userEmail].username));
    } else {
      response.status(205).json({ message: "Wrong Password" });
      response.end();
    }
  } else {
    response.status(300).json({ message: "User Not Found" });
    response.end();
  }
});

app.get("/currentUser", (request, response) => {
  response.status(200).end(currentUserName);
});

app.post("/gameHistory", (request, response) => {
  let matchReport = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/game-history.json"))
  );

  matchReport[request.body.player + " " + ++counter] = {
    opponentName: request.body.opponentGamerName,
    gameResult: request.body.matchResult,
    difficulty: request.body.difficulty,
    timeTaken: request.body.timeTaken,
    gameState: request.body.gameState,
    player1: request.body.player1,
    player2: request.body.player2,
    winCondition: request.body.winState,
  };

  fs.writeFile(
    path.join(__dirname, "../data/game-history.json"),
    JSON.stringify(matchReport),
    (error) => {
      if (error) console.log(error);
    }
  );
});

app.listen(9999 || process.env.PORT);
