let [size, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let deque = new Array(Number(size) * 2 + 1);
let frontIndex = Number(size);
let backIndex = Number(size) + 1;
let answer = [];

function pushFront(number) {
  deque[frontIndex] = number;
  frontIndex--;
}

function pushBack(number) {
  deque[backIndex] = number;
  backIndex++;
}

function popFront() {
  if (empty()) return -1;
  frontIndex++;
  return deque[frontIndex];
}

function popBack() {
  if (empty()) return -1;
  backIndex--;
  return deque[backIndex];
}

function empty() {
  if (backIndex - frontIndex === 1) return 1;
  return 0;
}

function front() {
  if (empty()) return -1;
  return deque[frontIndex + 1];
}

function back() {
  if (empty()) return -1;
  return deque[backIndex - 1];
}

function dequeSize() {
  return backIndex - frontIndex - 1;
}

commends.map((commends) => {
  const [cmd, cmdNumber] = commends.split(" ");

  if (cmd === "1") pushFront(Number(cmdNumber));
  if (cmd === "2") pushBack(Number(cmdNumber));
  if (cmd === "3") answer.push(popFront());
  if (cmd === "4") answer.push(popBack());
  if (cmd === "5") answer.push(dequeSize());
  if (cmd === "6") answer.push(empty());
  if (cmd === "7") answer.push(front());
  if (cmd === "8") answer.push(back());
});

console.log(answer.join("\n"));
