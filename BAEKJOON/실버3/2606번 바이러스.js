let [computer, num, ...info] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const graph = Array.from({ length: Number(computer) }, () => new Array());
const visited = new Array(Number(computer)).fill(false);

info.map((info) => {
  const [u, v] = info.split(" ").map(Number);
  graph[u - 1].push(v - 1);
  graph[v - 1].push(u - 1);
});

dfs(0);

const answer = visited.reduce((acc, curr, i) => {
  if (i === 0) return 0;
  if (curr) return ++acc;

  return acc;
}, 0);

console.log(answer);

function dfs(vertexNo) {
  visited[vertexNo] = true;

  for (let i = 0; i < graph[vertexNo].length; i++) {
    const nextNode = graph[vertexNo][i];
    if (!visited[nextNode]) {
      dfs(nextNode);
    }
  }
}
