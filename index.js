(() => {
  const gameBoard = document.getElementById("gameBoard");
  const board = Array(9).fill({});
  board.forEach(() => {
    const cell = document.createElement("div");
    cell.classList.add("board-cell");
    gameBoard.appendChild(cell);
  });
})();
