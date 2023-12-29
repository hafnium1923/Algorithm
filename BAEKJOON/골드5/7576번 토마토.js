/* 
함수가 종료되었다고 무조건 gc가 돌아가는 게 아님. 
메모리 초과가 나온다면 bfs 를 여러번 돌리지 말고 한번에 돌리도록 하자 
*/

let [info, ...graph] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [colNum, rowNum] = info.split(" ").map(Number);
graph = graph.map((row) => row.split(" ").map(Number));

const queue = [];
let queueIndex = 0;

graph.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col === 1) {
      queue.push([rowIndex, colIndex, 1]);
    }
  });
});

bfs();

let days = 0;
let isNotRipped = false;

for (let i = 0; i < rowNum; i++) {
  if (isNotRipped) break;

  for (let j = 0; j < colNum; j++) {
    if (graph[i][j] > days) {
      days = graph[i][j];
    }
    if (graph[i][j] === 0) {
      isNotRipped = true;
      break;
    }
  }
}

if (isNotRipped) {
  console.log(-1);
} else if (days === 1) {
  console.log(0);
} else {
  console.log(days - 1);
}

function bfs() {
  while (queueIndex !== queue.length) {
    const [row, col, rippedDay] = queue[queueIndex];

    if (
      row + 1 < rowNum &&
      (graph[row + 1][col] === 0 || graph[row + 1][col] > rippedDay + 1)
    ) {
      graph[row + 1][col] = rippedDay + 1;
      queue.push([row + 1, col, rippedDay + 1]);
    }
    if (
      row - 1 >= 0 &&
      (graph[row - 1][col] === 0 || graph[row - 1][col] > rippedDay + 1)
    ) {
      graph[row - 1][col] = rippedDay + 1;
      queue.push([row - 1, col, rippedDay + 1]);
    }
    if (
      col + 1 < colNum &&
      (graph[row][col + 1] === 0 || graph[row][col + 1] > rippedDay + 1)
    ) {
      graph[row][col + 1] = rippedDay + 1;
      queue.push([row, col + 1, rippedDay + 1]);
    }
    if (
      col - 1 >= 0 &&
      (graph[row][col - 1] === 0 || graph[row][col - 1] > rippedDay + 1)
    ) {
      graph[row][col - 1] = rippedDay + 1;
      queue.push([row, col - 1, rippedDay + 1]);
    }

    queueIndex++;
  }
}
