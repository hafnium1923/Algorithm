let [info, ...rectangle] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const [ROW, COL, RecCount] = info.split(' ').map(Number)
const visited = Array.from({length:ROW},()=>Array.from({length:COL},()=>false))

rectangle.map((rec)=>{
    const [startC , startR, endC, endR] = rec.split(' ').map(Number)
    
    for(let i = startR; i < endR; i++){
        for(let j = startC; j < endC; j++){
            visited[i][j] = true;
        }
    }
})

const dr = [-1, 1, 0, 0];
const dc = [ 0, 0, 1, -1];

function bfs(visited, row, col) {
    const queue = [[row,col]]
    let queueIndex = 0;
    visited[row][col] = true;

    while(queue.length !== queueIndex){
        const [crrR,crrC] = queue[queueIndex]
        for(let i = 0; i < 4; i++){
            const nextR = crrR + dr[i]
            const nextC = crrC + dc[i]

            if(nextR >= 0 && nextR < ROW && nextC >=0 && nextC < COL && !visited[nextR][nextC]){
                queue.push([nextR,nextC])
                visited[nextR][nextC] = true;
            }
        }
        queueIndex++;
    }

    return queue.length
}

let answer = []

for(let i = 0; i < ROW; i++){
    for(let j = 0; j < COL; j++){
        if(!visited[i][j]){
           const size = bfs(visited, i, j);
            answer.push(size)
        }
    }
}

console.log(answer.length + '\n' +answer.sort((a,b)=>a-b).join(' '))
