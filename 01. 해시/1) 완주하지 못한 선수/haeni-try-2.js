function solution(participant, completion) {
  const map = new Map();

  participant.forEach((part) => map.set(part, (map.get(part) || 0) + 1));
  completion.forEach((part) => map.set(part, map.get(part) - 1));

  for (const [key, value] of map) {
    if (value > 0) {
      return key;
    }
  }
}
