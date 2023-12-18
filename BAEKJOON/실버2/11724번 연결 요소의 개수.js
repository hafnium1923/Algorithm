let [info, ...nodes] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [nodeNum, _] = info.split(" ").map(Number);
const nodeList = Array.from({ length: nodeNum }, () => []);
const visited = new Array(nodeNum).fill(false);
let answer = 0;

nodes.forEach((node) => {
  const [u, v] = node.split(" ").map(Number);

  nodeList[u - 1].push(v - 1);
  nodeList[v - 1].push(u - 1);
});

visited.forEach((isVisited, index) => {
  if (!isVisited) {
    bfs(index);
    answer++;
  }
});

console.log(answer);
function bfs(startNode) {
  const queue = [];
  let queueIndex = 0;

  visited[startNode] = true;
  queue.push(startNode);

  while (queueIndex !== queue.length) {
    const vertexNo = queue[queueIndex];
    queueIndex++;

    for (let i = 0; i < nodeList[vertexNo].length; i++) {
      if (!visited[nodeList[vertexNo][i]]) {
        visited[nodeList[vertexNo][i]] = true;

        queue.push(nodeList[vertexNo][i]);
      }
    }
  }
}
