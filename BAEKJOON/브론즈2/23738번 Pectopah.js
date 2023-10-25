let [...inputs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("");

const inEnglish = (alphabet) => {
  if (
    alphabet === "A" ||
    alphabet === "K" ||
    alphabet === "M" ||
    alphabet === "O" ||
    alphabet === "T"
  ) {
    return alphabet.toLowerCase();
  }

  if (alphabet === "B") {
    return "v";
  }
  if (alphabet === "E") {
    return "ye";
  }
  if (alphabet === "H") {
    return "n";
  }
  if (alphabet === "P") {
    return "r";
  }
  if (alphabet === "C") {
    return "s";
  }
  if (alphabet === "Y") {
    return "u";
  }
  if (alphabet === "X") {
    return "h";
  }
};

const answer = inputs.map((input) => {
  return inEnglish(input);
});

console.log(answer.join(""));
