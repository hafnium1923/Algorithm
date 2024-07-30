let [INFO, ...input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = INFO.split(" ").map(Number);

const noHear = new Set();
let count = 0;
const answer = [];
for (let i = 0; i < input.length; i++) {
  if (i < N) {
    //듣도
    noHear.add(input[i]);
  }
  if (N <= i) {
    // 보도
    if (noHear.has(input[i])) {
      count++;
      answer.push(input[i]);
    }
  }
}

answer.sort();

console.log(count + "\n" + answer.join("\n"));
