let [N, K] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const queue = Array.from({ length: N }, (_, i) => i + 1);
let index = 0;
let inputIndex = 0;
let count = 0;
const answer = [];

while (answer.length !== N) {
  if (count % K === K - 1) {
    answer.push(queue[index]);
  } else {
    queue[inputIndex] = queue[index];
    inputIndex++;
  }

  count++;
  index++;
  if (inputIndex === N) inputIndex = 0;
  if (index === N) index = 0;
}

console.log("<" + answer.join(", ") + ">");
