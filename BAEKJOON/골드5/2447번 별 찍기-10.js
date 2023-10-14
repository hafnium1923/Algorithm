let [input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const totalStar = Number(input);

const arr = Array.from(new Array(Number(totalStar)), () =>
  new Array(Number(totalStar)).fill("*")
);

function makeStar(number, startRow, startColumn) {
  if (number === 1) return;

  const newStar = number / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
        fillBlank(newStar, startRow + newStar, startColumn + newStar);
        continue;
      }
      fillBlank(newStar, startRow + newStar, startColumn + newStar);
      makeStar(newStar, startRow + newStar * i, startColumn + newStar * j);
    }
  }
}

function fillBlank(number, startRow, startColumn) {
  for (let i = startRow; i < startRow + number; i++) {
    for (let j = startColumn; j < startColumn + number; j++) {
      arr[i][j] = " ";
    }
  }
}

makeStar(totalStar, 0, 0);

const answer = arr
  .map((a) => {
    return a.join("");
  })
  .join("\n");

console.log(answer);
