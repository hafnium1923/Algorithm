let [info, graph, ...commond] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "example.txt")
  .toString()
  .trim()
  .split("\n");

graph = [-1, ...graph.split(" ").map(Number)];
const answer = [];

commond.forEach((line) => {
  const [x, y] = line.split(" ").map(Number);

  const MAX_COUNT = graph.length - 1;
  let right = MAX_COUNT;
  let left = y;

  while (left <= right) {
    const half = Math.floor((left + right) / 2);

    if (graph[half] < x) {
      right = half - 1;
    } else {
      left = half + 1;
    }
  }

  let count = right - y + 1;

  if (x < graph[y]) count += graph[y] - x; // 옆으로 쌓인 넴모

  answer.push(count);
});

console.log(answer.join("\n"));

/**
 * ⭐️이분탐색 - 요토의 코멘트⭐️
문제대로라면, 폭발시키는 부분의 y좌표 아래(=미만)의 넴모들은 전혀 답에 영향을 주지 않는다는 것을 알 수 있어. 그렇다면, 답을 구할 때도 y좌표 아래의 넴모들은 답에 영향을 주지 않도록 구현해야 될 거야. 
만약 left가 1, 0같이 고정된 값이라면 어떻게 될까? 이분 탐색의 범위로 y좌표 아래의 넴모들까지 탐색 범위에 들어가게 되서, 이 넴모들이 어떻게 배치되어 있느냐에 따라 답이 달라질 수 있어 (계산 후 y좌표만큼 답을 뺀다고 해도)
따라서, 그런 넴모들은 항상 고려하지 않도록, 다시 범위를 조정했어
let left = y; // <-- 수정
 
여기까지 하면, 이제 정확하게 탐색해야 하는 유효한 범위만을 이분 탐색으로 돌릴 수 있을거야
이분 탐색 이후 채택하는 변수 값의 문제
여기가 이분 탐색이 본격적으로 진행되는 곳이지?
```
while (left <= right) {
  const half = Math.floor((left + right) / 2);

  if (graph[half] < x) {  
    right = half - 1;
  } else {
    left = half + 1;
  }
}
```
graph[half] < x는 현재 y좌표에 넴모가 있는가를 판단하는 로직으로 보여, 넴모는 y좌표가 높아질수록 각 층에 있는 넴모의 수도 단조성을 띄며 줄어드니 어느 시점부터는 넴모가 없겠지
graph[half] >= x를 만족하는 가장 큰 값을 찾으려는 의도겠지? 그래야 그 칸까지 넴모가 있다는 것을 알 수 있으니까
그럼 지금 상황을 예전에 이야기했던 야매 용어인 긍정적인 상황, 부정적인 상황으로 이야기해볼게
그러면 루루가 적어준 graph[half] < x 인 경우는 그 자리에 넴모가 없는 상황이므로 조건을 만족하지 못하는, 부정적인 상황이야

실패한 경우니 더 높이를 낮추려고 하고 있고, 그 과정에서 right변수를 조작하고 있어
그렇기 때문에, 이분 탐색이 끝나면 최종적으로 사용해야 하는 값은 부정적인 상황에서 값 갱신에 사용했던 변수인 right값이 돼
만약 left값을 고른다면? 이 경우에는 마지막 범위의 이분탐색에서 실패한 경우 재빨리 값을 성공했던 값으로 바꿔줘야 하는데 left값은 그러한 갱신이 되지 않아 (마지막 상황은 left = right인 경우이고, 실패 시 right값이 바뀌므로 left는 그 값 그대로이게 된다) 
그래서 최종적으로 결정되는 값이 graph[half] < x인 값일 수도 있어, 이건 답이 될 수 없잖아?
그래서 --> right를 채택해 줘야 돼
right만 채택해준다면 그 이후의 공식은 비교적 쉬워지는데, 레이저를 쏘는 칸을 포함해 y좌표 방향으로 놓여진 넴모의 수는 아래 공식과 같아져
`right - y + 1`
 
이유는 right가 정확히 "y = 1부터 이 높이까지 넴모가 있습니다" 를 의미하는 값이 되고, 1 ~ y - 1까지는 제외하는 범위이기 때문이야 
따라서 right - (y - 1) = right - y + 1이 되는거야
따라서 이를 바탕으로, 기존 코드를 아래와 같이 바꿨어
```
- left === 0 ? (count = 0) : (count = left - y);
+ let count = right - y + 1;
```

여기까지 수정해주면 코드가 이제 돌아갈거야.
이 두 가지를 신경써주면 좋을듯?
이분 탐색의 범위를 어떻게 하면 좋을지 고려하기. 정한 범위가 답을 구하고자 하는 범위인지 확인하기.
이분 탐색이 끝난 후, left와 right 중 어느 값을 답으로 골라야 할 지 고민해보기
 
*/
