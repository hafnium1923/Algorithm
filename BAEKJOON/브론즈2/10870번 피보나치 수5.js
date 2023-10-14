let [fiboNumber] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

function fibo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fibo(n - 1) + fibo(n - 2);
}
const answer = fibo(Number(fiboNumber));

console.log(answer);
