const [fixedCost, variableCost, cost] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

if (cost - variableCost <= 0) {
  console.log(-1);
  return;
}
const answer = Math.floor(fixedCost / (cost - variableCost)) + 1;

console.log(answer);
