let [info, nodes, ...vertexNo] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = info.split(" ").map(Number);
const nodeHigh = [-1, ...nodes.split(" ").map(Number)];
const graph = Array.from({ length: N + 1 }, () => []);

vertexNo.forEach((info) => {
  const [startVertex, endVertex] = info.split(" ").map(Number);
  if (nodeHigh[startVertex] < nodeHigh[endVertex]) {
    graph[startVertex].push(endVertex);
  }
  if (nodeHigh[startVertex] > nodeHigh[endVertex]) {
    graph[endVertex].push(startVertex);
  }
});

const dp = Array.from({ length: N + 1 }, () => -1);

for (let i = 1; i <= N; i++) {
  Dp(i);
}

console.log(dp.slice(1).join("\n"));

function Dp(vertex) {
  if (graph[vertex].length === 0) {
    dp[vertex] = 1;

    return;
  }

  const array = [];

  for (let i = 0; i < graph[vertex].length; i++) {
    const nextVertex = graph[vertex][i];

    if (dp[nextVertex] === -1) {
      Dp(nextVertex);
    }

    array.push(dp[nextVertex]);
  }

  dp[vertex] = 1 + Math.max(...array);
}
