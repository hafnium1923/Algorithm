let [num, ...rest] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

let testCase = [];

rest.forEach((i) => {
  testCase.push(i.trim().split(" ").map(Number));
});

testCase.forEach((test) => {
  let count = 0;
  for (let i = test[0]; i <= test[1]; i++) {
    if (i === 0) count++;
    let j = i;
    while (j > 0) {
      if (j % 10 === 0) count++;
      j = Math.floor(j / 10);
    }
  }
  console.log(count);
});
