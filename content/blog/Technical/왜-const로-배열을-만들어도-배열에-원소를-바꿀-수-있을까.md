---
title: '왜 const로 배열을 만들어도, 배열의 값을 변경할 수  있을까?'
date: 2022-03-31 01:58:34
category: 'Technical'
tags: ['JavaScript', 'JS']
draft: false
---

진행 중인 자바스립트 Deep Dive 스터디에서 발표한 내용입니다. (10-11장)

rough 한 비유를 사용하여 설명하고 있습니다. 구조에 관련된 내용은 힘을 빼고 읽어주시길 바랍니다.

제목은 사실 어그로를 끌기 위한 것으로... 진짜 제목은

## **자바스크립트의 변수 할당 과정을 메모리 구조에 비유해서 생각해보자**

입니다. 여기까지 오신 김에 재미없다고 가지 말아주세요

## 시작하기

자바스크립트 책의 내용 중에 흔하게 const 로 선언할 경우 값을 바꿀 수 없고, let 으로 선언할 경우 값을 바꿀 수 있다는 내용이 나온다. 그런데 혼란스럽게도 const로 배열과 같은 참조 타입의 값을 선언할 경우, 배열 내부의 값을 바꿀 수 있고 let도 마찬가지이다. 이는 아래와 같은 상황이라고 볼 수 있다.

```javascript
const a = 1
a = 2 // 얘는 오류남

const arr = []
console.log(arr) // []
arr.push(1) // 얘는 오류 안남
console.log(arr) // [1]
```

이러한 이유를 간단하게 설명하자면, 실제로 arr 안에 들어있는 값은 아무것도 변한게 없기 때문이다.

이 글에서는 자바스크립트의 변수 선언 과정을, 컴퓨터 구조의 메모리 구조에 비유해서 위의 이유를 설명한다.

### 메모리 구조

![](https://blog.kakaocdn.net/dn/cOlJKW/btrxYcBXXO4/reejIZNAmUcf8S9qS7rIvk/img.png)코드 영역과 데이터 영역은 생략

메모리의 구조를 그림으로 나타내면 위 그림과 같다.

C언어를 잘 모르실 수도 있지만, C언어를 가지고 설명을 해보자면 메모리의 stack 영역에는 로컬 변수, 함수가 저장되게 되고 Heap(not data structure) 영역에는 동적으로 할당되는 무언가가 저장된다.

이 말을 다시 말하면 동적으로 할당되는, 즉 값이 Dynamic 하게 변하는 경우는 Heap에 저장한다고 생각하면 된다.

이 사실을 기억하고, 이를 자바스크립트 엔진에서 생각해보자.

### 자바스크립트 실행 과정

변수가 할당된 자바스크립트 파일이 브라우저에 올라가기 전까지의 실행과정을 생각해보자.

![](https://blog.kakaocdn.net/dn/urdB6/btrxZDeMCwK/FhnCyHTIYwwaiYo6R6d2x0/img.png)

위 그림처럼 요약할 수 있다.

1. 자바스크립트 파일을 작성하면,
2. **자바스크립트 엔진** (크롬이나 nodeJS에서는 V8 엔진)이 이 파일을 파싱하고 해석해서 돌린다.
3. 파일을 해석하는 과정에서 변수 할당 같은 경우, 당연히 **물리적인 메모리에 allocation** 된다. 하지만 이는 c++로 만들어진 자바스크립트 엔진인 v8에서 일어나므로 자바스크립트에서는 따로 메모리 주소를 확인할 수 없다. (사실 편법을 이용해서 확인할 수는 있다.. 개발자 도구의 메모리를 확인하거나 v8을 뜯어보거나..)
4. 변수의 경우, **V8엔진 안에서의 Stack** 에 할당된다.

이제, 변수가 할당되는 과정을 더욱 상세하게 살펴보자.

### 자바스크립트에서의 변수의 할당

자바스크립트의 타입에는 원시 타입과 객체 타입이 있다.

원시 타입은 immutable하기 때문에 값을 바꿀 수 없고, 참조 타입은 mutable 하기 때문에 값을 바꿀 수 있다.

나는 지금부터 이 내용을 이렇게 설명하겠다. 요약하면 다음과 같다.

- **원시타입** 의 경우, 메모리의 stack에 **원시타입의 값이 저장**된다. **저장된 이후로는 메모리 안의 값을 바꿀 수 없다.**
- **객체타입** 은, stack에 **객체타입이 저장되어 있는(heap)으로 가는 링크(편의상 이렇게 표현)가 저장**된다.

위에서 말했듯이 메모리는 자바스크립트 엔진에서 관리된다. 메모리가 실제로 어떻게 할당되는지는 알 수 없지만 V8엔진에서도 stack과 heap이 있으므로, 위에서 설명한 메모리 구조에 비유해서 설명할 수 있다.

또한 **변수는 stack 영역에 있는 메모리를 가리킨다** 고 할 수 있다.

#### 원시 타입의 데이터 할당

우선 변수에 원시 타입에 데이터가 할당되는 과정을 살펴보자.

```javascript
var score = 120
score = 180
```

위와 같은 코드에서 어떤 일이 일어날까?

![](https://blog.kakaocdn.net/dn/nZvv7/btrx08d2hfb/f2ub9QKfqxnqMyChzNovP0/img.png)

우선 var score 에서 변수가 선언된다. 변수가 선언되면 stack 영역에 메모리가 할당된다.

이 말은 메모리에 stack 영역에 어떤 공간을 차지하게 되고, 이 공간의 주소를 가리키는 값을 변수라고 한다.

다시 설명하면, 변수는 메모리의 주소를 식별하게 끔 해주는 식별자이다. (변수 이름의 경우, 실행 컨텍스트 내에 등록된다.)

따라서 위 그림에 따르면 score 라는 변수는 주소 a를 가리킨다. 그리고 변수가 선언되면 확보된 메모리 공간에는 undefined라는 값이 할당된다. (이 이유때문에 자바스크립트는 쓰레기 값에서 안전한 편이다)

그리고 이 값을 120으로 할당하면 어떻게 될까? undefined와 120 둘 다, 원시 타입의 값이므로 이 값은 immutable 하다. 따라서, 값을 바꿀 수 없고, 즉 원시값이 메모리 공간에 할당이 된다면 메모리 공간 안의 값을 바꿀 수 없고 새로운 공간에 메모리를 할당하고 값을 저장하게 된다.

![](https://blog.kakaocdn.net/dn/bay20t/btrx0LJ9k7B/MgQJz4oW2cqAzLmitFfGc1/img.png)

따라서, stack의 주소 b라는 공간을 할당받은 후 120이라는 값을 저장한 후, 식별자 score는 주소 b를 참조하게 된다.

이제 score의 값을 180으로 바꿔보자. 앞에서 설명했듯이, 원시값은 저장된 이후로 그 메모리 주소 안에서는 아무것도 할 수 없으므로 stack에 다시 새로운 메모리 주소를 할당하고 여기에 값을 저장하게 될 것이다. 그 후 식별자는 새롭게 할당받은 메모리 주소 c를 참조하게 된다.

![](https://blog.kakaocdn.net/dn/FKoeY/btrx1wyKxaF/khxNAOWwlpXqtq7QADDekk/img.png)

정리하면, 변수에 원시 타입의 값을 저장한다는 뜻은, 저장한 이후로 메모리 안에 있는 값을 바꾸지 않는다는 의미이며, 다른 값을 할당한 다는것은 다시 새롭게 메모리에 값을 할당 받는다는 뜻이다.

![](https://blog.kakaocdn.net/dn/tWFgE/btrx0tpu0CC/LzuuDB2L0bjUBYev7tgsRK/img.png)

그리고 더 이상 사용하지 않는 메모리 영역은 자바스크립트의 garbage collection 으로 자동으로 해제된다.

지금까지, 데이터가 모두 stack 에만 저장되어 있다. 그렇다면 heap 은 무엇을 하는 영역일까? 이는 위에서 말했던 것처럼 다이나믹하게 크기가 변하는 값들이 저장되는 영역이라고 생각하면 된다.

원시값들을 생각해보자. 원시값인 number이나 string 각각 차지하는 비트 수가 미리 정해져있다. 하지만 참조 타입의 값들은 어떠한가? 참조 타입의 값은 우리가 마음대로 프로퍼티를 추가하거나 수정하면서 크기가 계속 바뀌게 된다. 이러한 값들을 저장하기 위하여 힙 영역을 사용한다.

#### 참조 타입의 데이터 할당

위에서 언급했듯이 변수는 stack 영역에 있는 메모리 주소를 가리키는 식별자이고,

heap 영역에는 동적으로 (다이나믹하게) 크기가 변하는 값들이 저장되는 영역이다.

그리고 참조 타입의 값은 크기가 다이나믹하게 변할 수 있다. (배열의 경우, 원소가 삽입/삭제 될 수 있고, 객체의 경우 프로퍼티가 추가되거나 삭제 될 수 있다.)

이를 엮어서 생각해보면,

변수에 참조 타입의 데이터의 값을 가진다는 뜻은, heap 영역의 값을 가진다는 뜻인데,

위에서 말했다 싶이 변수는 stack 영역에 있는 메모리 주소를 가리키는 식별자이다.

따라서 변수는 stack 영역에 들어가는 값을 가질 수 있는데, heap 영역에 있는 값을 가지기 위해서

중간에 heap으로 가기 위한 값을 가진다는 뜻이라고 생각해볼 수 있다.

자세히 살펴보도록 하자. (첫 할당 시 undefined 가 할당되는 과정은 생략함)

```javascript
let o = {
  x: 1,
}
```

![](https://blog.kakaocdn.net/dn/cToyg4/btrxYcaUco9/QFyiNnZ8LncKE4dEuSvEPk/img.png)

그림으로 나타내보면 위와 같다. o 라는 식별자는 stack 영역의 주소를 가리키고, 이 주소 안에는 객체 값이 저장되어 있는 힙의 주소값을 가진다.

따라서 자바스크립트에서 참조 값의 프로퍼티를 수정하거나, 배열의 값을 추가하거나 하는 일은 heap 에서 일어나는 일이다. 즉, stack의 값을 조정하는 것과는 무관하다.

요약하면, 변수에 참조 타입을 저장한다는 것은 참조타입의 값이 저장된 heap 에 저장된 값에 대한 링크를 저장한다는 것과 같다.

#### const 의 경우

그렇다면 const 는 뭘까? const는 변수가 한번 메모리 주소를 가리키면 더 이상 다른 곳을 가리킬 수 없다는 것을 뜻한다. 즉 메모리 주소에 이름(변수, 식별자)를 고정시켰다고 생각하면 된다.

#### const 로 선언한 객체가 수정이 가능한 이유

위의 내용으로

```javascript
const a = 1
a = 2 // 얘는 오류남

const arr = []
console.log(arr) // []
arr.push(1) // 얘는 오류 안남
console.log(arr) // [1]
```

이 코드에 대해서 설명할 수 있다.

첫번째, const로 원시 타입의 객체가 선언된 부분을 보자.

![](https://blog.kakaocdn.net/dn/b02OsW/btrxZDFVBjF/jX08kNBQmok35fmZ80H6B1/img.png)

const 키워드를 쓴다는 것은, 식별자가 더 이상 stack 영역의 다른 주소를 가리킬 수 없게 만든다는 뜻이다.

a = 2로 재할당을 하기 위해서는 stack 다시 메모리 공간을 만들고 값을 저장한 후, 그 주소를 변수가 가리키도록 해야하는데 const 키워드를 사용하였으므로 변수는 이제 주소 a에 붙어있는 꼴이 되어, 이동할 수 없기 때문에 원시 타입의 객체인 경우 수정이 불가능하다.

더보기

```javascript
const a;
console.log(a); // ERROR!!

let b;
console.log(b); // undefined
```

이건 어디에도 나오지 않아서... 내 생각이지만

const는 내부적으로 undefined가 선언된 이 후, 단 한번만 값을 할당한 후 그 이후에 재할당을 막는 것 같다.

그렇기 때문에 자바스크립트에서도 const a;라고만 선언하면

SyntaxError: Missing initializer in const declaration

라는 메시지가 뜨면서 오류가 난다.

따라서 const 키워드의 경우, 무조건 값을 할당해야한다.

두 번째, const로 참조 타입의 객체가 선언된 부분을 보자.

![](https://blog.kakaocdn.net/dn/vof6M/btrx0KLiEKV/3QlbsoLT9voekm8oCHaw60/img.png)

마찬가지로 const 키워드를 사용하였으므로 식별자는 stack 영역의 다른 주소를 가리킬 수 없다.

하지만 stack 영역에 들어있는 값은, 진짜 객체의 값이 아니라 객체가 저장되어있는 곳에 대한 값, 즉 힙의 주소가 들어있다. 힙에는 현재 빈 배열 값이 들어있다.

이제 push 메소드를 사용하여 배열에 값을 넣으면,

![](https://blog.kakaocdn.net/dn/AFg8K/btrx5AOCmRG/fc011tsss7uN1EKBtGV8d0/img.png)

위와 같이 heap 안에 있는 배열에 값이 추가되는 것이므로, 식별자 arr에서는 사실 변한게 없다.

따라서 const 로 참조 타입의 객체의 값을 수정한다는 뜻은 실제로 stack 에 저장된 값을 바꾼 다는게 아니라 heap 영역에 있는 데이터를 동적으로 변화시키는 것이기 때문에 오류가 나지 않는다는 것이다.

### 요약

1\. 자바스크립트의 변수는 메모리의 stack 과 heap 에 값이 할당되는 과정과 유사하다.

2\. 동적으로 메모리에서 차지하고 있는 크기가 변할 수 있는 값은 heap에 저장되고, 다른건 stack 에 저장된다.

3\. 변수는 stack의 메모리 주소를 가리키는 값이라고 생각할 수 있다.

더보기

```javascript
const a = []
const b = []
a = b // 에러가 나는 이유는??
```

### 참고자료

[https://felixgerschau.com/javascript-memory-management/](https://felixgerschau.com/javascript-memory-management/)

[JavaScript's Memory Management Explained\
\
\
Even though the JavaScript engine manages memory for us, it's good to know what happens under the hood.\
\
\
felixgerschau.com](https://felixgerschau.com/javascript-memory-management/)

[https://stackoverflow.com/questions/639514/how-can-i-get-the-memory-address-of-a-javascript-variable](https://stackoverflow.com/questions/639514/how-can-i-get-the-memory-address-of-a-javascript-variable)

[How can I get the memory address of a JavaScript variable?\
\
\
Is it possible to find the memory address of a JavaScript variable? The JavaScript code is part of (embedded into) a normal application where JavaScript is used as a front end to C++ and does not ...\
\
\
stackoverflow.com](https://stackoverflow.com/questions/639514/how-can-i-get-the-memory-address-of-a-javascript-variable)
