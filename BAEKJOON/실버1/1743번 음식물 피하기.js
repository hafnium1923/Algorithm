let [info, ...nodes] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [rowNum, colNum, _] = info.split(" ").map(Number);
let answer = 0;
const nodeMap = Array.from({ length: rowNum }, () => {
  return new Array(colNum).fill(false);
});

nodes.map((node) => {
  const [row, col] = node.split(" ").map(Number);
  nodeMap[row - 1][col - 1] = true;
});

nodes.map((node) => {
  const [row, col] = node.split(" ").map(Number);
  if (nodeMap[row - 1][col - 1] === true) {
    answer = Math.max(answer, dfs(row - 1, col - 1));
  }
});

console.log(answer);

function dfs(vertexRow, vertexCol) {
  let connection = 1;
  nodeMap[vertexRow][vertexCol] = false;

  if (vertexCol + 1 < colNum && nodeMap[vertexRow][vertexCol + 1] === true)
    connection += dfs(vertexRow, vertexCol + 1);
  if (vertexCol - 1 >= 0 && nodeMap[vertexRow][vertexCol - 1] === true)
    connection += dfs(vertexRow, vertexCol - 1);
  if (vertexRow + 1 < rowNum && nodeMap[vertexRow + 1][vertexCol] === true)
    connection += dfs(vertexRow + 1, vertexCol);
  if (vertexRow - 1 >= 0 && nodeMap[vertexRow - 1][vertexCol] === true)
    connection += dfs(vertexRow - 1, vertexCol);

  return connection;
}
