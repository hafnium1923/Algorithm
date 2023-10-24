let [inputs, peoples, ...commends] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [problemNums, peoplesNums, _] = inputs.split(" ").map(Number);
peoples = peoples.split(" ");
const solvingProblems = Array.from(Array(problemNums), () =>
  Array.from({ length: peoplesNums }, (_, index) => {
    return {
      name: peoples[index],
      start: null,
      end: null,
      result: null,
    };
  })
);

const answerArray = Array.from({ length: peoplesNums }, (_, index) => {
  return {
    name: peoples[index],
    result: 0,
  };
});

const NOT_RESOLVED = 1001; //시도는 했는데 못풀었다.
const NO_RESULT = 1002; //시도한 기록조차 없다

function recordProblem(problemNum, solveTime, name, result) {
  const nameIndex = solvingProblems[problemNum - 1].findIndex(
    (item) => item.name === name
  );

  const [hour, minute] = solveTime.split(":").map(Number);
  const time = hour * 60 + minute;

  if (result === "wrong") {
    if (solvingProblems[problemNum - 1][nameIndex].end !== null) return;
    if (solvingProblems[problemNum - 1][nameIndex].start === null) {
      solvingProblems[problemNum - 1][nameIndex].start = time;
    }
  }

  if (result === "solve") {
    if (solvingProblems[problemNum - 1][nameIndex].end === null) {
      solvingProblems[problemNum - 1][nameIndex].end = time;
    }
  }
}

function recordResult() {
  solvingProblems.forEach((solvingProblem) => {
    solvingProblem.forEach((personalRecord) => {
      if (personalRecord.start !== null && personalRecord.end !== null) {
        personalRecord.result = personalRecord.end - personalRecord.start;
      }

      if (personalRecord.start === null && personalRecord.end !== null) {
        personalRecord.result = NO_RESULT;
      }

      if (personalRecord.start === null && personalRecord.end === null) {
        personalRecord.result = NO_RESULT;
      }

      if (personalRecord.start !== null && personalRecord.end === null) {
        personalRecord.result = NOT_RESOLVED;
      }
    });
  });
}

function calculateResult() {
  solvingProblems.forEach((solvingProblem) => {
    solvingProblem.sort((a, b) => {
      if (a.result === b.result) return a.name.localeCompare(b.name);
      return a.result - b.result;
    });

    solvingProblem.map((personalRecord, index, array) => {
      const totalScore =
        personalRecord.result === NOT_RESOLVED
          ? array.length
          : personalRecord.result === NO_RESULT
          ? array.length + 1
          : index + 1;
      personalRecord.result = totalScore;
    });
  });
}

function calculateAnswer() {
  solvingProblems.forEach((solvingProblem) => {
    solvingProblem.forEach((personalRecord, index) => {
      const answerIndex = answerArray.findIndex(
        (a) => a.name === personalRecord.name
      );
      answerArray[answerIndex].result += personalRecord.result;
    });
  });

  answerArray.sort((a, b) => {
    if (a.result === b.result) return a.name.localeCompare(b.name);
    return a.result - b.result;
  });
}
commends.map((commend) => {
  let [problemNum, solveTime, name, result] = commend.split(" ");
  recordProblem(Number(problemNum), solveTime, name, result);
});

recordResult();
calculateResult();
calculateAnswer();

const answer = answerArray.map((item) => item.name).join("\n");
console.log(answer);
