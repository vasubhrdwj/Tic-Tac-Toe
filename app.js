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

  console.log("Board intitiated");

  const getBoard = () => board;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const markBoard = (row, col, player) => {
    if (board[row][col].getValue() !== 0) {
      console.log("Already marked!!");
      return -1;
    }
    board[row][col].mark(player.token);
  };

  const isWinning = () => {
    for (let row = 0; row < rows; row++) {
      if (
        board[row][0].getValue() !== 0 &&
        board[row][1].getValue() !== 0 &&
        board[row][2].getValue() !== 0 &&
        board[row][0].getValue() === board[row][1].getValue() &&
        board[row][1].getValue() === board[row][2].getValue()
      ) {
        return true;
      }
    }

    return false;
  };

  const printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardValues);
  };

  return { getBoard, markBoard, printBoard, isWinning };
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

  let currentPlayer = players[0];
  console.log(`${currentPlayer.name}'s turn!`);

  const printNewBoard = () => {
    board.printBoard();
    console.log(`${currentPlayer.name}'s turn!`);
  };

  const playRound = (row, col) => {
    const check = board.markBoard(row, col, currentPlayer);
    console.log(isWin());
    if (isWin() === true) {
      console.log(`${currentPlayer.name} won the Game!!!`);
      board.printBoard();
      return;
    }
    if (check !== -1) switchPlayer();
    printNewBoard();
  };

  const isWin = () => {
    return board.isWinning();
  };

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === players[0] ? players[1] : players[0]);

  return { playRound };
}

let game = gameController();
 
