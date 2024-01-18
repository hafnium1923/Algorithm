let [num, ...costs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");
num = Number(num);
costs = costs.map((list) => list.split(" ").map(Number));

console.log(DP(num));

function DP(N) {
  const dp = Array.from({ length: N }, () => new Array(N).fill(1001));
  dp[0][0] = costs[0][0];
  dp[0][1] = costs[0][1];
  dp[0][2] = costs[0][2];

  for (let i = 1; i < N; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2];
  }

  return Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]);
}
