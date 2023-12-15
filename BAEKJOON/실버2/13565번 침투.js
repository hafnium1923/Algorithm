let [info, ...nodes] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [rowNum, colNum, _] = info.split(" ").map(Number);
let answer = "NO";
const nodeMap = Array.from({ length: rowNum }, (_, index) => {
  return nodes[index].split("").map(Number);
});

for (let i = 0; i < colNum; i++) {
  if (nodeMap[0][i] === 0) {
    dfs(0, i);
  }
}

function dfs(row, col) {
  nodeMap[row][col] = 1;
  if (row === rowNum - 1) {
    answer = "YES";
    return;
  }

  if (row + 1 < rowNum && nodeMap[row + 1][col] === 0) {
    dfs(row + 1, col);
  }
  if (row - 1 > 0 && nodeMap[row - 1][col] === 0) {
    dfs(row - 1, col);
  }
  if (col + 1 < colNum && nodeMap[row][col + 1] === 0) {
    dfs(row, col + 1);
  }
  if (col - 1 > 0 && nodeMap[row][col - 1] === 0) {
    dfs(row, col - 1);
  }
}

console.log(answer);
