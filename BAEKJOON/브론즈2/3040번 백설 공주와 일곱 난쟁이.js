const [...num] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const all = num.reduce((acc, curr) => {
  return acc + curr;
}, 0);

for (let i = 0; i < num.length - 1; i++) {
  for (let j = i + 1; j < num.length; j++) {
    if (all - num[i] - num[j] === 100) {
      num.splice(j, 1);
      num.splice(i, 1);

      console.log(num.join("\n"));

      return;
    }
  }
}
