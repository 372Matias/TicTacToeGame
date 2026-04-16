let board = ["","","","","","","","",""];
let currentPlayer = "X";
let players = { X: "", O: "" };
let scores = { X: 0, O: 0, draw: 0 };
let gameActive = false;
let time = 0;
let timer;

// ELEMENTOS
const boardDiv = document.getElementById("board");
const turnText = document.getElementById("turn");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");

// CREAR GRID
for (let i = 0; i < 9; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => makeMove(i));
  boardDiv.appendChild(cell);
}

// AÑADIR NOMBRE
document.getElementById("addPlayerBtn").addEventListener("click", () => {
  let name = document.getElementById("nameInput").value;

  if (players.X === "") {
    players.X = name;
    document.getElementById("playerX").textContent = "X: " + name;
  } else {
    players.O = name;
    document.getElementById("playerO").textContent = "O: " + name;
    gameActive = true;
    startTimer();
    updateTurn();
  }

  document.getElementById("nameInput").value = "";
});

// HACER JUGADA
function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  render();

  if (checkWin()) return;
  if (board.every(cell => cell !== "")) {
    endGame("Draw");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurn();
}

// RENDER
function render() {
  document.querySelectorAll(".cell").forEach((cell, i) => {
    cell.textContent = board[i];
  });
}

// TURNO
function updateTurn() {
  turnText.textContent = "Turn: " + players[currentPlayer];
}

// CHECK WIN
function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let combo of wins) {
    let [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(currentPlayer);
      return true;
    }
  }
  return false;
}

// FIN DEL JUEGO
function endGame(result) {
  gameActive = false;
  clearInterval(timer);

  if (result === "Draw") {
    scores.draw++;
    showPopup("Draw!");
  } else {
    scores[result]++;
    showPopup(players[result] + " wins!");
  }

  updateScore();
}

// SCORE
function updateScore() {
  scoreText.textContent =
    `Score - X:${scores.X} O:${scores.O} Draw:${scores.draw}`;
}

// TIMER
function startTimer() {
  timer = setInterval(() => {
    time++;
    timerText.textContent = "Time: " + time;
  }, 1000);
}

// RESTART
document.getElementById("restartBtn").addEventListener("click", () => {
  board = ["","","","","","","","",""];
  currentPlayer = "X";
  gameActive = true;
  time = 0;
  render();
  startTimer();
  updateTurn();
});

// POPUP
function showPopup(text) {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("message").textContent = text;
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}