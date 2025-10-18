let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim();

const NUM = Number(input)

const answer = []

for(let i = 1; i <= NUM; i++){
    let star = ''
    for(let j = 0; j < i; j++){
        star += '*'
    }

    answer.push(star)
}

console.log(answer.join('\n'))