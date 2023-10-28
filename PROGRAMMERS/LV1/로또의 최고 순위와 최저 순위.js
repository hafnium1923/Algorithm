function solution(lottos, win_nums) {
  var answer = [];
  let high = 0;
  let low = 0;

  lottos.map((lotto) => {
    if (lotto === 0) {
      high++;
      return;
    }
    const isWinNum = win_nums.includes(lotto);
    if (isWinNum) {
      high++;
      low++;
    }
  });

  answer[0] = high >= 2 ? 7 - high : 6;
  answer[1] = low >= 2 ? 7 - low : 6;

  return answer;
}
