let [subin, brother] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const answer = bfs(subin);
console.log(answer);

function bfs(startNode) {
  const queue = [];
  let queueIndex = 0;
  const visited = Array.from({ length: 100000 }, () => false);
  queue.push([startNode, 0]);

  while (queueIndex !== queue.Length) {
    const [currentLocation, second] = queue[queueIndex];

    if (currentLocation === brother) {
      return second;
    }

    if (currentLocation - 1 >= 0 && !visited[currentLocation - 1]) {
      queue.push([currentLocation - 1, second + 1]);
      visited[currentLocation - 1] = true;
    }
    if (currentLocation + 1 <= 100000 && !visited[currentLocation + 1]) {
      queue.push([currentLocation + 1, second + 1]);
      visited[currentLocation + 1] = true;
    }
    if (currentLocation * 2 <= 100000 && !visited[currentLocation * 2]) {
      queue.push([currentLocation * 2, second + 1]);
      visited[currentLocation * 2] = true;
    }

    queueIndex++;
  }
}
