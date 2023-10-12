let [_, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let queue = [];
let frontIndex = 0;
let backIndex = 0;
let answer = [];

function push(number) {
  queue[backIndex] = number;
  backIndex++;
}

function pop() {
  if (empty()) return -1;
  frontIndex++;
  return queue[frontIndex - 1];
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

function size() {
  return backIndex - frontIndex;
}

commends.map((commends) => {
  const [cmd, cmdNumber] = commends.split(" ");

  if (cmd === "push") push(Number(cmdNumber));
  if (cmd === "pop") answer.push(pop());
  if (cmd === "size") answer.push(size());
  if (cmd === "empty") answer.push(empty());
  if (cmd === "front") answer.push(front());
  if (cmd === "back") answer.push(back());
});

console.log(answer.join("\n"));
