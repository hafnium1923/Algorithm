let [info, ...remainder] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

//key-value 값을 가지고 있을 때는 시간 초과를 예방하기 위해 map 을 사용한다.

const [N, M, K] = info.split(" ").map(Number);
const graph = [];
const gods = [];
let longestGodWord = 0;
const queue = [];
let queueIndex = 0;
const answer = Array.from({ length: K }, () => 0);
const totalWords = new Map();

remainder.forEach((row, index) => {
  if (index < N) {
    graph.push(row.split(""));
  } else {
    longestGodWord = longestGodWord < row.length ? row.length : longestGodWord;
    gods.push(row);
  }
});

graph.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    queue.push([rowIndex, colIndex, col]);
  });
});

dfs();
gods.forEach((godWords, index) => {
  const count = totalWords.get(godWords);
  if (count !== undefined) answer[index] = count;
});

console.log(answer.join("\n"));

function dfs() {
  const dx = [-1, 1, 0, 0, -1, 1, 1, -1];
  const dy = [0, 0, -1, 1, 1, 1, -1, -1];

  while (queueIndex !== queue.length) {
    const [row, col, words] = queue[queueIndex];
    const count = totalWords.get(words);
    if (count === undefined) {
      totalWords.set(words, 1);
    } else {
      totalWords.set(words, count + 1);
    }

    if (words.length < longestGodWord) {
      for (let i = 0; i < 8; i++) {
        let nextRow = row + dx[i];
        let nextCol = col + dy[i];

        if (nextRow < 0) nextRow = N - 1;
        if (nextRow === N) nextRow = 0;
        if (nextCol < 0) nextCol = M - 1;
        if (nextCol === M) nextCol = 0;

        queue.push([nextRow, nextCol, words + graph[nextRow][nextCol]]);
      }
    }

    queueIndex++;
  }
}
