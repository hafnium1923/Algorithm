let [repeat, ...input] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

repeat = Number(repeat);

let answer1 = 100;
let answer2 = 100;

input.map((i) => {
  const [a, b] = i.split(" ").map(Number);
  if (a === b) return;
  a > b ? (answer2 -= a) : (answer1 -= b);
});

console.log(answer1 + "\n" + answer2);
