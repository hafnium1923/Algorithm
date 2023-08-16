let [...input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const answers = ["N", "E", "S", "W"];

const index = input.reduce((acc, curr) => {
  if (curr === 1) {
    if (acc === 3) return 0;
    return acc + 1;
  }
  if (curr === 2) {
    return (acc + 2) % 4;
  }
  if (curr === 3) {
    if (acc === 0) return 3;
    return acc - 1;
  }
}, 0);

console.log(answers[index]);
