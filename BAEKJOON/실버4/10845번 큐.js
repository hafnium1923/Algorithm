let [N, ...commands] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const queue = [];
let frontIndex = 0;
let backIndex = 0;
let answer = [];

commands.forEach((input) => {
  const [command, number] = input.split(" ");

  let print;
  switch (command) {
    case "push":
      push(Number(number));
      break;
    case "pop":
      print = pop();
      break;
    case "size":
      print = size();
      break;
    case "empty":
      print = empty();
      break;
    case "front":
      print = front();
      break;
    case "back":
      print = back();
      break;

    default:
  }

  if (command !== "push") answer.push(print);
});

console.log(answer.join("\n"));

function push(x) {
  queue[backIndex] = x;
  backIndex++;
}

function pop() {
  if (empty()) return -1;

  return queue[frontIndex++];
}

function size() {
  return backIndex - frontIndex;
}

function empty() {
  if (frontIndex === backIndex) return 1;

  return 0;
}

function front() {
  if (empty()) return -1;

  return queue[frontIndex];
}

function back() {
  if (empty()) return -1;

  return queue[backIndex - 1];
}
