let [count, ...parenthesisString] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const answers = [];
for (let i = 0; i < count; i++) {
  const parenthesis = parenthesisString[i].split("");
  const string = [];
  while (parenthesis.length !== 0) {
    const last = parenthesis.pop();
    if (last === ")") string.push(last);
    if (last === "(") {
      const a = string.pop();
      if (a === undefined) {
        string.push(a);
        break;
      }
    }
  }

  if (parenthesis.length !== 0 || string.length !== 0) answers.push("NO");
  else answers.push("YES");
}

console.log(answers.join("\n"));
