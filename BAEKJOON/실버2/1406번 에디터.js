let [sentence, _, ...commands] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const enterWords = sentence.split("");
const right = enterWords;
const left = [];

commands.map((command) => {
  const [cmd, cmdWord] = command.split(" ");
  if (cmd === "L") {
    const lastWord = right.pop();
    if (lastWord === undefined) return;
    left.push(lastWord);
  }
  if (cmd === "D") {
    const lastWord = left.pop();
    if (lastWord === undefined) return;
    right.push(lastWord);
  }
  if (cmd === "B") {
    right.pop();
  }
  if (cmd === "P") {
    right.push(cmdWord);
  }
});

console.log(right.join("") + left.reverse().join(""));
