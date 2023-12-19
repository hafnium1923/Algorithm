let [num, ...nodes] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const graph = nodes.map((node) => node.split("").map(Number));
num = Number(num);
const answer = [];

graph.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col === 1) {
      const count = bfs(rowIndex, colIndex);
      answer.push(count);
    }
  });
});

answer.sort((a, b) => a - b);

console.log(answer.length + "\n" + answer.join("\n"));

function bfs(startRow, startCol) {
  const queue = [];
  let queueIndex = 0;
  graph[startRow][startCol] = 0;
  queue.push([startRow, startCol]);

  while (queueIndex !== queue.length) {
    const [row, col] = queue[queueIndex];
    if (row - 1 >= 0 && graph[row - 1][col] === 1) {
      graph[row - 1][col] = 0;
      queue.push([row - 1, col]);
    }
    if (row + 1 < num && graph[row + 1][col] === 1) {
      graph[row + 1][col] = 0;
      queue.push([row + 1, col]);
    }
    if (col - 1 >= 0 && graph[row][col - 1] === 1) {
      graph[row][col - 1] = 0;
      queue.push([row, col - 1]);
    }
    if (col + 1 < num && graph[row][col + 1] === 1) {
      graph[row][col + 1] = 0;
      queue.push([row, col + 1]);
    }
    queueIndex++;
  }

  return queue.length;
}
