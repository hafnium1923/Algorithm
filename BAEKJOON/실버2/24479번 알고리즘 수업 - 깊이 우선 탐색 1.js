let [info, ...UV] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [num, _, start] = info.split(" ").map(Number);
const graph = Array.from({ length: num }, () => new Array());
const visited = [];
const answers = new Array(num).fill(0);

UV.map((uv) => {
  const [u, v] = uv.split(" ").map(Number);
  graph[u - 1].push(v - 1);
  graph[v - 1].push(u - 1);
});

graph.map((list) => {
  return list.sort((a, b) => a - b);
});

const dfs = (vertexNo) => {
  visited.push(vertexNo);
  answers[vertexNo] = visited.length;

  for (let i = 0; i < graph[vertexNo].length; i++) {
    const nextVertex = graph[vertexNo][i];
    if (answers[nextVertex] === 0) {
      dfs(nextVertex);
    }
  }
};

dfs(start - 1);

console.log(answers.join("\n"));
