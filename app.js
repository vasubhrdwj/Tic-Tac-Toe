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
    board[row][col].mark(player.token);
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
    board.markBoard(row, col, currentPlayer);
    board.printBoard();
  };

  const getPlayers = () => players;

  return { getPlayers, playRound };
}

let game = gameController();

game.playRound(1, 1);
game.playRound(1, 2);
game.playRound(2, 2);
