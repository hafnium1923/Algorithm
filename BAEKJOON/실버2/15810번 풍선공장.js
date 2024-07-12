//이분탐색

let [INFO, TIMES] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = INFO.split(" ").map(Number);
const times = TIMES.split(" ").map(Number);

const MAX_TIMES = 1000000 * 1000000;
let right = MAX_TIMES;
let left = 0;

while (left <= right) {
  const half = Math.floor((left + right) / 2);

  const make = times.reduce((acc, curr) => {
    return acc + Math.floor(half / curr);
  }, 0);

  if (M <= make) {
    right = half - 1;
  } else {
    left = half + 1;
  }
}

console.log(left);
