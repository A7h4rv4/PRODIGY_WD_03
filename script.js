const X_Class = "x";
const O_Class = "O";
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("message");
const winningMessageTextElement = document.querySelector("[data-message-text]");
const restartButton = document.getElementById("restartbutton");
let OTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  OTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(X_Class);
    cell.classList.remove(O_Class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = OTurn ? O_Class : X_Class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHover();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  OTurn = !OTurn;
}

function setBoardHover() {
  board.classList.remove(X_Class);
  board.classList.remove(O_Class);
  if (OTurn) {
    board.classList.add(O_Class);
  } else {
    board.classList.add(X_Class);
  }
}

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    console.log("enters");
    winningMessageTextElement.innerText = `${OTurn ? "O" : "X"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

isDraw = () => {
  return [...cells].every((cell) => {
    return cell.classList.contains(X_Class) || cell.classList.contains(O_Class);
  });
};
