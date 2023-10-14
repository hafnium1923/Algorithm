let [_, ...inputs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let white = 0;
let blue = 0;
const confettis = inputs.map((input) => input.split(" ").map(Number));

function Cutting(papers) {
  const isOneColor =
    papers.length === 1
      ? true
      : papers.every((paper, _, papers) => {
          const target = papers[0][0];
          return paper.every((paper) => {
            return paper === target;
          });
        });

  if (isOneColor) {
    papers[0][0] === 1 ? (blue += 1) : (white += 1);
    return;
  }

  const nextWidth = papers.length / 2;

  const box1 = papers
    .slice(0, nextWidth)
    .map((paper) => paper.slice(0, nextWidth));
  const box2 = papers
    .slice(0, nextWidth)
    .map((paper) => paper.slice(nextWidth));
  const box3 = papers
    .slice(nextWidth)
    .map((paper) => paper.slice(0, nextWidth));
  const box4 = papers.slice(nextWidth).map((paper) => paper.slice(nextWidth));

  Cutting(box1);
  Cutting(box2);
  Cutting(box3);
  Cutting(box4);
}

Cutting(confettis);

console.log(white + "\n" + blue);
