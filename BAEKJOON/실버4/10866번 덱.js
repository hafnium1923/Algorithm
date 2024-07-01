let [N, ...commands] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const deque = Array.from({ length: 10001 }, () => -1);
let frontIndex = 4999;
let backIndex = 5000;
const answer = [];

commands.forEach((line) => {
  const [command, number] = line.split(" ");

  if (command === "push_front") {
    push_front(Number(number));
  }
  if (command === "push_back") {
    push_back(Number(number));
  }
  if (command === "pop_front") {
    answer.push(pop_front(Number(number)));
  }
  if (command === "pop_back") {
    answer.push(pop_back(Number(number)));
  }
  if (command === "size") {
    answer.push(size());
  }
  if (command === "empty") {
    answer.push(empty());
  }
  if (command === "front") {
    answer.push(front());
  }
  if (command === "back") {
    answer.push(back());
  }
});

console.log(answer.join("\n"));
function push_front(x) {
  deque[frontIndex--] = x;
}

function push_back(x) {
  deque[backIndex++] = x;
}

function pop_front() {
  if (size() === 0) return -1;

  return deque[++frontIndex];
}

function pop_back() {
  if (size() === 0) return -1;

  return deque[--backIndex];
}

function size() {
  return backIndex - frontIndex - 1;
}

function empty() {
  if (size() === 0) return 1;

  return 0;
}

function front() {
  if (size() === 0) return -1;

  return deque[frontIndex + 1];
}

function back() {
  if (size() === 0) return -1;

  return deque[backIndex - 1];
}
