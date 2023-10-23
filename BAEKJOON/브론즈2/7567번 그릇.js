let [...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("");

let answer = 0;

commends.map((commend, index, array) => {
  if (commend !== array[index - 1]) answer += 10;

  if (commend === array[index - 1]) answer += 5;
});

console.log(answer);
