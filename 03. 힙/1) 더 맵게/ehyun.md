```js
// root index = 0;

class MinHeap {
  #heap;

  constructor(numArray) {
    this.#heap = [];
    for (let num of numArray) {
      this.push(num);
    }
  }

  size() {
    return this.#heap.length;
  }

  peek() {
    return this.#heap[0];
  }

  push(value) {
    this.#heap.push(value);
    this.#upHeap();
  }

  #upHeap() {
    let currentIndex = this.#heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.#heap[parentIndex] <= this.#heap[currentIndex]) break;
      this.#swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  pop() {
    if (this.#heap.length === 0) return null;
    if (this.#heap.length === 1) return this.#heap.pop();

    const top = this.#heap[0];
    // 마지막 노드를 맨 위로 올림
    const lastNode = this.#heap.pop();
    this.#heap[0] = lastNode;

    this.#downHeap();

    return top;
  }

  #downHeap() {
    let currentIndex = 0;
    // 더 크거나 자식이 length보다 크면 멈춤
    while (true) {
      let minChildIndex = currentIndex * 2 + 1; // 왼쪽부터 검사
      if (minChildIndex > this.#heap.length - 1) return;
      if (
        currentIndex * 2 + 2 <= this.#heap.length - 1 &&
        this.#heap[minChildIndex] > this.#heap[currentIndex * 2 + 2]
      )
        minChildIndex = currentIndex * 2 + 2;

      if (this.#heap[minChildIndex] >= this.#heap[currentIndex]) break;
      this.#swap(currentIndex, minChildIndex);
      currentIndex = minChildIndex;
    }
  }

  #swap(a, b) {
    const tmp = this.#heap[a];
    this.#heap[a] = this.#heap[b];
    this.#heap[b] = tmp;
  }
}

function makeNew(min, secondMin) {
  return min + secondMin * 2;
}

function solution(scoville, K) {
  const minHeap = new MinHeap(scoville);
  let makeCount = 0;

  while (true) {
    if (minHeap.peek() >= K) break;
    if (minHeap.size() < 2) return -1;

    const first = minHeap.pop();
    const second = minHeap.pop();

    const mixed = makeNew(first, second);
    minHeap.push(mixed);
    makeCount++;
  }

  return makeCount;
}
```
