let [INFO, minScores, getScores] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = INFO.split(" ").map(Number);
minScores = minScores.split(" ").map(Number);
getScores = getScores.split(" ").map(Number);

let leftTime = N * 24; //남은 공부할 수 있는 시간
let answer = 0;

const byPerfectScores = minScores
  .map((score, i) => {
    return {
      min: score, //최소점수
      get: getScores[i], //한시간마다 얻는 점수
      optimalTime: Math.floor((100 - score) / getScores[i]), // 100 이하의 최대 점수 받는 최적시간
    };
  })
  .sort((a, b) => b.get - a.get); //한시간만다 얻는 점수가 많을수록 효율 업

const leftPerfectTimes = byPerfectScores
  .map((score) => {
    return 100 - (score.min + score.get * score.optimalTime);
  })
  .sort((a, b) => b - a);
//100에 딱 맞아떨어지지 않는 애들마다 얼마나 부족한지 구함(최적시간을 구했기 때문에 무조건 한시간 분량으로 남은 점수 올릴 수 있음)

let i = 0; //byPerfectScores의 인덱스
let j = 0; //leftPerfectTimes의 인덱스

while (i < M) {
  const { min, get, optimalTime } = byPerfectScores[i];

  while (leftPerfectTimes[j] > get && leftTime > 0 && j < M) {
    // 만약 이번에 한시간만다 올리는 점수보다 100점까지 남은 점수가 더 크면, 남은 점수부터 투자
    answer += leftPerfectTimes[j];
    j++;
    leftTime--;
  }

  if (optimalTime <= leftTime && leftTime > 0) {
    answer += min + get * optimalTime;
    leftTime -= optimalTime;
  } else if (optimalTime > leftTime && leftTime > 0) {
    answer += min + get * leftTime;
    leftTime -= leftTime;
  } else {
    // 남은시간이 없다는 뜻 -> 최소 점수만 얻을 수 있음
    answer += min;
  }

  i++;
}

while (leftTime > 0 && j < M) {
  // 시간이 남아있고 아직 모든 과목이 100점이 아닐때
  answer += leftPerfectTimes[j];
  j++;
  leftTime--;
}
console.log(answer);
