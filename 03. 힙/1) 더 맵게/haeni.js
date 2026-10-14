class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(value) {
    const heap = this.heap;
    heap.push(value);

    let currentIndex = heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (heap[parentIndex] <= heap[currentIndex]) break;

      [heap[parentIndex], heap[currentIndex]] = [
        heap[currentIndex],
        heap[parentIndex],
      ];
      currentIndex = parentIndex;
    }
  }

  pop() {
    const heap = this.heap;
    if (heap.length === 0) return undefined;

    const minValue = heap[0];
    const lastValue = heap.pop();

    if (heap.length > 0) {
      heap[0] = lastValue;

      let currentIndex = 0;
      const heapLength = heap.length;

      while (true) {
        const leftChildIndex = currentIndex * 2 + 1;
        const rightChildIndex = currentIndex * 2 + 2;
        let smallestIndex = currentIndex;

        if (
          leftChildIndex < heapLength &&
          heap[leftChildIndex] < heap[smallestIndex]
        ) {
          smallestIndex = leftChildIndex;
        }
        if (
          rightChildIndex < heapLength &&
          heap[rightChildIndex] < heap[smallestIndex]
        ) {
          smallestIndex = rightChildIndex;
        }
        if (smallestIndex === currentIndex) break;

        [heap[smallestIndex], heap[currentIndex]] = [
          heap[currentIndex],
          heap[smallestIndex],
        ];
        currentIndex = smallestIndex;
      }
    }

    return minValue;
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();
  scoville.forEach((scovilleValue) => heap.push(scovilleValue));

  let mixCount = 0;
  while (heap.peek() < K) {
    if (heap.size() < 2) return -1;

    const mildestFood = heap.pop();
    const secondMildestFood = heap.pop();
    heap.push(mildestFood + secondMildestFood * 2);
    mixCount++;
  }

  return mixCount;
}
