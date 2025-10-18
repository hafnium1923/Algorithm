let nums = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("")
  .map(Number).sort((a,b) => b - a);

const hasZero  = nums.includes(0)
if(!hasZero){
    console.log(-1)
    return;
}

let plusNum = 0;

for(let i = 0; i<nums.length; i++){
    plusNum += nums[i];
}

if(plusNum % 3 !== 0){
    console.log(-1)
    return;
}

console.log(nums.join(''))