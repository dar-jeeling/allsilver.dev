---
title: 'BFS - 연결 요소끼리의 최단 거리 구하기 (= 간척 사업)'
date: 2022-11-22 23:00:00
category: 'Algorithm'
draft: false
---

# 연결 요소끼리의 최단 거리 구하기 (= 간척 사업)

BFS 를 응용하여, 연결 요소끼리의 최단 거리를 구할 수 있다.

# 구현 방법

간단하게 요약하자면

- 영역의 가장자리 부분의 좌표 정보와 영역 정보를 큐에 저장하고
- 이 큐 안에 있는 점을 기준으로 상, 하, 좌, 우 탐색을 하면서 영역을 넓혀나가고
- 영역이 넓혀나감에 따라 새로 만들어진 가장자리 영역을 큐에 추가한다.
- 탐색 중, 다른 영역을 만났다면 다른 영역과 지금 보고 있는 영역의 최소 길이를 알 수 있는데,
- 이 최소 길이는 다른 영역에서의 다음 영역 + 지금 보고 있는 영역에서의 현재 까지의 길이 라고 할 수 있다.

# 구현 코드

```javascript
// 2146 (다리 만들기) 코드 일부 참고
// 이 전에 섬 끼리의 라벨링은 완료된 상태라고 가정한다.
// EdgeQ 에는 초기의 영역 가장자리 좌표와 라벨링된 데이터가 들어 있다.

const calculateDist = () => {
  let answer = Infinity

  while (edgesQ.length) {
    const [currentX, currentY, number] = edgesQ.shift()

    for (let dir = 0; dir < 4; dir++) {
      const [nextX, nextY] = [currentX + dx[dir], currentY + dy[dir]]

      if (!isValidRange(nextX, nextY)) continue

      if (islands[nextX][nextY] === 0) {
        // 바다
        islands[nextX][nextY] = number // 섬을 확장하고,
        dist[nextX][nextY] = dist[currentX][currentY] + 1 // 거리를 업데이트 한 후
        edgesQ.push([nextX, nextY, number]) // 새로운 가장자리로 추가한다.
      } else if (islands[nextX][nextY] !== number) {
        // 다른 영역을 만났을 때
        answer = Math.min(answer, dist[currentX][currentY] + dist[nextX][nextY])
      }
    }
  }

  return answer
}
```

# 관련 문제

[BOJ 2146번: 다리 만들기](https://www.acmicpc.net/problem/2146)

# 참고

- [코드 참고 (Kang blog)](https://kagrin97-blog.vercel.app/algorithm/2146-%EB%8B%A4%EB%A6%AC%20%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [설명 참고 1 (마이구미의 Hello World)](https://kagrin97-blog.vercel.app/algorithm/2146-%EB%8B%A4%EB%A6%AC%20%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [설명 참고 2 (바킹독 블로그)](https://blog.encrypted.gg/580)
