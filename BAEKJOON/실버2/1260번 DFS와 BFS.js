let [info, ...vertexInfo] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [vertextNum, nodeNum, startVertex] = info.split(" ").map(Number);
const nodeList = Array.from({ length: vertextNum + 1 }, () => []);

vertexInfo.forEach((info) => {
  const [V1, V2] = info.split(" ").map(Number);
  nodeList[V1].push(V2);
  nodeList[V2].push(V1);
});

nodeList.forEach((node) => {
  node.sort((a, b) => a - b);
});

const dfsVisited = Array.from({ length: vertextNum + 1 }, () => false);
const dfsAnswer = [];
const bfsVisited = Array.from({ length: vertextNum + 1 }, () => false);
const bfsAnswer = [];

dfs(startVertex);
bfs(startVertex);
console.log(dfsAnswer.join(" ") + "\n" + bfsAnswer.join(" "));

function dfs(vertexNo) {
  dfsVisited[vertexNo] = true;
  dfsAnswer.push(vertexNo);

  for (let i = 0; i < nodeList[vertexNo].length; i++) {
    const next = nodeList[vertexNo][i];

    if (!dfsVisited[next]) {
      dfs(next);
    }
  }
}

function bfs(vertexNo) {
  const queue = [];
  let queueIndex = 0;
  queue.push(vertexNo);
  bfsVisited[vertexNo] = true;

  while (queueIndex !== queue.length) {
    const current = queue[queueIndex];
    bfsAnswer.push(current);

    for (let i = 0; i < nodeList[current].length; i++) {
      const next = nodeList[current][i];

      if (!bfsVisited[next]) {
        queue.push(next);
        bfsVisited[next] = true;
      }
    }

    queueIndex++;
  }
}
