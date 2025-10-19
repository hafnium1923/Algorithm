let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const dr = [0, 0, -1, 1, 0, 0];
const dc = [1, -1, 0, 0, 0, 0];
const dl = [0, 0, 0, 0, -1, 1];
const answer = [];

let i = 0;

while (i < input.length) {
  const [L, R, C] = input[i].split(" ").map(Number);
  if (L === 0 && R === 0 && C === 0) break;

  const nextCaseIndex = i + L * (R + 1) + 1;

  const testInputs = input.slice(i + 1, nextCaseIndex);

  const testCase = [];
  let floor = [];
  let Start = [];
  for (let j = 0; j < testInputs.length; j++) {
    if ((j + 1) % (R + 1) === 0) {
      testCase.push(floor);
      floor = [];
      continue;
    }
    const inputs = testInputs[j]
      .trim()
      .split("")
      .map((s, i) => {
        if (s === "S") {
          Start = [testCase.length, ((j + 1) % (R + 1)) - 1, i];
        }
        return s;
      });
    floor.push(inputs);
  }

  bfs(L, R, C, Start, testCase);
  i = nextCaseIndex;
}

function bfs(L, R, C, Start, graph) {
  const visited = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array.from({ length: C }, () => false))
  );

  const queue = [[...Start, 0]];
  let queueIndex = 0;
  visited[Start[0]][Start[1]][Start[2]] = true;

  while (queueIndex !== queue.length) {
    const [crrL, crrR, crrC, time] = queue[queueIndex];

    for (let i = 0; i < 6; i++) {
      const nextL = crrL + dl[i];
      const nextR = crrR + dr[i];
      const nextC = crrC + dc[i];
      const nextTime = time + 1;

      if (
        nextL >= 0 &&
        nextL < L &&
        nextR >= 0 &&
        nextR < R &&
        nextC >= 0 &&
        nextC < C &&
        !visited[nextL][nextR][nextC] &&
        graph[nextL][nextR][nextC] !== "#"
      ) {
        if (graph[nextL][nextR][nextC] === "E") {
          answer.push(`Escaped in ${nextTime} minute(s).`);
          return;
        }

        visited[nextL][nextR][nextC] = true;
        queue.push([nextL, nextR, nextC, nextTime]);
      }
    }
    queueIndex++;
  }

  answer.push("Trapped!");
  return;
}

console.log(answer.join("\n"));
