## 풀이과정

slice해서 먼저 자른 다음에 sort로 정렬 후 해당 번째의 수를 뽑아서 결과 배열에 push하면 되겠다고 생각
인덱스는 0번부터 시작하기에 문제를 자세히 읽고 시작하니 헷갈리지 않고 바로 풀 수 있었다

```js
function solution(array, commands) {
  const answer = [];

  for (let i = 0; i < commands.length; i++) {
    let first = commands[i][0] - 1;
    let last = commands[i][1];
    let count = commands[i][2] - 1;

    answer.push(array.slice(first, last).sort((a, b) => a - b)[count]);
  }

  return answer;
}
```
