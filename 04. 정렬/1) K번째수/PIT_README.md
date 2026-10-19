## 정렬 - K번째수

### 걸린 시간: 10분

### 문제 풀기

로직만 보면 간단할 것 같은데..

```text
1. i~j 인덱스로 slice
2. slice한 배열 sort
3. sort한 배열에서 k 인덱스 값 가져오기
4. 위 과정 반복하기
```

```ts
function solution(array, commands) {
  return commands.map((c) => {
    const sliced = array.slice(c[0] - 1, c[1] - 1);
    const sorted = sliced.sort((a, b) => a - b);
    return sorted[c[2] - 1];
  });
}
```

답이 [5, 6, 3]이여야 하는데 [6, null, 3]이 뜬다. null은 뭐지?
splice의 두 번째 인덱스는 해당 값을 제외시킨다. 포함하고 싶은 인덱스 + 1로 전달해야 함!

```ts
function solution(array, commands) {
  return commands.map((c) => {
    const sliced = array.slice(c[0] - 1, c[1]);
    const sorted = sliced.sort((a, b) => a - b);
    return sorted[c[2] - 1];
  });
}
```

체이닝 써서 정리해보자

```ts
function solution(array, commands) {
  return commands.map((c) => {
    return array.slice(c[0] - 1, c[1]).sort((a, b) => a - b)[c[2] - 1];
  });
}
```

### 최종 제출 코드

```ts
function solution(array, commands) {
  return commands.map((c) => {
    return array.slice(c[0] - 1, c[1]).sort((a, b) => a - b)[c[2] - 1];
  });
}
```

### 다른 사람 풀이 보기

```ts
function solution(array, commands) {
  return commands.map((command) => {
    const [sPosition, ePosition, position] = command;
    const newArray = array
      .filter(
        (value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1,
      )
      .sort((a, b) => a - b);

    return newArray[position - 1];
  });
}
```

명시적으로 포지션 인덱스 빼놓는 것도 좋은 선택인듯? 직관성 레전드

### 반성

`slice()` 메서드의 끝 범위는 인덱스+1을 해줘야 한다. 명심하도록

### 다시 코드 작성해보기
