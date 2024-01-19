let [num, ...triangle] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

num = Number(num);
triangle = triangle.map((row) => row.split(" ").map(Number));

console.log(DP(num));

function DP(N) {
  const dp = Array.from({ length: N }, (_, index) =>
    new Array(index + 1).fill(0)
  );

  dp[0][0] = triangle[0][0];

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      if (j === 0) {
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
      } else if (j === dp[i].length - 1) {
        dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
      }
    }
  }

  return Math.max(...dp[N - 1]);
}
