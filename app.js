function Cell() {
  let value = 0;
  getValue = () => value;

  mark = (val) => (value = val);

  return { mark, getValue };
}

function gameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  const getBoard = () => board;

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i].push(Cell());
      }
    }
  };

  const markBoard = (row, col, player) => {
    if (board[row][col].getValue() !== 0) {
      console.log("Already marked!!");
      return -1;
    }
    board[row][col].mark(player.token);
  };

  const isWinning = () => {
    const checkLine = (a, b, c) =>
      a.getValue() != 0 &&
      a.getValue() === b.getValue() &&
      b.getValue() === c.getValue();

    for (let i = 0; i < rows; i++) {
      if (
        checkLine(board[i][0], board[i][1], board[i][2]) ||
        checkLine(board[0][i], board[1][i], board[2][i])
      ) {
        return true;
      }
    }

    return (
      checkLine(board[0][0], board[1][1], board[2][2]) ||
      checkLine(board[0][2], board[1][1], board[2][0])
    );
  };

  const printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardValues);
  };

  return { getBoard, markBoard, printBoard, isWinning, resetBoard };
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = gameBoard();

  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];

  let currentPlayer;

  const reset = () => {
    board.resetBoard();
    currentPlayer = players[0];
  };

  reset();

  const printNewBoard = () => {
    board.printBoard();
  };

  const playRound = (row, col) => {
    const check = board.markBoard(row, col, currentPlayer);

    if (isWin() === true) {
      return;
    }
    if (check !== -1) switchPlayer();
  };

  const isWin = () => {
    return board.isWinning();
  };

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === players[0] ? players[1] : players[0]);

  return { getCurrentPlayer, playRound, getBoard: board.getBoard, isWin };
}

function screenController() {
  let game = gameController();
  const turnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const resultDiv = document.querySelector(".result");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();
    if (game.isWin() === true) turnDiv.textContent = "";
    else turnDiv.textContent = `${currentPlayer.name}'s turn`;

    for (let row = 0; row < 3; row++) {
      const rowDiv = document.createElement("div");
      for (let col = 0; col < 3; col++) {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = row;
        cellButton.dataset.column = col;
        cellButton.textContent = board[row][col].getValue();
        rowDiv.appendChild(cellButton);
      }
      boardDiv.appendChild(rowDiv);
    }

  };

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedCol = e.target.dataset.column;
    if (!selectedRow || game.isWin() === true) return;

    game.playRound(selectedRow, selectedCol);
    if (game.isWin() === true) {
      const currentPlayer = game.getCurrentPlayer();
      resultDiv.textContent = `${currentPlayer.name} won the game!!!`;
    }
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

screenController();
