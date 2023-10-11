let [sentence, bomb] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let words = sentence.split("");
let bombWords = bomb.split("");
let storage = [];
let temp = [];

for (let i = 0; i < sentence.length; i++) {
  const lastWord = words.pop();
  storage.push(lastWord);

  if (storage.length >= bombWords.length && lastWord === bombWords[0]) {
    let flag = 1;

    for (let j = 0; j < bombWords.length; j++) {
      const a = storage.pop();
      temp.push(a);

      if (bombWords[j] !== a) {
        flag = 0;
        break;
      }
    }

    if (flag === 0) storage.push(...temp.reverse());
    temp = [];
  }
}

if (storage.length === 0) console.log("FRULA");
else console.log(storage.reverse().join(""));
