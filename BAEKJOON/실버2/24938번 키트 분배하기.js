let [INFO, KITS] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

INFO = Number(INFO);
const kits = KITS.split(" ").map(Number);
const avg = Math.floor(kits.reduce((acc, crr) => acc + crr, 0) / INFO);
let answer = 0;
let i = 0;

let queue = [];
let frontIndex = 0; //pop할 위치
kits.forEach((k, i) => {
  if (k > avg) {
    queue.push([i, k - avg]);
  }
});

while (i < kits.length) {
  if (kits[i] < avg) {
    let need = avg - kits[i];
    nextNeed(i, need);
  }

  i++;
}

console.log(answer);

function nextNeed(crrIndex, need) {
  const [index, rest] = queue[frontIndex]; //혼잡도를 작게할거면 가장 앞에 들어간애부터 해야함.

  if (rest > need) {
    queue[frontIndex] = [index, rest - need];
    answer += Math.abs(crrIndex - index) * need;
  } else if (rest === need) {
    frontIndex++;
    answer += Math.abs(crrIndex - index) * need;
  } else {
    // 줄수있는 양이 받아야하는 양보다 작음
    frontIndex++;
    answer += Math.abs(crrIndex - index) * rest;
    nextNeed(crrIndex, need - rest);
  }
}
