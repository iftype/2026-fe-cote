function solution(scoville, K) {
  const heap = new Heap();
  scoville.forEach((s) => heap.push(s));

  let count = 0;
  while (heap.heap[0] < K) {
    if (heap.size() < 2) return -1;
    count++;
    const a = heap.pop();
    const b = heap.pop();
    const sum = a + b * 2;
    heap.push(sum);
  }
  return count;
}
class Heap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[index]) break;
      this.swap(index, parentIdx);
      index = parentIdx;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }
}
