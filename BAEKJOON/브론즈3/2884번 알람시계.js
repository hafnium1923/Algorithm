let [hour, minute] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

minute -= 45;

if (minute < 0) {
  hour -= 1;
  minute = 60 + minute;
}

if (hour < 0) hour = 23;

console.log(hour, minute);
