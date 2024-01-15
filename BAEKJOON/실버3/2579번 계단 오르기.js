let [info, ...stairs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const answer = stairsDP();
console.log(answer);

function stairsDP() {
  const dp = Array.from({ length: info }, () => 0);
  dp[0] = stairs[0];
  dp[1] = stairs[0] + stairs[1];
  dp[2] = Math.max(stairs[0], stairs[1]) + stairs[2];

  for (let i = 3; i < info; i++) {
    dp[i] = Math.max(dp[i - 3] + stairs[i - 1], dp[i - 2]) + stairs[i];
  }

  return dp[info - 1];
}
