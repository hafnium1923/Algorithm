let [n, ...input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const city = input.map((row)=> row.split(' ').map(Number));
const N = Number(n)

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const bfs = ( visited ,row, col, water) => {
    const queue=[[row,col]]
    let queueIndex = 0;
    visited[row][col] = true;

    while(queueIndex !== queue.length){
        const [crrR, crrC] = queue[queueIndex]
        for(let j = 0; j < 4; j++){
            const nextR = crrR+dr[j]
            const nextC = crrC+dc[j]

            if(nextR >= 0 && nextR < N && nextC >= 0 && nextC < N && !visited[nextR][nextC] && city[nextR][nextC] >= water){
                queue.push([nextR,nextC])
                visited[nextR][nextC] = true;
            }
        }
        queueIndex++;
    }
}

let i = 0; // 물 높이;
let big = 0;

while(1) {
    const visited = Array.from({length:N}, ()=> Array.from({length:N},() => false))

    let safe = 0;
    city.map((row, r)=>{
        row.map((col,c) => {
            if(!visited[r][c] && col >= i){
                bfs(visited, r, c, i);
                safe++;
            }
        })
    })

    big = Math.max(big,safe)

    if(safe === 0) break;

    i++;
}

console.log(big)