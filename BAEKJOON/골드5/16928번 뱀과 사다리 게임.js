let [inputNum, ...vertexNo] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [ladderNum, snakeNum] = inputNum.split(" ").map(Number);
const ladders = Array.from({ length: 101 });
const snakes = Array.from({ length: 101 });
const visited = Array.from({ length: 101 }, () => false);
let answer = 100;

for (let i = 0; i < vertexNo.length; i++) {
  if (i < ladderNum) {
    const [start, end] = vertexNo[i].split(" ").map(Number);
    ladders[start] = end;
  } else {
    const [start, end] = vertexNo[i].split(" ").map(Number);
    snakes[start] = end;
  }
}

bfs(1);
console.log(answer);

function bfs(start) {
  const queue = [];
  let queueIndex = 0;
  queue.push([start, 0]);
  visited[start] = true;

  while (queueIndex !== queue.length) {
    const [current, count] = queue[queueIndex];

    if (current === 100) {
      answer = answer > count ? count : answer;
    }

    for (let i = 1; i <= 6; i++) {
      const next = current + i;
      if (next <= 100 && !visited[next]) {
        if (ladders[next] !== undefined) {
          queue.push([ladders[next], count + 1]);
          visited[ladders[next]] = true;
        } else if (snakes[next] !== undefined) {
          queue.push([snakes[next], count + 1]);
          visited[snakes[next]] = true;
        } else {
          queue.push([next, count + 1]);
        }
        visited[next] = true;
      }
    }

    queueIndex++;
  }
}
