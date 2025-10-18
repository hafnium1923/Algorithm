// 브루투포스
let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim();

const Num = Number(input)

let count = 0;
let i = 1

while(1) {
    if(String(i).includes('666')){
        count++;
    }
    if(count === Num){
        console.log(i)
        break;
    }
    i++;
}