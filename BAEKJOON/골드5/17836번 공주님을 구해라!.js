let [inputNum, ...graph] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, T] = inputNum.split(" ").map(Number);
graph = graph.map((row) => row.split(" ").map(Number));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
let answer = 10001;

bfs(1, 1);
console.log(answer <= T ? answer : "Fail");

function bfs(startRow, startCol) {
  const queue = [];
  let queueIndex = 0;
  queue.push([startRow - 1, startCol - 1, 0]);
  visited[startRow - 1][startCol - 1] = true;

  while (queueIndex !== queue.length) {
    const [row, col, time] = queue[queueIndex];
    if (row === N - 1 && col === M - 1) {
      answer = answer > time ? time : answer;
    }
    if (graph[row][col] === 2) {
      const withSword = time + N - 1 - row + M - 1 - col;
      answer = answer > withSword ? withSword : answer;
    }

    if (row + 1 < N && !visited[row + 1][col] && graph[row + 1][col] !== 1) {
      queue.push([row + 1, col, time + 1]);
      visited[row + 1][col] = true;
    }
    if (row - 1 >= 0 && !visited[row - 1][col] && graph[row - 1][col] !== 1) {
      queue.push([row - 1, col, time + 1]);
      visited[row - 1][col] = true;
    }
    if (col + 1 < M && !visited[row][col + 1] && graph[row][col + 1] !== 1) {
      queue.push([row, col + 1, time + 1]);
      visited[row][col + 1] = true;
    }
    if (col - 1 >= 0 && !visited[row][col - 1] && graph[row][col - 1] !== 1) {
      queue.push([row, col - 1, time + 1]);
      visited[row][col - 1] = true;
    }

    queueIndex++;
  }
}
