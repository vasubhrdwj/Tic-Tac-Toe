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
    console.log("Initiating Board");
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

  console.log(`${currentPlayer.name}'s turn!`);

  const printNewBoard = () => {
    board.printBoard();
    console.log(`${currentPlayer.name}'s turn!`);
  };

  const playRound = (row, col) => {
    const check = board.markBoard(row, col, currentPlayer);

    if (isWin() === true) {
      winningCondition();
      return;
    }
    if (check !== -1) switchPlayer();
    printNewBoard();
  };

  const isWin = () => {
    return board.isWinning();
  };

  const winningCondition = () => {
    console.log(`${currentPlayer.name} won the Game!!!`);
    board.printBoard();
    reset();
  };

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === players[0] ? players[1] : players[0]);

  return { playRound };
}

function screenController() {
  let game = gameController();
  const turnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  turnDiv.textContent = "";
  boardDiv.textContent = game.printNewBoard();
}

screenController();

// Winning condition
// game.playRound(1, 1);
// game.playRound(1, 2);
// game.playRound(0, 0);
// game.playRound(1, 0);
// game.playRound(2, 2);
