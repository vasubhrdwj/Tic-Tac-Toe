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
    if (!isValid(row, col)) {
      console.log("Select something valid dawg");
      return -1;
    }
    if (board[row][col].getValue() !== 0) {
      console.log("Already marked!!");
      return -1;
    }
    board[row][col].mark(player.token);
  };

  const isValid = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
    else return true;
  };

  const printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardValues);
  };

  return { getBoard, markBoard, printBoard };
}

function Cell() {
  let value = 0;
  getValue = () => value;

  mark = (val) => (value = val);

  return { mark, getValue };
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  console.log("Game Started");
  const board = gameBoard();

  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];

  let currentPlayer = players[0];

  const playRound = (row, col) => {
    const check = board.markBoard(row, col, currentPlayer);
    if (check === -1) return;
    board.printBoard();
    switchPlayer();
  };

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === players[0] ? players[1] : players[0]);

  return { playRound };
}

let game = gameController();
