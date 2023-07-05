const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .split("\n")
  .map(Number);

const people = input[0];

const allAnswer = input.slice(1);

const cuteAnswer = allAnswer.reduce((acc, result) => {
  return acc + result;
}, 0);

const answer =
  cuteAnswer > people - cuteAnswer ? "Junhee is cute!" : "Junhee is not cute!";

console.log(answer);
