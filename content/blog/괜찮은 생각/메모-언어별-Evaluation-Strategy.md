---
title: '[메모] 언어별 Evaluation Strategy'
date: 2022-11-20 20:54:18
category: '괜찮은 생각'
tags: []
draft: false
---

Evaluation Strategy 란 ? : 프로그래밍 언어에서 함수 호출의 argument 의 순서를 언제 결정하고 함수에 어떤 종류의 값을 통과시킬지 결정하는 것.

- JavaScript : Call by value, 참조 값 역시 새로운 값이 복사되어 전달되나 그 값이 가리키는 것 자체는 같으므로 함수 호출에서 참조 r값이 가리키는 object 를 수정하면 그 object 가 수정됨 (It's always pass by value, but for objects the value of the variable is a reference. )
- C++ : 인자의 형태에 따라 다름. & 를 붙이거나, 그 외에 배열의 이름이나 포인터와 같은 주소 값을 이용하면 call by refernce
- Python : Call by assignment (call by object refernce), 객체의 mutable 과 immutable 에 따라 다름.

## 참고 자료

[https://www.geeksforgeeks.org/call-by-value-vs-call-by-reference-in-javascript/](https://www.geeksforgeeks.org/call-by-value-vs-call-by-reference-in-javascript/)

[Call by Value Vs Call by Reference in JavaScript - GeeksforGeeks\
\
\
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.\
\
\
www.geeksforgeeks.org](https://www.geeksforgeeks.org/call-by-value-vs-call-by-reference-in-javascript/)

[https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)

[Is JavaScript a pass-by-reference or pass-by-value language?\
\
\
The primitive types (number, string, etc.) are passed by value, but objects are unknown, because they can be both passed-by-value (in case we consider that a variable holding an object is in fact a\
\
\
stackoverflow.com](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)
