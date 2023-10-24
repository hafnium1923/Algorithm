let [first, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

first = Number(first);
let second = first === 1 ? 2 : 1;

let ticTacToe = Array.from(Array(3), () => new Array(3));
let winner = 0;

for (let i = 0; i < commends.length; i++) {
  let [row, col] = commends[i].split(" ").map(Number);

  if (i % 2 === 0) {
    ticTacToe[row - 1][col - 1] = first;
  } else {
    ticTacToe[row - 1][col - 1] = second;
  }

  if (
    (ticTacToe[0][0] !== undefined &&
      ticTacToe[0][0] === ticTacToe[0][1] &&
      ticTacToe[0][1] === ticTacToe[0][2]) ||
    (ticTacToe[1][0] !== undefined &&
      ticTacToe[1][0] === ticTacToe[1][1] &&
      ticTacToe[1][1] === ticTacToe[1][2]) ||
    (ticTacToe[2][0] !== undefined &&
      ticTacToe[2][0] === ticTacToe[2][1] &&
      ticTacToe[2][1] === ticTacToe[2][2]) ||
    (ticTacToe[0][0] !== undefined &&
      ticTacToe[0][0] === ticTacToe[1][1] &&
      ticTacToe[1][1] === ticTacToe[2][2]) ||
    (ticTacToe[0][2] !== undefined &&
      ticTacToe[0][2] === ticTacToe[1][1] &&
      ticTacToe[1][1] === ticTacToe[2][0]) ||
    (ticTacToe[0][0] !== undefined &&
      ticTacToe[0][0] === ticTacToe[1][0] &&
      ticTacToe[1][0] === ticTacToe[2][0]) ||
    (ticTacToe[0][1] !== undefined &&
      ticTacToe[0][1] === ticTacToe[1][1] &&
      ticTacToe[1][1] === ticTacToe[2][1]) ||
    (ticTacToe[0][2] !== undefined &&
      ticTacToe[0][2] === ticTacToe[1][2] &&
      ticTacToe[1][2] === ticTacToe[2][2])
  ) {
    winner = ticTacToe[row - 1][col - 1];
    break;
  }
}

console.log(winner);
