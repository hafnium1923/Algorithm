let [inputs, ...windows] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [row, cal] = inputs.split(" ").map(Number);
const answer = Array.from({ length: 5 }, () => 0);

for (let i = 0; i < 5 * row; i += 5) {
  let blinds = [];
  const blindCount = Array.from({ length: cal }, () => 0);

  for (let j = 1; j <= 4; j++) {
    const a = windows[i + j].split("#").filter(Boolean);
    blinds.push(a);
  }

  blinds.forEach((blind) => {
    blind.map((b, i) => {
      if (b === "****") blindCount[i]++;
    });
  });

  blindCount.forEach((count) => {
    answer[count]++;
  });
}

console.log(answer.join(" "));
