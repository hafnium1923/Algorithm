let [size, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let answer = [];
for (let i = 0; i < Number(size); i++) {
  const [_, target] = commends[i * 2].split(" ").map(Number);
  let targetIndex = target;
  const paper = commends[i * 2 + 1].split(" ").map(Number);
  let frontIndex = -1;
  let count = 0;

  while (targetIndex !== frontIndex) {
    const max = Math.max(...paper.slice(frontIndex + 1));

    if (paper[frontIndex + 1] === max) {
      count++;
    }

    if (paper[frontIndex + 1] < max) {
      paper.push(paper[frontIndex + 1]);
      if (frontIndex + 1 === targetIndex) {
        targetIndex = paper.length - 1;
      }
    }

    frontIndex++;
  }
  answer.push(count);
}

console.log(answer.join("\n"));
