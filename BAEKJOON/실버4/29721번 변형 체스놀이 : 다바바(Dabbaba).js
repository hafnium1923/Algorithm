let [INFO, ...COORDS] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, _] = INFO.split(" ").map(Number);
const graph = new Map();

const dx = [0, 0, -2, 2];
const dy = [-2, 2, 0, 0];
let answer = 0;

COORDS.forEach((COORD) => {
  graph.set(COORD, true);
});

COORDS.forEach((COORD) => {
  const [row, col] = COORD.split(" ").map((x) => Number(x) - 1);

  for (let i = 0; i < 4; i++) {
    const newRow = row + dy[i];
    const newCol = col + dx[i];

    if (newRow >= 0 && newRow < N && newCol >= 0 && newCol < N) {
      const newCOORD = `${newRow + 1} ${newCol + 1}`;
      if (graph.get(newCOORD) !== true) {
        graph.set(newCOORD, true);
        answer++;
      }
    }
  }
});

console.log(answer);
