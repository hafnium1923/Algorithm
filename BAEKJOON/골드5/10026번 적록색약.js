let [num, ...graph] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const weakNessGraph = graph.map((row) => {
  return row.replaceAll("R", "G").split("");
});
const answer = [0, 0];
graph = graph.map((row) => row.split(""));
num = Number(num);

graph.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col !== 0) {
      bfs(rowIndex, colIndex, graph, false);
    }
  });
});
weakNessGraph.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col !== 0) {
      bfs(rowIndex, colIndex, weakNessGraph, true);
    }
  });
});

console.log(answer.join(" "));

function bfs(startRow, startCol, targetGraph, isWeakNess) {
  const queue = [];
  let queueIndex = 0;
  const target = targetGraph[startRow][startCol];
  queue.push([startRow, startCol]);
  targetGraph[startRow][startCol] = 0;

  while (queueIndex < queue.length) {
    const [row, col] = queue[queueIndex];

    if (row - 1 >= 0 && targetGraph[row - 1][col] === target) {
      targetGraph[row - 1][col] = 0;
      queue.push([row - 1, col]);
    }
    if (row + 1 < num && targetGraph[row + 1][col] === target) {
      targetGraph[row + 1][col] = 0;
      queue.push([row + 1, col]);
    }
    if (col - 1 >= 0 && targetGraph[row][col - 1] === target) {
      targetGraph[row][col - 1] = 0;
      queue.push([row, col - 1]);
    }
    if (col + 1 < num && targetGraph[row][col + 1] === target) {
      targetGraph[row][col + 1] = 0;
      queue.push([row, col + 1]);
    }

    queueIndex++;
  }

  if (isWeakNess) answer[1]++;
  else answer[0]++;
}
