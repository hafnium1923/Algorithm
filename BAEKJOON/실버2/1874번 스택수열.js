let [N, ...numbers] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

numbers = numbers.map((n) => Number(n));

const stack = [];
let answer = [];
const input = Array.from({ length: Number(N) }, (_, i) => i + 1);
let inputIndex = 0;
let targetIndex = 0;
let isLastInput = false;

while (targetIndex !== Number(N)) {
  const number = input[inputIndex];
  const target = numbers[targetIndex];

  if (stack.length === 0) {
    if (number === Number(N)) isLastInput = true;
    stack.push(number);
    answer.push("+");
    inputIndex++;
    continue;
  }

  const last = stack[stack.length - 1];
  if (isLastInput && last !== target) {
    answer = "NO";
    break;
  }
  if (last === target) {
    stack.pop();
    answer.push("-");
    targetIndex++;
  }
  if (last !== target) {
    if (number === Number(N)) isLastInput = true;
    stack.push(number);
    answer.push("+");
    inputIndex++;
  }
}
if (typeof answer === "string") {
  console.log(answer);
} else console.log(answer.join("\n"));
