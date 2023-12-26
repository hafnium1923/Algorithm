let [info, ...graph] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = info.split(" ").map(Number);
graph = graph.map((row) => row.split("").map(Number));

const answer = bfs(0, 0);

console.log(answer);

function bfs(startRow, startCol) {
  const queue = [];
  let queueIndex = 0;
  queue.push([startRow, startCol, 1]);
  graph[startRow][startCol] = 0;

  while (queueIndex !== queue.length) {
    const [row, col, distance] = queue[queueIndex];
    if (row === N - 1 && col === M - 1) return distance;

    if (row - 1 >= 0 && graph[row - 1][col] === 1) {
      graph[row - 1][col] = 0;
      queue.push([row - 1, col, distance + 1]);
    }
    if (row + 1 < N && graph[row + 1][col] === 1) {
      graph[row + 1][col] = 0;
      queue.push([row + 1, col, distance + 1]);
    }
    if (col - 1 >= 0 && graph[row][col - 1] === 1) {
      graph[row][col - 1] = 0;
      queue.push([row, col - 1, distance + 1]);
    }
    if (col + 1 < M && graph[row][col + 1] === 1) {
      graph[row][col + 1] = 0;
      queue.push([row, col + 1, distance + 1]);
    }

    queueIndex++;
  }
}
