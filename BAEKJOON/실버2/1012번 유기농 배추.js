const [TEST_CASE, ...Input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let graph = [];
let visited = [];
let index = -1;
const answer = [];
for (let i = 0; i < Input.length; i++) {
  if (i === index + 1) {
    const [M, N, K] = Input[i].split(" ").map(Number);

    index = K + i; // 다음 테케 시작할 index 저장
    visited = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => false)
    ); //visited 초기화
    graph = Array.from({ length: N }, () => Array.from({ length: M }, () => 0)); //graph 초기화
    continue;
  }

  const [X, Y] = Input[i].split(" ").map(Number); //X가 열 Y가 행
  graph[Y][X] = 1;

  if (i === index) {
    answer.push(check(graph, visited));
  }
}

console.log(answer.join("\n"));

function check(graph, visited) {
  let count = 0;

  graph.forEach((line, x) => {
    line.forEach((item, y) => {
      if (item === 1 && !visited[x][y]) {
        bfs(x, y); //배추가 있는데 방문을 안함 -> bfs ㄱㄱ
        count++;
      }
    });
  });

  return count;
}

function bfs(startRow, starCol) {
  const queue = [];
  let queueIndex = 0;
  queue.push([startRow, starCol]);
  visited[startRow][starCol] = true;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queueIndex !== queue.length) {
    const [row, col] = queue[queueIndex];

    for (let i = 0; i < 4; i++) {
      const nextRow = row + dx[i];
      const nextCol = col + dy[i];

      if (
        nextRow >= 0 &&
        nextRow < visited.length &&
        nextCol >= 0 &&
        nextCol < visited[0].length &&
        graph[nextRow][nextCol] === 1 &&
        !visited[nextRow][nextCol]
      ) {
        queue.push([nextRow, nextCol]);
        visited[nextRow][nextCol] = true;
      }
    }

    queueIndex++;
  }
}
