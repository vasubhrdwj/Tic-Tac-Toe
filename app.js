function gameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  const getBoard = () => board;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardValues);
  };

  return { getBoard, printBoard };
}

console.log(gameBoard().getBoard());

function Cell() {
  let value = 0;
  getValue = () => value;

  return { getValue };
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];

  const getPlayers = () => players;

  return { getPlayers };
}

let game = gameController();
console.log(game.getPlayers());
