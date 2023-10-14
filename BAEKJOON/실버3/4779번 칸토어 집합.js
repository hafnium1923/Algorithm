let [...inputs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const answer = [];

inputs.forEach((input) => {
  answer.push(Cantor(Math.pow(3, input)));
});

function Cantor(n) {
  if (n === 1) return "-";

  const setLength = n / 3;

  const set = Cantor(setLength);

  return set + " ".repeat(setLength) + set;
}

console.log(answer.join("\n"));
