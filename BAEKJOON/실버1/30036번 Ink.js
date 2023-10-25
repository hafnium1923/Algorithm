let [info, color, ...inputs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [_, size, __] = info.split(" ").map(Number);
color = color.split("");
let commends = [];
const map = [];
const squareInfo = {
  row: null,
  col: null,
  inkSize: 0,
  jump: 0,
};
inputs.forEach((input, index) => {
  const newLine = input.split("");
  if (index === inputs.length - 1) {
    commends = newLine;
    return;
  }
  const nowIndex = newLine.findIndex((item) => item === "@");
  if (nowIndex !== -1) {
    squareInfo.row = index;
    squareInfo.col = nowIndex;
  }
  newLine[nowIndex] = ".";
  map.push(newLine);
});

const colorMap = (nowColor) => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (
        Math.abs(squareInfo.row - i) + Math.abs(squareInfo.col - j) <=
        squareInfo.inkSize
      ) {
        if (map[i][j] !== ".") map[i][j] = nowColor;
      }
    }
  }
};
commends.map((commends) => {
  if (commends === "U" && squareInfo.row !== 0) {
    if (map[squareInfo.row - 1][squareInfo.col] === ".") squareInfo.row -= 1;
  }
  if (commends === "D" && squareInfo.row !== size - 1) {
    if (map[squareInfo.row + 1][squareInfo.col] === ".") squareInfo.row += 1;
  }
  if (commends === "L" && squareInfo.col !== 0) {
    if (map[squareInfo.row][squareInfo.col - 1] === ".") squareInfo.col -= 1;
  }
  if (commends === "R" && squareInfo.col !== size - 1) {
    if (map[squareInfo.row][squareInfo.col + 1] === ".") squareInfo.col += 1;
  }

  if (commends === "j") {
    squareInfo.inkSize += 1;
  }
  if (commends === "J") {
    const nowColor = color[squareInfo.jump % color.length];
    colorMap(nowColor);
    squareInfo.jump += 1;
    squareInfo.inkSize = 0;
  }
});

map[squareInfo.row][squareInfo.col] = "@";

const answer = map.map((line) => line.join("")).join("\n");

console.log(answer);
