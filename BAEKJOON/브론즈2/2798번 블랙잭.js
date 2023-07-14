const [num1, num2] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [size, standard] = num1.split(" ").map(Number);

const [...cards] = num2.split(" ").map(Number);

let big = 0;

for (let i = 0; i < cards.length - 2; i++) {
  for (let j = i + 1; j < cards.length - 1; j++) {
    for (let k = j + 1; k < cards.length; k++) {
      const calc = cards[i] + cards[j] + cards[k];
      if (big < calc && calc <= standard) {
        big = calc;
      }
    }
  }
}

console.log(big);
