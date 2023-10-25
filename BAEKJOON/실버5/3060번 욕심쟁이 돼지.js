let [_, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const answer = [];

for (let i = 0; i < commends.length; i += 2) {
  const food = Number(commends[i]);
  const pigs = commends[i + 1].split(" ").map(Number);

  const a = howManyDaysCanGiveFood(food, pigs, 1);
  answer.push(a);
}

function howManyDaysCanGiveFood(food, pigs, day) {
  const todayFood = pigs.reduce((acc, cur) => acc + cur, 0);

  if (food < todayFood) return day;

  const tomorrowPigs = pigs.map((pig, index, array) => {
    const leftIndex = index === 0 ? array.length - 1 : index - 1;
    const rightIndex = index === array.length - 1 ? 0 : index + 1;
    const frontIndex = index <= 2 ? index + 3 : index - 3;

    return pig + array[frontIndex] + array[leftIndex] + array[rightIndex];
  });

  return howManyDaysCanGiveFood(food, tomorrowPigs, day + 1);
}

console.log(answer.join("\n"));
