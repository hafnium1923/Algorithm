function solution(queue1, queue2) {
  let answer = 0;
  const total = [...queue1, ...queue2];
  total.sort((a, b) => a - b);

  const totalPlus = total.reduce((acc, crr) => {
    return acc + crr;
  }, 0);

  if (totalPlus - total[total.length - 1] < total[total.length - 1]) return -1;
  if (totalPlus % 2 === 1) return -1;

  let index1 = 0;
  let index2 = 0;
  let totalQueue1 = queue1.reduce((acc, crr) => {
    return acc + crr;
  }, 0);
  let totalQueue2 = queue2.reduce((acc, crr) => {
    return acc + crr;
  }, 0);
  console.log(totalQueue1, totalQueue2);

  while (totalQueue1 !== totalQueue2 && answer <= 600000) {
    if (totalQueue1 > totalQueue2) {
      queue2.push(queue1[index1]);
      totalQueue1 -= queue1[index1];
      totalQueue2 += queue1[index1];
      index1++;
    } else if (totalQueue2 > totalQueue1) {
      queue1.push(queue2[index2]);
      totalQueue2 -= queue2[index2];
      totalQueue1 += queue2[index2];
      index2++;
    }

    answer++;
  }
  if (answer > 600000) return -1;

  return answer;
}
