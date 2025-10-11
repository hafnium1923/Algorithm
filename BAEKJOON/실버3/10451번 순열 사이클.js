let [totalCase,...input] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

const answer = [];
for(let i = 0; i < Number(totalCase); i++){
    const nodeCount = Number(input[i * 2])
    const nodeList = [[], ...input[i * 2 + 1].split(' ').map((node, index)=>[index + 1,Number(node)])];
    const visitedList = Array.from({length: nodeCount + 1}, ()=> false)
   
    let count = 0;
     for(let i = 1; i < nodeList.length; i++){
        const [curr,next] = nodeList[i];

        if(visitedList[curr]) continue;  

        visitedList[curr] = true;
        dfs(next, nodeList, visitedList)
        count++;
    }
    answer.push(count)
}

console.log(answer.join('\n'))

function dfs(startNode, nodeList, visitedList) {
   visitedList[startNode] = true;

   const [_, next] = nodeList[startNode]

   if(!visitedList[next]){
    dfs(next, nodeList,visitedList)
   }
}