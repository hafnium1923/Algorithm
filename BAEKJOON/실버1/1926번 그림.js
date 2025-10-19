let [info, ...nodes] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [N,M]= info.split(' ').map(Number);
const pictures = nodes.map((row)=> row.split(' ').map(Number))
const visited = Array.from({length:N},() => Array.from({length:M},()=> false))

const answer = []
const dr = [-1, 1, 0, 0]
const dc = [0, 0, -1, 1]

function bfs(row, col) {
    const queue = [[row,col]]
    let queueIndex = 0;
    visited[row][col] = true

    while(queueIndex !==queue.length){
        const [crrR, crrC] = queue[queueIndex]
        for(let i = 0; i < 4; i++){
            const nextR = crrR + dr[i];
            const nextC = crrC + dc[i];

            if(nextR >= 0 && nextR < N && nextC >= 0 && nextC < M && !visited[nextR][nextC] && pictures[nextR][nextC]){
                visited[nextR][nextC] = true;
                queue.push([nextR,nextC]);
            }
        }
        queueIndex++;
    }

    answer.push(queue.length)
}

pictures.forEach((row,r)=>{
    row.forEach((col,c)=>{
        if(col === 1 && !visited[r][c]){
            bfs(r,c)
        }
    })
})

const big = answer.length ? Math.max(...answer) : 0
console.log(answer.length + '\n' + big)