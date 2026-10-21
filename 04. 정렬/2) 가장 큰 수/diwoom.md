## 풀이 과정

`sort()`를 사용해서 문자열로 비교한 다음 합치면 끝일 것 같다고 생각
`sort()`는 문자열을 기준으로 오름차순 정렬하기 때문에 reverse를 사용해서 내림차순으로 변경하면 될 것 같다

```js
function solution(numbers) {
  return numbers
    .sort()
    .reverse()
    .reduce((acc, number) => acc + number, '');
}
```

'30'과 '3'을 비교했을 때 3이 아닌 30이 앞에 오게 되어 330이 되어야 하지만 303이 되어버림.
그리고 reduce를 사용할 필요 없이 그냥 join을 사용해도 되지 않나?

localeCompare이라는 메서드가 있어서 사용해서 정렬함

그리고 '0000'인 경우 '0'이 반환되어야 하기에 return문에 분기문 추가

```js
function solution(numbers) {
  const result = numbers
    .sort((a, b) =>
      (String(b) + String(a)).localeCompare(String(a) + String(b)),
    )
    .join('');

  return result[0] === '0' ? '0' : result;
}
```
