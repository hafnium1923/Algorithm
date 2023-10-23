let [yong, yu] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

for (let i = 0; yong < 5 && yu < 5; i++) {
  if (i % 2 === 0) {
    yu += yong;
  } else {
    yong += yu;
  }
}
if (yong >= 5) {
  console.log("yj");
} else if (yu >= 5) {
  console.log("yt");
}
