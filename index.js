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
  //Cell click logic
  const xoSelection = (event) => {
    const cell = event.target;
    if (!cell.textContent) {
      cell.textContent = `${currentPlayer.id}`;
    }
    playerTurn();
  };
  //Add event listener (click) to each cell
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", xoSelection);
  });
};

//Gameboard setup
(function () {
  //Store each cell as an object inside an array
  const container = document.getElementById("gameBoard");
  const cellArray = Array.from(container.querySelectorAll(".cell"));
  return cellArray.map((cell, index) => ({
    text: cell.textContent,
    index,
    playerSelection: null,
  }));
})();

//Event listener on submit button
document.getElementById("playGame").addEventListener("click", gameLogic);
