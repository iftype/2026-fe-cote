function solution(array, commands) {
  var answer = [];
  for (let i = 0; i < commands.length; i++) {
    const [start, end, k] = commands[i];
    const sorted = array.slice(start - 1, end).sort((a, b) => a - b);
    answer.push(sorted[k - 1]);
  }
  return answer;
}
