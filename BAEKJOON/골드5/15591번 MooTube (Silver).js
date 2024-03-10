let [NQ, ...info] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, Q] = NQ.split(" ").map(Number);
const node = Array.from({ length: N }, () => {
  return [];
});

const questions = [];
const answer = [];

info.forEach((info, index) => {
  if (index < N - 1) {
    const [n1, n2, w] = info.split(" ").map(Number);

    node[n1 - 1].push([n2 - 1, w]);
    node[n2 - 1].push([n1 - 1, w]);
  } else {
    const [k, v] = info.split(" ").map(Number);
    questions.push([k, v]);
  }
});

questions.forEach((info) => {
  const [w, n] = info;
  answer.push(bfs(n, w));
});

console.log(answer.join("\n"));

function bfs(startNode, standardWeight) {
  let queueIndex = 0;
  let count = 0;
  const queue = [startNode - 1];
  const visited = Array.from({ length: N }, () => false);
  visited[startNode - 1] = true;

  while (queue.length !== queueIndex) {
    const current = queue[queueIndex];

    node[current].forEach((info) => {
      const [n, w] = info;

      if (!visited[n] && w >= standardWeight) {
        queue.push(n);
        visited[n] = true;
        count++;
      }
    });
    queueIndex++;
  }

  return count;
}

// 아래는 메모리 초과난 코드. 아마 완탐 * 완탐 이라 그런듯?

// const [N, Q] = NQ.split(" ").map(Number);
// const graph = Array.from({ length: N }, (_, rowIndex) => {
//   return Array.from({ length: N }, (_, colIndex) => {
//     if (rowIndex > colIndex + 1) return [colIndex];
//     else if (rowIndex === colIndex) return [];
//     else return [colIndex];
//   });
// });

// const node = Array.from({ length: N }, () => {
//   return [];
// });
// const questions = [];
// const answer = [];

// info.forEach((info, index) => {
//   if (index < N - 1) {
//     const [n1, n2, w] = info.split(" ").map(Number);

//     node[n1 - 1].push(n2 - 1);
//     node[n2 - 1].push(n1 - 1);

//     graph[n1 - 1][n2 - 1].push(w);
//     graph[n2 - 1][n1 - 1].push(w);
//   } else {
//     const [k, v] = info.split(" ").map(Number);
//     questions.push([k, v]);
//   }
// });

// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < N; j++) {
//     if (i === j) continue;

//     const isConnect = node[i].includes((n) => n === j);
//     if (!isConnect & (graph[i][j][1] === undefined)) {
//       const sameNode = node[i].filter((n) => node[j].includes(n));

//       let min = 1000000000;
//       sameNode.forEach((s) => {
//         min = Math.min(graph[s][i][1], graph[s][j][1], min);
//       });
//       graph[i][j].push(min);
//       graph[j][i].push(min);
//     }
//   }
// }

// questions.forEach((question) => {
//   const [w, n] = question;

//   let count = 0;
//   graph[n - 1].forEach((nodeInfo) => {
//     const [_, nodeWeight] = nodeInfo;

//     if (nodeWeight !== undefined && w <= nodeWeight) {
//       count++;
//     }
//   });
//   answer.push(count);
// });

// console.log(answer.join("\n"));
