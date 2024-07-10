let [INFO] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const answer = [];

for (let i = 0; i < INFO; i++) {
  if (i === INFO - 1 && i % 2 === 0) {
    answer.push(3);
  } else if (i % 2 === 0) {
    answer.push(1);
  } else if (i % 2 === 1) {
    answer.push(2);
  }
}

console.log(answer.join(" "));
