## 정렬 - 가장 큰 수

### 걸린 시간: 10분

### 문제 풀기

숫자를 문자열로 바꿔서 전체를 내림차순으로 정렬하면 높은 자리 숫자가 앞으로 오지 않을까?

```ts
function solution(numbers) {
  const s = numbers.map((n) => n.toString());
  return s.sort().reverse().join('');
}
```

30이 3보다 먼저 나와야 하는데 나중에 나온다 흠..
우선 reverse는 정답이 아니다.
정렬할 때 a+b와 b+a (3, 30이라고 쳤을 때 330과 303을 비교하기)를 비교하자

```ts
function solution(numbers) {
  const s = numbers.map((n) => n.toString());
  return s.sort((a, b) => b + a - (a + b)).join('');
}
```

딱 하나 틀리는 거 보니까 예외 뭐 있나.. 0이 있네

### 최종 제출 코드

```ts
function solution(numbers) {
  const answer = numbers
    .map((n) => n.toString())
    .sort((a, b) => b + a - (a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
```

### 다른 사람 풀이 보기

```ts
function solution(numbers) {
  var answer = numbers
    .map((v) => v + '')
    .sort((a, b) => (b + a) * 1 - (a + b) * 1)
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
```

코드 똑같은적은 처음이네

### 반성

숫자 문자로 만들 떄 toString() 메서드 까먹었다.

### 다시 코드 작성해보기
