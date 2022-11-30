---
title: 'BFS/DFS - 그래프에서 사이클 구하기'
date: 2022-11-20 23:00:00
category: 'Algorithm'
draft: false
---

# 그래프에서 사이클 구하기

시작 vertex 와 끝 vertex 가 동일한 Path 를 cycle 이라고 한다.
이산 수학에서는 loop 는 cycle 로 간주하지 않았으나<sup>[1](#footnote_1)</sup> 문제에서는 문제의 조건에 따라서 판단한다. (어짜피 구하는 법은 같으므로)

# 구현 방법

기본적인 아이디어는 DFS 지만

1. BFS 의 테크닉인 `visited` 배열을 이용한 **방문 처리** 와
2. 해당 정점에서 탐색이 끝났는지를 체크하는 `finished` 체크가 필요함.

여기서 cycle 을 찾는 원리는 그래프의 탐색 기법을 활용하면 connected component 를 찾을 수 있다는 것에 착안하는데,
DFS 로 탐색을 하다가, **다음 탐색 지점을 이미 방문하였는데 그 지점에서 탐색이 끝난 적이 없다면 cycle 로 판단**한다.

또한 cycle 의 길이를 찾기 위해서는 현재 vertex 에서 자기 자신이 나올 때까지 역추적한다.

# 구현 코드

```javascript
const dfs = v => {
  visited[v] = true
  const next = choose[v]

  if (visited[next]) {
    if (!finished[next]) {
      let temp = choose[next]
      while (temp !== next) {
        count += 1
        temp = choose[temp]
      }
      count += 1 // 자기 자신
    }
  } else {
    dfs(next)
  }

  finished[v] = true
}
```

# 관련 문제

[BOJ 9466번: 텀 프로젝트](https://www.acmicpc.net/problem/9466)

# 참고

[Ries 마법의 슈퍼마리오 - 깊이 우선 탐색(Depth-First Search) (수정 2019-08-18)](https://blog.naver.com/PostView.naver?blogId=kks227&logNo=220785731077&from=postView&redirect=Log&widgetTypeCall=true&topReferer=https%3A%2F%2Fblog.naver.com%2FPostSearchList.naver%3FblogId%3Dkks227%26categoryNo%3D0%26range%3Dall%26SearchText%3D%25EC%258B%25B8%25EC%259D%25B4%25ED%2581%25B4%26x%3D0%26y%3D0&directAccess=false)

# 각주

<a name="footnote_1">1</a>: vertex 가 3개 이상부터 cycle 이라고 함
