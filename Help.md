## 출력

정답을 출력하실 때는 console.log() 을 사용해 주시면 됩니다. 문제에서 요구한 조건과 동일하게 출력 해 주세요! 온보딩 A번 문제에서는 아래와 같이 출력하면 정답을 받을 수 있습니다.

console.log('Hello World!');
이 문제의 경우 출력을 딱 한 번 하는 것으로 정답을 출력할 수 있었지만, 문제를 푸시다 보면 굉장히 많은 횟수의 출력을 해야 하는 경우가 생깁니다. 예를 들어,  
$100\;000$  줄의 출력을 해야 한다든지요.
이런 상황에서는 각 줄을 출력할 때마다 console.log() 을 사용하실 경우 시간 초과 를 받으실 수 있습니다. console.log() 는 굉장히 느리기 때문입니다.

매번 console.log() 를 사용하는 대신 정답을 저장해 둘 문자열을 하나 선언하시고, 모든 정답을 합쳐서 출력한다면 console.log() 한 번만으로 정답을 출력할 수 있습니다.

```
let answer = '';

for (let i = 0; i < 100000; i++) {
  answer += getAnswer() + '\n';
}

console.log(answer);
```

## 입력

백준에서 JavaScript로 입력을 받는 방식이 꽤나 골치 아프지만, 온보딩 B번 문제 를 풀면서 조금이나마 익숙해져 봅시다.

### fs 모듈

node.js 에서 입력을 받는 방식은 fs 모듈을 사용하는 방법과 readline 모듈을 사용하는 방법이 있습니다. 원하시는 방식을 사용하시되, 이후의 예제에서는 훨씬 자주 쓰이는 fs 모듈을 사용하는 방식으로 적겠습니다. 기본적으로는 아래의 코드를 실행해 주시면 input 에 입력 데이터 전체가 저장됩니다. 이후 저장된 데이터를 용도에 맞게 가공하시면 됩니다.

```
input = require('fs').readFileSync(0, 'utf-8');
```

### 한 줄의 정수를 입력받는 경우

정수를 입력받는 경우이기에, Number() 를 사용하였습니다.

```
const input = Number(require('fs').readFileSync("/dev/stdin"));
console.log(input); // 1
```

### 여러 줄의 정수를 입력받는 경우

뜬금없이 trim() 이 들어가 있는 이유는, 기본적으로 입력의 끝에 불필요한 줄바꿈 문자가 하나 포함되기에, 이를 지워줘야 하기 때문입니다.

```
const input = require('fs').readFileSync("/dev/stdin").toString().trim().split("\n").map(Number);
console.log(input); // [1, 2, 3]
```
