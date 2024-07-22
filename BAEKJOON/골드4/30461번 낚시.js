let [info, ...rest] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, Q] = info.split(" ").map(Number);
let graph = [];
let command = [];
const answer = [];

rest.forEach((line, i) => {
  let array = line.split(" ").map(Number);
  if (i < N) {
    if (i !== 0) {
      array = array.map((number, j) => {
        let total = graph[i - 1][j] + number;
        if (i - 1 >= 0 && j - 1 >= 0) total += graph[i - 1][j - 1];
        if (i - 2 >= 0 && j - 1 >= 0) total -= graph[i - 2][j - 1];
        return total;
      });
    }
    graph.push([...array]);
  } else {
    command.push([...array]);
  }
});

command.forEach(([x, y]) => {
  answer.push(graph[x - 1][y - 1]);
});

console.log(answer.join("\n"));
