function solution(survey, choices) {
  var answer = "";
  const result = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  };
  survey.forEach((item, index) => {
    const [first, second] = item.split("");
    const score = choices[index];
    if (score < 4) {
      result[first] += 4 - score;
    }
    if (score > 4) {
      result[second] += score - 4;
    }
  });
  answer = calcResult(result);
  return answer;
}

function calcResult(result) {
  const answer = [];
  answer.push(result.R >= result.T ? "R" : "T");
  answer.push(result.C >= result.F ? "C" : "F");
  answer.push(result.J >= result.M ? "J" : "M");
  answer.push(result.A >= result.N ? "A" : "N");

  return answer.join("");
}
