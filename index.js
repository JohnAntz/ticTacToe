//Initialize game
//const gameInit = (data) => {};

//Global object
//const gameVariables = (data) => {};

//Game logic
const gameLogic = (event) => {
  event.preventDefault();
  const players = {
    X: document.getElementById("X").value.trim() || "Player X",
    O: document.getElementById("O").value.trim() || "Player O",
  };
  console.log(players);
  //XO Selection
  const xoSelection = (event) => {
    const cell = event.target;
    if (!cell.textContent) {
      cell.textContent = "X";
    }
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
  const boardArray = cellArray.map((cell, index) => ({
    class: cell.className,
    text: cell.textContent,
    index,
    element: cell,
  }));
  return boardArray;
})();

//Event listener on submit button
document.getElementById("playGame").addEventListener("click", gameLogic);
