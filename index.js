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
  const xoSelection = () => {
    console.log("HELLO");
  };
  //Gameboard setup
  (function () {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", xoSelection);
    });
  })();
};

//Event listener on submit button
document.getElementById("playGame").addEventListener("click", gameLogic);
