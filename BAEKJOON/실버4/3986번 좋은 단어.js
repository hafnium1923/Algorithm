let [INFO, ...WORDS] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

INFO = Number(INFO);
let answer = 0;

for (let i = 0; i < INFO; i++) {
  const words = WORDS[i].split("");
  const stack = [];

  for (let j = 0; j < words.length; j++) {
    if (stack.length === 0) {
      stack.push(words[j]);
    } else {
      if (words[j] === stack[stack.length - 1]) {
        stack.pop();
      } else stack.push(words[j]);
    }
  }

  if (stack.length === 0) answer++;
}

console.log(answer);
