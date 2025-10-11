let [F,S,G,U,D] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split(" ").map(Number);

const visited = Array.from({length:F + 1} ,() => false)
const count = Array.from({length:F + 1} ,() => false)

bfs(S)

function bfs(startNode){
    const queue = [startNode]
    count[startNode] = 0;
    visited[startNode] = true;
    let queueIndex = 0;

    while(queueIndex !== queue.length){
        const curr = queue[queueIndex]
        const currCount = count[curr]

        if(curr === G){
            console.log(currCount)
            return;
        }
        const upNext = curr + U
        const downNext = curr - D
        if(upNext <= F && !visited[upNext]){
            queue.push(upNext)
            count[upNext] = currCount + 1
            visited[upNext]=true;
        }
         if(downNext >= 1 && !visited[downNext]){
            queue.push(downNext)
            count[downNext] = currCount + 1
            visited[downNext]=true;
        }
        queueIndex++;
    }

    console.log('use the stairs')
}