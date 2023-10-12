let [birdCount, ...etc] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

let sentences = new Array(Number(birdCount));
let sentencesIndex = Array.from({ length: Number(birdCount) }, () => 0);
let cseteram = [];

etc.forEach((sentence, i) => {
  if (i < birdCount) sentences[i] = sentence.split(" ");
  else cseteram = sentence.split(" ");
});

const a = cseteram.every((word) => {
  for (let i = 0; i < birdCount; i++) {
    if (word === sentences[i][sentencesIndex[i]]) {
      sentencesIndex[i]++;
      return true;
    }
  }
});

const totalWordNumber = sentences.reduce((acc, sentence) => {
  return acc + sentence.length;
}, 0);

if (totalWordNumber !== cseteram.length) console.log("Impossible");
else console.log(a ? "Possible" : "Impossible");
