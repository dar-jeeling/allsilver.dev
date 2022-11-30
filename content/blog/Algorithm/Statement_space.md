---
title: 'BFS - 상태 공간 정의하기'
date: 2022-11-23 23:00:00
category: 'Algorithm'
draft: false
---

# 상태 공간 정의하기

BFS 등의 그래프 탐색을 이용할 때, 엄밀하게 말해서 그래프는 `상태 공간` 을 의미한다.

이러한 문제에서 BFS는 특히나 **거리를 구하기 위한 도구**로 사용되는 일이 많다.

예를 들어, 최단 거리를 구하는 경우 최단 거리를 저장하는 `dist[x][y]` 배열은 좌표 `(x, y)`의 `거리를 저장하는 상태 공간` 이다.

이 내용을 응용하여 **좌표 x, y 에 대한 z 상태일 때의 거리** 를
`dist[x][y][z]` 같은 방식으로 활용할 수 있다.

또한 이러한 문제의 공통점은 방문을 위해 좌표들을 큐에 넣을 때, 해당 좌표에서의 **현재 상태도 함께** 넣어줘야 한다는 것이다.

# 관련 문제 및 요약

- [BOJ 2206 벽 부수고 이동하기](https://www.acmicpc.net/problem/2206)

    <details>
    <summary><b>요약</b></summary>
    <div markdown="1">

  이 문제에서 관찰하고자 하는 상태는

    <ol>
        <li><b>벽을 부순 상태에서 현재 좌표까지의 거리</b></li>
        <li><b>벽을 부수지 않은 상태에서 현재 좌표까지의 거리</b></li>
    </ol>
    이다.

  따라서 큐에 좌표를 넣을 때 좌표와 함께 현재 벽을 부쉈는지, 부수지 않았는지 여부를 넣어주고

  상태 공간 역시 벽을 부순 상태 공간과 벽을 부수지 않은 상태 공간을 나누어 거리를 측정한다.

    </div>
    </details>

- [BOJ 1600 말이 되고픈 원숭이](https://www.acmicpc.net/problem/1600)

  <details>
    <summary><b>요약</b></summary>
    <div markdown="1">

  이 문제에서 관찰하고자 하는 상태는 **말의 이동을 `count` 번 하였을 때의 거리**이다.

  따라서 큐에 좌표를 넣을 때, 현재 좌표와 함께 말의 이동을 사용한 횟수를 함께 넣어주고

  상태 공간 역시 `count` 에 따라서 해당 `count` 때의 현재 좌표까지의 거리를 측정한다.

    </div>
    </details>

# 구현 예시

```javascript
// 1600 정답 코드 일부 참조
const q = []
// 큐에 좌표 값 (0,0)과 함께 현재 count 상태 (0) 을 함께 넣어준다.
q.push([0, 0, 0])

// dist[0][0][0] 은 현재 좌표 (0, 0)에서 count 가 0 일 때의 거리를 의미한다.
dist[0][0][0] = 0

while (q.length) {
  const [x, y, count] = q.shift()
  if (x === h - 1 && y === w - 1) break

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + dx[i], y + dy[i]]

    if (!isValidRange(nx, ny)) continue
    if (dist[nx][ny][count] >= 0 || graph[nx][ny] === 1) continue

    dist[nx][ny][count] = dist[x][y][count] + 1

    q.push([nx, ny, count])
  }

  if (count < k) {
    for (let i = 0; i < 8; i++) {
      const [nx, ny] = [x + dxH[i], y + dyH[i]]
      if (!isValidRange(nx, ny)) continue
      if (dist[nx][ny][count + 1] >= 0 || graph[nx][ny] === 1) continue

      dist[nx][ny][count + 1] = dist[x][y][count] + 1
      q.push([nx, ny, count + 1])
    }
  }
}
```
