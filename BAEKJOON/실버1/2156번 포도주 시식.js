/* 건너뛰는 조건(ex. 한번에 한개, 두개 등)에 대해 명시하지 않았으면 
1. 전전전 + 전 + 현
2. 전전 + 현
3. 현재 안밟는 경우
를 모두 고려해야함
*/
let [info, ...drink] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const dp = Array.from({ length: info }, () => 0);
dp[0] = drink[0];
dp[1] = drink[0] + drink[1];
dp[2] = Math.max(drink[0], drink[1]) + drink[2];
dp[2] = Math.max(dp[2], dp[1]);

for (let i = 3; i < info; i++) {
  dp[i] = Math.max(dp[i - 3] + drink[i - 1], dp[i - 2]) + drink[i];
  dp[i] = Math.max(dp[i], dp[i - 1]);
}
if (info < 3) {
  if (info === 1) console.log(dp[0]);
  if (info === 2) console.log(dp[1]);
} else console.log(Math.max(...dp));

console.log(dp);
