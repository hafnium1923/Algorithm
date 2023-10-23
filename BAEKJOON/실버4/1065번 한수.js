let targetNumber = Number(
  require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
    .toString()
    .trim()
);

if (targetNumber < 100) {
  console.log(targetNumber);
  return;
}
let answer = 99;

for (let i = 100; i <= targetNumber; i++) {
  let value = [];
  let number = i;

  while (number > 0) {
    value.push(number % 10);
    number = Math.floor(number / 10);
  }

  value = value.reverse();

  const isArithmeticSequence = value.every((value, index, array) => {
    if (index === 0 || index === array.length - 1) return true;
    if (value - array[index - 1] === array[index + 1] - value) return true;

    return false;
  });

  if (isArithmeticSequence) answer++;
}

console.log(answer);
