let [rowCol, ...input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const row = rowCol.split(" ").map(Number)[0];
const col = rowCol.split(" ").map(Number)[1];

input = input.map((i) => {
  return i.replace(/\r/g, "").split("");
});

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (input[i][j].match(new RegExp(/^[A-Z]/))) {
      input[i][col - j - 1] = input[i][j];
    }
  }
}

console.log(
  input
    .map((i) => {
      return i.join("");
    })
    .join("\n")
);
