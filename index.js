//Game logic
const gameLogic = (event) => {
  event.preventDefault();
  const playerInputs = Array.from(document.querySelectorAll(".inputs"));
  const players = playerInputs.map((input) => ({
    id: input.id,
    name: input.value.trim() || input.placeholder,
  }));

  //Player turn logic
  let currentPlayer = players[0];
  function playerTurn() {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
  }
  //Check win function
  function checkWin() {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left
      [2, 4, 6], // Diagonal from top-right
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        boardArray[a].playerSelection &&
        boardArray[a].playerSelection === boardArray[b].playerSelection &&
        boardArray[a].playerSelection === boardArray[c].playerSelection
      ) {
        return currentPlayer;
      }
    }
    const allCellsFilled = boardArray.every(
      (cell) => cell.playerSelection !== null
    );
    if (allCellsFilled) {
      return "Draw";
    }
    return null;
  }

  //Cell click logic
  const xoSelection = (event) => {
    const cell = event.target;
    const cellIndex = Array.from(document.querySelectorAll(".cell")).indexOf(
      cell
    );
    if (!cell.textContent) {
      cell.textContent = `${currentPlayer.id}`;
      boardArray[cellIndex].playerSelection = currentPlayer.id;
      cell.classList.add(`${currentPlayer.id}Selected`);

      const winner = checkWin();
      if (winner) {
        setTimeout(() => {
          if (winner === "Draw") {
            alert("It's a draw!");
          } else {
            alert(`${winner.name} (${winner.id}) wins!`);
          }
        }, 100);
        removeCellEventListeners();
        return; // End the game if there's a winner
      }
      playerTurn();
    }
  };
  // Function to remove event listeners from all cells
  function removeCellEventListeners() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.removeEventListener("click", xoSelection);
    });
  }
  //Add event listener (click) to each cell
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", xoSelection);
  });

  //Reset button
  document.getElementById("resetGame").addEventListener("click", resetBoard);

  //Reset button logic
  function resetBoard() {
    boardArray.forEach((cell) => {
      cell.playerSelection = null;
      const cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("XSelected", "OSelected");
      });
    });
    currentPlayer = players[0];
  }
};

//Gameboard setup
const boardArray = (function () {
  // Store each cell as an object inside an array
  const container = document.getElementById("gameBoard");
  const cellArray = Array.from(container.querySelectorAll(".cell"));

  // Create an array of objects for each cell
  let boardArray = cellArray.map((cell, index) => ({
    text: cell.textContent,
    index,
    playerSelection: null,
  }));

  return boardArray;
})();

//Event listener on submit button
document.getElementById("playGame").addEventListener("click", gameLogic);
