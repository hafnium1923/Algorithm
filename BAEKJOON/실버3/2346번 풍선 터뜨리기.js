let [_, commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let answer = [];
let balloons = commends.split(" ").map(Number);
let nowIndex = 0;

for (let i = 0; i < balloons.length; i++) {
  answer.push(nowIndex + 1);

  const move = balloons[nowIndex];
  balloons[nowIndex] = 0;

  let flag = 1;
  let index = nowIndex + move;

  if (answer.length === balloons.length) break;

  while (flag === 1) {
    if (index < 0) {
      index = balloons.length + index;
    }
    if (index >= balloons.length) {
      index = balloons.length - index;
    }

    if (balloons[index] !== 0) {
      flag = 0;
      nowIndex = index;
      break;
    }

    move > 0 ? index++ : index--;
  }
}

console.log(answer.join(" "));
