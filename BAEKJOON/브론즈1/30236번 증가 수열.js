let [INFO, ...testCases] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const answer = [];

for (let i = 0; i < Number(INFO); i++) {
  const N = Number(testCases[i * 2]);
  const numbers = testCases[i * 2 + 1].split(" ").map(Number);

  let count = 0;
  let bN = 1;

  while (count < N) {
    if (numbers[count] === bN) {
      bN++;
      continue;
    }

    if (count === N - 1) break;

    count++;
    bN++;
  }

  answer.push(bN);
}

console.log(answer.join("\n"));
