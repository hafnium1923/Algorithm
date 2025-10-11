let [initE,initS,initM] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split(" ").map(Number);

// E,S,M 의 최대 값
const MaxE = 15; 
const MaxS = 28;
const MaxM = 19;

// E,S,M 의 초기값
let e = initE;
let s = initS;
let m = initM;

while (1){
  if(e === s && s === m){
    break;
  }

  const small = Math.min(e,s,m)

  if(small === e) {
    e += MaxE;
  }
  else if(small === s) {
    s += MaxS;
  }
  else if(small === m) {
    m += MaxM;
  }
}

console.log(e)