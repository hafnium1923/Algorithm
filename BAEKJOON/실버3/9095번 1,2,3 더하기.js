let [info, ...testCases] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const dp = Array.from({ length: 11 }, () => 0);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

const answer = [];

testCases.forEach((testCase) => {
  answer.push(DP(testCase));
});

console.log(answer.join("\n"));

function DP(n) {
  if (dp[n] === 0) {
    let i = dp.indexOf(0, 1);
    for (i; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }
  }

  return dp[n];
}
