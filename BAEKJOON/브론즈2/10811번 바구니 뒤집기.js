let [input, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const array = Array.from(
  { length: input.split(" ").map(Number)[0] },
  (_, index) => index + 1
);

commends.map((commend) => {
  const [start, end] = commend.split(" ").map(Number);

  const reverseArray = array.splice(start - 1, end - start + 1).reverse();
  array.splice(start - 1, 0, ...reverseArray);
});

console.log(array.join(" "));
