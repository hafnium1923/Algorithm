let [...inputs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const clock = [];
const answer = [];
inputs.forEach((input) => {
  const a = input.split(" ");
  clock.push(a);
});
for (let i = 0; i < 4; i++) {
  const brokenNumber = clock
    .map((item) => {
      return item[i];
    })
    .join("")
    .split("");
  answer.push(guessNumber(brokenNumber));
}

function guessNumber(brokenNumber) {
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (brokenNumber[0] === "#") {
    let index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);
  }

  if (brokenNumber[1] === "#") {
    let index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 4);
    index !== -1 && number.splice(index, 1);
  }
  if (brokenNumber[2] === "#") {
  }

  if (brokenNumber[3] === "#") {
    let index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 2);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 3);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 7);
    index !== -1 && number.splice(index, 1);
  }
  if (brokenNumber[4] === "#") {
  }
  if (brokenNumber[5] === "#") {
    let index = number.findIndex((item) => item === 5);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 6);
    index !== -1 && number.splice(index, 1);
  }

  if (brokenNumber[6] === "#") {
    let index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 7);
    index !== -1 && number.splice(index, 1);
  }
  if (brokenNumber[7] === "#") {
    let index = number.findIndex((item) => item === 0);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 7);
    index !== -1 && number.splice(index, 1);
  }
  if (brokenNumber[8] === "#") {
  }

  if (brokenNumber[9] === "#") {
    let index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 3);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 4);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 5);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 7);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 9);
    index !== -1 && number.splice(index, 1);
  }
  if (brokenNumber[10] === "#") {
  }
  if (brokenNumber[11] === "#") {
    let index = number.findIndex((item) => item === 2);
    index !== -1 && number.splice(index, 1);
  }

  if (brokenNumber[12] === "#") {
    let index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 4);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 7);
    index !== -1 && number.splice(index, 1);
  }
  if (brokenNumber[13] === "#") {
    let index = number.findIndex((item) => item === 1);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 4);
    index !== -1 && number.splice(index, 1);

    index = number.findIndex((item) => item === 7);
    index !== -1 && number.splice(index, 1);
  }
  if (brokenNumber[14] === "#") {
  }
  return number[0];
}

console.log(`${answer[0]}${answer[1]}:${answer[2]}${answer[3]}`);
