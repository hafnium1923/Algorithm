let [info, numbers] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

numbers = numbers.split(" ").map(Number);
info = Number(info);
const answer = Array.from({ length: info }, () => 0);

const numberInfo = Array.from(new Set([...numbers])).map((number) => {
  return {
    value: number,
    count: 0,
  };
});

numbers.forEach((number) => {
  const index = numberInfo.findIndex((num) => num.value === number);

  numberInfo[index].count++;
});

numberInfo.sort((a, b) => b.count - a.count);

const over = numberInfo.some(
  (number) => number.count >= Math.floor(info / 2) + 1
);

// 하나의 숫자라도 과반수 이상 가지고 있다면 불가능
if (over) {
  console.log(-1);
  return;
}

//가장 많이 반복된 친구부터 차례로 넣어줌
for (let i = 0; i < info; i++) {
  for (let j = 0; j < numberInfo.length; j++) {
    if (numbers[i] !== numberInfo[j].value && numberInfo[j].count !== 0) {
      answer[i] = numberInfo[j].value;
      numberInfo[j].count--;
      break;
    }
  }
}

const leftNumberInfo = numberInfo.filter((number) => number.count > 0); // 남은 수 정보
const emptyIndex = answer
  .map((number, i) => {
    if (number === 0) return i;
  })
  .filter((element) => element); // 비어있는 정답 인덱스들

emptyIndex.forEach((index) => {
  for (let i = 0; i < answer.length; i++) {
    if (i === index || answer[i] === 0) continue;

    for (let j = 0; j < leftNumberInfo.length; j++) {
      if (
        numbers[i] !== leftNumberInfo[j].value &&
        answer[i] !== numbers[index] &&
        leftNumberInfo[j].count !== 0
      ) {
        answer[index] = answer[i];
        answer[i] = leftNumberInfo[j].value;
        leftNumberInfo[j].count--;
        break;
      }
    }

    if (answer[index] !== 0) break;
  }
});

if (answer.findIndex((number) => number === 0) !== -1) {
  console.log(-1);
} else {
  console.log(answer.join(" "));
}
