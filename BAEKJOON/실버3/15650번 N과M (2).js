//조합
const [N, M] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const array = Array.from({ length: N }, (_, i) => i + 1);
const answer = combination(array, M);

console.log(answer.map((line) => line.join(" ")).join("\n"));

function combination(arr, rest) {
  const returnArr = [];

  if (rest === 1) {
    return [...arr.map((item) => [item])];
  }
  arr.forEach((now, i, origin) => {
    const nextArr = origin.slice(i + 1);

    if (rest - 1 <= nextArr.length) {
      returnArr.push(
        ...combination(nextArr, rest - 1).map((item) => [now, ...item])
      );
    }
  });

  return [...returnArr];
}
