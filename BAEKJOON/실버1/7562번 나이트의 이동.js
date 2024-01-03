let [inputNum, ...remainder] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const answer = [];

for (let i = 0; i < Number(inputNum); i++) {
  const length = Number(remainder[i * 3]);
  const [startRow, startCol] = remainder[1 + i * 3].split(" ").map(Number);
  const [targetRow, targetCol] = remainder[2 + i * 3].split(" ").map(Number);

  const visited = Array.from({ length }, () =>
    Array.from({ length }, () => false)
  );

  const count = bfs(startRow, startCol, targetRow, targetCol, visited);
  answer.push(count);
}

console.log(answer.join("\n"));

function bfs(startRow, startCol, targetRow, targetCol, visited) {
  const queue = [];
  let queueIndex = 0;
  const length = visited.length;
  queue.push([startRow, startCol, 0]);
  visited[startRow][startCol] = true;

  while (queueIndex !== queue.length) {
    const [row, col, count] = queue[queueIndex];

    if (row === targetRow && col === targetCol) {
      return count;
    }

    if (row - 2 >= 0 && col - 1 >= 0 && !visited[row - 2][col - 1]) {
      queue.push([row - 2, col - 1, count + 1]);
      visited[row - 2][col - 1] = true;
    }
    if (row - 2 >= 0 && col + 1 < length && !visited[row - 2][col + 1]) {
      queue.push([row - 2, col + 1, count + 1]);
      visited[row - 2][col + 1] = true;
    }

    if (row - 1 >= 0 && col - 2 >= 0 && !visited[row - 1][col - 2]) {
      queue.push([row - 1, col - 2, count + 1]);
      visited[row - 1][col - 2] = true;
    }
    if (row - 1 >= 0 && col + 2 < length && !visited[row - 1][col + 2]) {
      queue.push([row - 1, col + 2, count + 1]);
      visited[row - 1][col + 2] = true;
    }

    if (row + 1 < length && col - 2 >= 0 && !visited[row + 1][col - 2]) {
      queue.push([row + 1, col - 2, count + 1]);
      visited[row + 1][col - 2] = true;
    }
    if (row + 1 < length && col + 2 < length && !visited[row + 1][col + 2]) {
      queue.push([row + 1, col + 2, count + 1]);
      visited[row + 1][col + 2] = true;
    }

    if (row + 2 < length && col - 1 >= 0 && !visited[row + 2][col - 1]) {
      queue.push([row + 2, col - 1, count + 1]);
      visited[row + 2][col - 1] = true;
    }
    if (row + 2 < length && col + 1 < length && !visited[row + 2][col + 1]) {
      queue.push([row + 2, col + 1, count + 1]);
      visited[row + 2][col + 1] = true;
    }

    queueIndex++;
  }
}
