let [INFO, ...testCases] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const numbers = testCases.sort((a, b) => a - b).slice(0, 10);

const answer = [];
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    if (i === j) continue;
    let mult = 10 ** numbers[j].toString().length;

    answer.push(numbers[i] * mult + numbers[j]);
  }
}

console.log(answer.sort((a, b) => a - b)[2]);
