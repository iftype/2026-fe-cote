function solution(prices) {
  // 각 시점마다 이후 가격을 하나씩 보면서 1초씩 셈.
  // 현재 가격보다 낮은 가격을 만나면 그 1초까지 포함하고 멈춘다.
  // 끝까지 떨어지지 않으면 남은 시간 전체가 센 값이 된다.
  // 어느 경우든 센 시간이 가격이 떨어지지 않은 기간이므로 push한다.

  var answer = [];

  for (let i = 0; i < prices.length; i++) {
    let time = 0;

    for (let j = i + 1; j < prices.length; j++) {
      time++;

      if (prices[i] > prices[j]) {
        break;
      }
    }

    answer.push(time);
  }
  return answer;
}
