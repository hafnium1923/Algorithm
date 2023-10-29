function solution(new_id) {
  var answer = "";
  const lowerId = new_id.toLowerCase().split("");
  let removeNotAllowChar = lowerId
    .map((char, index, arr) => {
      if (char === ".") {
        if (arr[index + 1] === ".") return;
      }
      if (
        ("0" <= char && char <= "9") ||
        ("a" <= char && char <= "z") ||
        ("A" <= char && char <= "Z") ||
        char === "-" ||
        char === "_" ||
        char === "."
      )
        return char;
    })
    .join("")
    .split("");

  let afterDotPattern = removeNotAllowChar
    .map((char, index, arr) => {
      if (char === ".") {
        if (arr[index + 1] === ".") return;
      }
      return char;
    })
    .join("")
    .split("");

  if (afterDotPattern[0] === ".") afterDotPattern.splice(0, 1);

  if (afterDotPattern[afterDotPattern.length - 1] === ".")
    afterDotPattern.splice(-1, 1);

  if (afterDotPattern.length > 15) {
    afterDotPattern.splice(15);
  }
  if (afterDotPattern[afterDotPattern.length - 1] === ".")
    afterDotPattern.splice(-1, 1);

  if (afterDotPattern.length === 0) afterDotPattern = ["a"];

  answer = afterDotPattern.join("");
  if (answer.length <= 2) {
    answer = answer + answer[answer.length - 1].repeat(3 - answer.length);
  }
  return answer;
}
