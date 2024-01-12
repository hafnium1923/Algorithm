let [num] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const MAX = 1000001;
const dp = Array.from({ length: num + 1 }, () => MAX);

console.log(bottomDP(num));

function bottomDP(n) {
  dp[1] = 0;

  for (let i = 1; i < n; i++) {
    dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);
    if (i * 2 < MAX) dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
    if (i * 3 < MAX) dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
  }

  return dp[num];
}
