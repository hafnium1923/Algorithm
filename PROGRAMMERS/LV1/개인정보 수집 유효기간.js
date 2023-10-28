function solution(today, terms, privacies) {
  var answer = [];
  const endDay = [];

  const termsInfo = terms.map((term) => {
    const [type, period] = term.split(" ");
    return {
      type: type,
      period: Number(period),
    };
  });

  privacies.map((privacie, index) => {
    const [date, type] = privacie.split(" ");
    const period = termsInfo.find((info) => info.type === type).period;

    const isEnd = calculateDate(date, period, today);
    if (isEnd) answer.push(index + 1);
  });
  return answer;
}

function calculateDate(date, period, today) {
  let [year, month, day] = date.split(".").map(Number);

  if (day === 1) {
    if (month === 1) {
      year -= 1;
      month -= 1;
      day = 28;
    } else {
      month -= 1;
      day = 28;
    }
  } else {
    day -= 1;
  }
  month += period;

  if (month > 12) {
    if (month % 12 === 0) {
      year = year + Math.floor(month / 12) - 1;
      month = 12;
    } else {
      year = year + Math.floor(month / 12);
      month = month % 12;
    }
  }
  const [nowYear, nowMonth, nowDay] = today.split(".").map(Number);

  if (year > nowYear) return false;
  if (year === nowYear && month > nowMonth) return false;
  if (year === nowYear && month === nowMonth && day >= nowDay) return false;

  return true;
}
