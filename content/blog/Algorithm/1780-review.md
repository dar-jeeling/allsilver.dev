---
title: '[오답노트] 종이의 개수(BOJ 1780)'
date: 2022-11-29 10:00:00
category: 'Algorithm'
draft: false
---

# 문제 분류

재귀, 분할 정복

# 문제 요약

주어진 공간을 9등분하여 조건을 만족하는지 검사한다.
이 때, 공간을 9등분하는 과정이 재귀적으로 정의되므로 재귀를 이용한 분할정복으로 문제를 해결할 수 있다.

## 점화식 세우기

### 함수의 정의

`func(int n, int r, int c)` 는 크기가 `n * n` 인 배열 `paper` 에서 현재 종이를 자를 수 있으면 카운트를 추가하고, 자를 수 없다면 분할 정복을 하는 함수이다.

### base case

`n == 1` 일 때, 그 종이는 무조건 자를 수 있다.

### recursive case

`n * n` 크기의 종이를 자를 수 있는 갯수는 종이를 9등분 한 것들에 대해서 자를 수 있는 갯수의 합이다.

# 생각하지 못한 점 / 배울 수 있는 테크닉

- **분할 정복을 반복문으로 표현하기**
  9개의 term 을 모두 실행시킬 필요없이 반복문으로 한 번에 표현할 수 있다.

   <details>
    <summary><b>코드</b></summary>
    <div markdown="1">

  ```c++
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      func(section, r + i * section, c + j * section);
    }
  }
  ```

    </div>
    </details>

- **값이 -1, 0, 1 인 경우 count 배열 index 로 표현하기**
  각 값에 순서대로 1을 더하고 index 로 사용하면 된다.

    <details>
     <summary><b>코드</b></summary>
     <div markdown="1">

  ```c++
  int cnt[3];

  // paper[r][c] 값의 count 증가
  // 관찰하는 값이 -1, 0, 1 이므로 1을 더해도 순서대로이다.
  cnt[paper[r][c] + 1] += 1;
  ```

     </div>
     </details>

- **-1, 0, 1인 경우 전부 재귀를 돌리지 않아도 됨 (전역 변수 이용)**

  재귀함수의 정의를 단순히 target 에 대한 카운트로 하지 않고,
  재귀 함수 내에서 전역변수의 카운트를 증가하도록 한다.

  이렇게 하면, target 을 따로 두지 않고 현재 관찰하는 대상 (`paper[r][c]`)가 target 역할을 하게 된다.

# 코드

```c++
int cnt[3];

bool isCut(int n, int r, int c) {
  for (int i = r; i < r + n; i++) {
    for (int j = c; j < c + n; j++) {
      if (paper[r][c] != paper[i][j]) {
        return false;
      }
    }
  }
  return true;
}  // end of isCut

void func(int n, int r, int c) {
  if (n == 1) {
    cnt[paper[r][c] + 1] += 1;
    return;
  }

  if (isCut(n, r, c)) {
    cnt[paper[r][c] + 1] += 1;
  } else {
    int section = n / 3;

    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        func(section, r + i * section, c + j * section);
      }
    }
  }
}  // end of func
```

# 비슷한 문제

- [백준 2630 색종이 만들기](https://www.acmicpc.net/problem/2630)
