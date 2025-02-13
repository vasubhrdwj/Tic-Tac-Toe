function gameBoard() {
  const rows = 3;
  const cols = 3;
  board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardValues);
  };

  return { printBoard };
}

function Cell() {
  let value = 0;
  getValue = () => value;

  return { getValue };
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  let players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];

  let getPlayers = () => players;

  return {  getPlayers };
}

let game = gameController();

