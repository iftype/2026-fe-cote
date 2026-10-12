```js
function solution(prices) {
  const result = Array(prices.length).fill(0);
  const stack = [];
  // 스택에 index를 넣어야할듯 원본 prices는 유지해줘야함
  // 2칸 건너 작은게 발견될 수는 없음
  // 0 1 2
  // prices를 비교함
  // 그리고 top prices가 더 클때까지 계속 해
  // result에는 index의 차이를 넣으면 됨
  for (let i = 0; i < prices.length; i++) {
    while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[i]) {
      const topIndex = stack.pop();
      result[topIndex] = i - topIndex;
    }

    stack.push(i);
  }

  while (stack.length > 0) {
    const topIndex = stack.pop();
    result[topIndex] = prices.length - 1 - topIndex;
  }

  return result;
}

// 특정 시점을 기준으로 앞에거 다 빼면 될듯
// 중요한건 push, pop의 시간복잡도가 상수시간이라는걸 기억하고 있어야했음
```
