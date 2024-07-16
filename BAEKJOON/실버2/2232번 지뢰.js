let [INFO, ...testCases] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const answer = [];

let indexInfo = testCases
  .map((testCase, index) => {
    return {
      value: testCase,
      index: index,
    };
  })
  .sort((a, b) => b.value - a.value);

let bombInfo = testCases.map((testCase) => {
  return {
    isBomb: false,
    value: testCase,
  };
});

indexInfo.forEach((info) => {
  const index = info.index;

  if (!bombInfo[index].isBomb) {
    answer.push(index + 1);

    for (let i = index - 1; i >= 0; i--) {
      if (!bombInfo[i].isBomb && bombInfo[i].value < bombInfo[i + 1].value) {
        bombInfo[i].isBomb = true;
      } else {
        break;
      }
    }

    for (let i = index + 1; i < INFO; i++) {
      if (!bombInfo[i].isBomb && bombInfo[i].value < bombInfo[i - 1].value) {
        bombInfo[i].isBomb = true;
      } else {
        break;
      }
    }

    bombInfo[index].isBomb = true;
  }
});

console.log(answer.sort((a, b) => a - b).join("\n"));
