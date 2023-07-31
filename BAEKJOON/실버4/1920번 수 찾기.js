let [_, numbers, __, targetNumbers] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

numbers = numbers.split(" ").map(Number);
targetNumbers = targetNumbers.split(" ").map(Number);
const numSet = new Set(numbers);

const answers = [];

targetNumbers.map((targetNumber) => {
  numSet.has(targetNumber) ? answers.push(1) : answers.push(0);
});

console.log(answers.join("\n"));
