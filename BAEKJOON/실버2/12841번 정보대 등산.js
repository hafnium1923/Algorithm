let [N, crossWalk, left, right] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

N = Number(N);
crossWalk = crossWalk.split(" ").map(Number);
left = left.split(" ").map(Number);
right = right.split(" ").map(Number);

let leftNum = 0;
let rightNum = right.reduce((acc, crr) => acc + crr, 0);

const leftSum = [];
const rightSum = [];
for (let i = 0; i < N; i++) {
  leftSum.push(leftNum);
  rightSum.push(rightNum);

  if (i !== N - 1) {
    leftNum = leftNum + left[i];
    rightNum = rightNum - right[i];
  }
}

let min = 100000000000;
let minPoint = 1000000;

for (let i = 0; i < N; i++) {
  const distance = crossWalk[i] + leftSum[i] + rightSum[i];

  if (min > distance) {
    min = distance;
    minPoint = i + 1;
  } else if (min === distance) {
    minPoint = minPoint > i + 1 ? i + 1 : minPoint;
  }
}

console.log(minPoint + " " + min);
