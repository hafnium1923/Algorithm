let [alphabet] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const answers = new Set();

for (let i = 0; i < alphabet.length; i++) {
  for (let j = i + 1; j <= alphabet.length; j++) {
    answers.add(alphabet.slice(i, j));
  }
}

console.log(answers.size);
