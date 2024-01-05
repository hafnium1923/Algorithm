let [inputNum, ...remainder] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = inputNum.split(" ").map(Number);

const graph = [];
for (let i = 0; i < N; i++) {
  graph.push(remainder[i].split(" ").map(Number));
}
const [targetSecond, targetRow, targetCol] = remainder[remainder.length - 1]
  .split(" ")
  .map(Number);

const virus = [];
const queue = [];
let queueIndex = 0;

graph.map((row, rowIndex) => {
  row.map((col, colIndex) => {
    if (col !== 0) {
      virus.push({ number: col, row: rowIndex, col: colIndex });
    }
  });
});
virus.sort((a, b) => a.number - b.number);
virus.forEach((virus) => {
  queue.push([virus.number, virus.row, virus.col, 0]);
});

bfs();
console.log(graph[targetRow - 1][targetCol - 1]);

function bfs() {
  while (queueIndex !== queue.length) {
    const [virusNum, row, col, second] = queue[queueIndex];

    if (second === targetSecond) return;

    if (row - 1 >= 0 && graph[row - 1][col] === 0) {
      graph[row - 1][col] = virusNum;
      queue.push([virusNum, row - 1, col, second + 1]);
    }
    if (row + 1 < N && graph[row + 1][col] === 0) {
      graph[row + 1][col] = virusNum;
      queue.push([virusNum, row + 1, col, second + 1]);
    }
    if (col - 1 >= 0 && graph[row][col - 1] === 0) {
      graph[row][col - 1] = virusNum;
      queue.push([virusNum, row, col - 1, second + 1]);
    }
    if (col + 1 < N && graph[row][col + 1] === 0) {
      graph[row][col + 1] = virusNum;
      queue.push([virusNum, row, col + 1, second + 1]);
    }

    queueIndex++;
  }
}
