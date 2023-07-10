let [num, cards] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

cards = cards.split(" ").map(Number);

cards.sort((a, b) => {
  if (a > b) return 1;
  if (a === b) return 0;
  if (a < b) return -1;
});

const rslt = cards.reduce((acc, current, index, cards) => {
  if (current - cards[index - 1] === 1) return acc;
  return acc + current;
}, 0);

console.log(rslt);
