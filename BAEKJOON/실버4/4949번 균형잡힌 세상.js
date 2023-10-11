let [...input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const answer = [];

input.forEach((sentence) => {
  const words = sentence.split("");
  if (words.length === 1 && words[0] === ".") return;

  const bracket = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i] === "(" || words[i] === "[") bracket.push(words[i]);

    if (words[i] === ")") {
      const now = bracket.pop();
      if (now !== "(") {
        answer.push("no");
        break;
      }
    }
    if (words[i] === "]") {
      const now = bracket.pop();
      if (now !== "[") {
        answer.push("no");
        break;
      }
    }

    if (i === words.length - 1)
      if (bracket.length === 0) answer.push("yes");
      else answer.push("no");
  }
});

console.log(answer.join("\n"));
