let [num] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const dp = Array.from({ length: 1001 }, () => 0);
DP(num);
console.log(dp[num]);

function DP(num) {
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= num; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }
}
