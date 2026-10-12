## 힙 - 더 맵게

### 걸린 시간: 23:00 ~ 00:00 (체감상 3시간)

### 문제 풀기

배열을 트리로 구분하는 방법은 이미 알고있다. (왼쪽 자식: i2+1, 오른쪽 자식: i2+2, 부모: (i-1)/2 반내림)
최소 힙이라고 생각하자.
문제에 scoville 배열이 오름차순이라는 근거가 있나? -> 없다.. 근데 그렇다고 sort할 순 없다. 일단 배제하자.

```ts
섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)

1. while()에서 반복
2. startIndex=0, 0번, 1번 인덱스 스코빌부터 계산 시작. 계산이 끝나면 startIndex에 + 2
3. startIndex=2, 2번, 3번 인덱스 스코빌 계산 ... (반복)
4. 반복할 떄마다 count + 1
5. 반복할 때마다 startIndex 값이 K이상일 떄 break
```

```ts
function solution(scoville, K) {
  let count = 0;
  let startIndex = 0;

  let sArray = [...scoville];

  while (true) {
    if (sArray[startIndex] > K) break;

    const mixS = sArray[startIndex] + sArray[startIndex + 1] * 2;

    startIndex += 2;

    sArray = [mixS, ...sArray.slice(startIndex)].sort();

    count++;
  }

  return count;
}
```

sort때문에 당연히 터진다. sort를 하지 않고 계산한 값이 들어갈 위치가 어딘지 모를텐데.. 흠
문제점1. 애초에 문자열 배열이 아니라 숫자 배열이기 때문에 comparable하게 사용해야 함
문제점2. 초기 배열도 정렬해야 함
문제점3. 남은 요소가 1개인데 K 미만인 경우 -1 처리 필요
추가로, 현재 루프가 완료된 배열 sArray를 새로 만들었는데, startIndex가 필요 없어야 되지 않나? -> 0, 1로 변경

```ts
function solution(scoville, K) {
  let count = 0;

  let sArray = [...scoville].sort((a, b) => a - b);

  while (sArray.length !== 1) {
    if (sArray[0] > K) break;

    const mixS = sArray[0] + sArray[1] * 2;

    sArray = [mixS, ...sArray.slice(2)].sort((a, b) => a - b);

    count++;
  }

  if (sArray[0] < K) return -1;

  return count;
}
```

이전보다는 많이 통과하지만, 효율성에서 다 터진다.
최소 힙으로 원하는 인덱스에 값을 넣는 방식으로 구현해야 할 것 같다. 처음부터 풀어보자.

```ts
function solution(scoville, K) {
  let count = 0;

  let sArray = [...scoville].sort((a, b) => a - b);

  while (sArray.length !== 1) {
    if (sArray[0] > K) break;

    const mixS = sArray[0] + sArray[1] * 2;

    sArray = sArray.slice(2);

    // 맨 마지막에 추가한 후 부모와 비교하면서 올라가기
    sArray.push(mixS);

    let index = sArray.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      // 부모가 더 작으면 최소힙 만족
      if (sArray[parentIndex] <= sArray[index]) break;
      else {
        // 두 값을 교환한 후 인덱스 갱신 (구조분해할당)
        [sArray[parentIndex], sArray[index]] = [
          sArray[index],
          sArray[parentIndex],
        ];

        index = parentIndex;
      }
    }

    count++;
  }

  if (sArray[0] < K) return -1;

  return count;
}
```

일부 테스트와 효율성에서 또 터진다.. slice가 문제인가?
아 모르겠다 그냥 minHeap을 클래스로 구현하자

### 최종 제출 코드

```ts
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);

    let index = this.heap.length - 1;
    while (index > 0) {
      const pIndex = Math.floor((index - 1) / 2);

      // 부모가 작으면 잘 정렬되었으므로 break
      if (this.heap[pIndex] <= this.heap[index]) break;
      else {
        // 부모가 크면 자리 변경 후 인덱스 갱신
        [this.heap[pIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[pIndex],
        ];

        index = pIndex;
      }
    }
  }

  pop() {
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    // 루트 값을 보관
    const root = this.heap[0];

    // 마지막 값을 루트로 이동
    this.heap[0] = this.heap.pop();

    // 더 작은 자식과 교환하며 아래로 이동
    let index = 0;
    while (true) {
      const lIndex = index * 2 + 1;
      const rIndex = index * 2 + 2;

      if (lIndex > this.heap.length) break;
      if (rIndex > this.heap.length) break;

      // 더 작은 자식의 위치와 교환
      let smallIndex = lIndex;
      if (this.heap[lIndex] > this.heap[rIndex]) {
        smallIndex = rIndex;
      }

      // 부모가 작으면 종료
      if (this.heap[index] <= this.heap[smallIndex]) break;

      [this.heap[index], this.heap[smallIndex]] = [
        this.heap[smallIndex],
        this.heap[index],
      ];

      index = smallIndex;
    }

    // 보관한 루트 반환
    return root;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();

  for (const s of scoville) {
    heap.push(s);
  }

  let count = 0;
  while (true) {
    if (heap.peek() >= K) break;
    if (heap.size() <= 1) return -1;

    const s1 = heap.pop();
    const s2 = heap.pop();

    const mixS = s1 + s2 * 2;

    heap.push(mixS);

    count++;
  }

  return count;
}
```

이럴 줄 알았으면 C를 했지 JS에서 뭐하는건데 이게..

### 다른 사람 풀이 보기

대부분의 사람들이 클래스를 구현했고, 아닌 사람들 코드는 읽을 힘이 나지 않는다..

### 반성

pop() 메서드를 구현할 때 while()의 조건을 제대로 설정하지 않았다. 트리일수록 어떤 조건이 while()을 멈추는지를 잘 파악해야 한다. (힙에서는 왼쪽 자식이나 오른쪽 자식 인덱스가 배열의 길이보다 크면 break << 제일 중요)

### 다시 코드 작성해보기
