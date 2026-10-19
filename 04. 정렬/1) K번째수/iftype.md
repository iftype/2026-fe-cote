# K번째 수

EZ - during 5 min ㅋ

```js
function solution(array, commands) {
    return [...commands].map(([f,s,t])=>{
        return [...array]
        .slice(f-1,s)
        .sort((a,b)=>a-b)
        [t-1]
    })
}
```

1. 처음 시작할 때 command 배열 갯수와 결과 배열 갯수가 같이 나오기 때문에 commands의 map 으로생각
2. 슬라이스 -> 소트 -> 콤보 따닥
