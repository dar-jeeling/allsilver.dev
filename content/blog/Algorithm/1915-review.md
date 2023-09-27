---
title: '[오답노트] 가장 큰 정사각형(BOJ 1915)'
date: 2023-08-23 15:56:15
category: 'Algorithm'
draft: false
tags: ['다이나믹 프로그래밍']
---

## 문제

https://www.acmicpc.net/problem/1915

## 문제 이해

- `n * m`의 0, 1로 된 배열이 있을 때, 이 배열에서 1로 된 가장 큰 정사각형의 크기를 구하는 프로그램
- 정사각형에서 모든 좌표를 관찰하되, **이미 관찰한 값을 다시 사용할 수 없을까?**라는 아이디어를 이용한다.
  즉, 배열에서 현재 보고있는 좌표의 값이 1일 때 이 값을 이전에 찾은 가장 큰 정사각형의 변에 이용할 수 있을까? 라는 생각에서 다이나믹 프로그래밍을 이용해서 문제를 풀어볼 수 있다.

## 풀이

예를 들어서 다음과 같은 배열이 있다고 하자

<img src="https://i.imgur.com/J3XzKsU.png" width="300"/>

이 때 dp 테이블의 정의를 임의의 점 (i, j)를 **정사각형의 우하단 좌표**로 했을 때 만들 수 있는 정사각형 한 변의 최대 길이라고 한다.

왜냐하면 dp table을 채우기 위하여 2중 for문을 차례대로 돌린다고 한다면 점 (i, j)가 우하단 좌표일 때 **이전의 값을 통하여, 정사각형을 만들 수 있음을 보장할 수 있기 때문이다.** 또한 이 값이 우하단 좌표일 때 정사각형을 만들기 위해서는 해당 좌표에서의 board 값이 1이어야 한다.

이 배열을 채워보면 다음과 같다. (붉은 글자)

<img src="https://i.imgur.com/KPaE0Kg.png" width="300" />

따라서 배열을 채우기 위하여, 현재 좌표(`i, j`) 기준으로 왼쪽 (`i, j - 1`), 위 쪽 (`i - 1, j`), 대각선 위 쪽(`i - 1, j - 1`)을 관찰하여 그 중 최솟값을 찾고, 현재 값이 1이라면 그 값에 `+ 1`을 해준다. - 이는 앞에서 언급했던 것과 마찬가지로, 정사각형을 만들기 위하여 해당 좌표 기준으로 왼쪽, 위쪽, 대각선이 모두 1로 채워짐이 보장되어야 하기 때문이다.

bottom-up을 적용하기 위한 initialize 과정은 다음과 같다.
dp table을 채울 때 `i - 1`과 `j - 1`을 사용하므로 out of bound를 방지하기 위하여 `i = 0`, `j = 0`일 때를 따로 초기화 하였다.

```cpp
  // initialize
  for (int col = 0; col < m; col++) {
    dp[0][col] = board[0][col];
  }

  for (int row = 0; row < n; row++) {
    dp[row][0] = board[row][0];
  }

```

## 주의사항

### 반례

- `n == 1`, `m == 1`
- 배열의 모든 원소가 `1`, 배열의 모든 원소가 `0`
- `n < m`의 경우
- (내 코드의 경우) dp의 initialize 과정에서 최댓값을 찾을 때 빼먹는 원소가 없는 지

### 최적화

- vector에서 `push_back`의 경우, 메모리 재할당이 필요한 경우 `O(n)`이 될 수 있으므로 가급적이면 vector를 사용할 때도 `reseve`나 `resize`를 이용하여 미리 충분한 공간을 할당한다.

## 코드

```cpp
#include <bits/stdc++.h>

#define FASTIO ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

using namespace std;

int n, m;
vector<vector<int>> board;

void input() {
  FASTIO;

  // 테스트를 위한 파일 입력 코드 (TODO: 제출 전 삭제)
  // freopen("sample_input.txt", "r", stdin);

  cin >> n >> m;
  board.resize(n, vector<int>(m));

  for (int i = 0; i < n; i++) {
    string line;
    cin >> line;

    for (int j = 0; j < m; j++) {
      board[i][j] = line[j] - '0';
    }
  }
}

int main() {
  input();

  // dp[i][j] = board에서 점 (i, j)를 정사각형의 우하단 좌표라고 가정했을 때,
  // 만들 수 있는 가장 큰 정사각형의 한 변의 길이
  int dp[n][m];
  memset(dp, 0, sizeof(dp));

  // initialize
  for (int col = 0; col < m; col++) {
    dp[0][col] = board[0][col];
  }

  for (int row = 0; row < n; row++) {
    dp[row][0] = board[row][0];
  }

  // bottom-up
  for (int i = 1; i < n; i++) {
    for (int j = 1; j < m; j++) {
      if (board[i][j] == 0) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = min({dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]}) + 1;
      }
    }
  }

  int answer = 0;

  for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
      answer = max(answer, dp[i][j]);
    }
  }

  cout << answer * answer;

  return 0;
}

```
