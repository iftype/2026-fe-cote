function solution(numbers) {
  // 풀이
  // 숫자를 문자열로 변환 -> 두 문자열을 앞뒤로 이어 붙여서 정렬 -> 모든 원소가 0이면 0으로 반환
  const result = numbers.map((number) => number.toString());
  const answer = result.sort((a, b) => b + a - (a + b)).join("");
  return answer[0] === "0" ? "0" : answer;
}
