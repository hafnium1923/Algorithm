const [...sounds] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("");

const ducks = Array.from({ length: 500 }, () => []);
let answer = 1;

for (let j = 0; j < sounds.length; j++) {
  const word = sounds[j];
  let isRightSound = false;

  for (let i = 0; i < answer; i++) {
    if (word === "q" && ducks[i].length === 0) {
      ducks[i].push(word);
      isRightSound = true;
      break;
    }
    if (
      word === "u" &&
      ducks[i].length !== 0 &&
      ducks[i][ducks[i].length - 1] === "q"
    ) {
      ducks[i].push(word);
      isRightSound = true;
      break;
    }
    if (
      word === "a" &&
      ducks[i].length !== 0 &&
      ducks[i][ducks[i].length - 1] === "u"
    ) {
      ducks[i].push(word);
      isRightSound = true;
      break;
    }
    if (
      word === "c" &&
      ducks[i].length !== 0 &&
      ducks[i][ducks[i].length - 1] === "a"
    ) {
      ducks[i].push(word);
      isRightSound = true;
      break;
    }
    if (
      word === "k" &&
      ducks[i].length !== 0 &&
      ducks[i][ducks[i].length - 1] === "c"
    ) {
      ducks[i].push(word);
      if (ducks[i].join("") === "quack") {
        isRightSound = true;
        ducks[i] = [];
      }
      break;
    }
  }

  if (!isRightSound && word === "q") {
    ducks[answer].push(word);
    answer++;
    isRightSound = true;
  }

  if (!isRightSound) {
    answer = -1;
    break;
  }
}

answer = ducks.findIndex((duck) => duck.length !== 0) === -1 ? answer : -1;

console.log(answer);
