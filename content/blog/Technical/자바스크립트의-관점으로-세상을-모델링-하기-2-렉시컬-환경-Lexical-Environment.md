---
title: '자바스크립트의 관점으로 세상을 모델링 하기 2 : 렉시컬 환경 (Lexical Environment)'
date: 2022-05-15 12:31:21
category: 'Technical'
tags:
  ['클로저', 'This', '실행컨텍스트', '렉시컬환경', '스코프체인', '환경레코드']
draft: false
---

딥다이브 스터디와 cs 발표 스터디에서 발표한 내용입니다!

학습을 하면서 작성한 글이므로, 오류나 애매한 부분, 건의가 있으면 자유롭게 부탁드립니다!

**(추가) 현재 lexical environment라는 자료 구조가 environment record로 대체되었고, outer environment record의 경우 environmet record가 하던 일은 [[OuterEnv]] 로 대체되었다고 합니다.  따라서 글에서 나오는 outer environment record은 environment record의 [[OuterEnv]] 가 하는 일로 생각해주시면 됩니다.**

## 들어가면서

> 변수의 의미는 그 어휘적인 (Lexical), 실행 문맥(Execution Context) 에서의 의미가 된다.
>
> ㅡ [자바스크립트는 왜 프로토타입을 선택했을까?](https://medium.com/@limsungmook/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%99%9C-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%9D%84%EA%B9%8C-997f985adb42)

자바스크립트는 **프로토타입 기반** 의 언어라고 설명합니다. 이 프로토타입 이라는 용어는 비트겐슈타인의 의미사용이론과 가족유사성을 정리한 Rosch의 프로토타입 이론에서 설명하는 개념입니다.

이 프로토타입 이론의 의미사용이론에서 우리가 통상적으로 언어를 구사한다고 할 때(말을 하거나, 글을 쓰거나) 사용하는 '단어'의 의미는 문맥에 의해서 생성된다.고 말합니다. 이 말을 간단하게 설명하면 **우리가 사용하는 언어, 단어의 의미는 사용하는 환경에 따라 결정된다.** 라고 설명할 수 있습니다.

예를 들어볼까요?

![](https://blog.kakaocdn.net/dn/bt3fxT/btrCakA7I2B/jt8Xn8GvNSziri3ZBOGAf1/img.jpg)

흔하게 돌아다니는 이미지인데요. 절대 게임회사에서 "어~?"라는 말을 하지 말라고 하는 내용을 아시나요?

왜냐하면 이 "어~?"의 의미가 현재 상황과 환경에 따라서 달라질 수 있습니다.

가령

1\. **어?~** : 커피에 시럽넣는걸 까먹어서 맛이 달라졌음

2\. **어?~** : 모르는 번호에서 전화옴

3\. **어?~** :  서버를 롤백해야할 이슈가 생겼음

이 어?~ 라는 단어가 이 **세 가지 상황에 따라서 다르게 해석될 수 있다** 는 말입니다.

즉, **어떤 환경에 처해있느냐에 따라서 어?~라는 의미가 결정된다** 는 것이죠.

자바스크립트는 프로토타입 이론을 바탕으로 모델링한 언어이므로, 이 내용을 자바스크립트에도 대응시킬 수 있습니다.

![](https://blog.kakaocdn.net/dn/NZx4h/btrB5V26Y4b/nFfmFpTC3oqoaRZwTi4LSk/img.jpg)

이 단어를 변수라고 생각해보고, 상황을 코드 실행이라고 생각해봅시다. 그렇다면 현실 세상에서 그랬던 것 처럼 자바스크립트에서 변수란 코드가 실행되는 문맥(context)에 의하여 의미가 결정된다고 할 수 있습니다.

문맥에 대해서 생각을 해볼까요? **일반적인 세상에서 문맥을 파악하기 위해서는 현재의 상황과 이전의, 외부의 상황을 합쳐서 생각을 해야하고,** 이는 자바스크립트에서도 마찬가지 입니다.

그렇다면, 이 자바스크립트에서 코드가 실행되는 문맥을 어떻게 설명할까요? 이를 위하여, 자바스크립트는 실행컨텍스트를 구현하였고, 이 실행 컨텍스트를 구현할 때, 렉시컬 환경이라는 **자료구조** 를 사용합니다.

결국에는 **렉시컬 환경은 코드가 실행되는 문맥을 설명하기 위한 자료구조**입니다.

## 실행 컨텍스트

모든 자바스크립트 코드를 실행할 때는 실행 컨텍스트가 필요하고, 이 실행컨텍스트는 실행 코드에 따라서 하나씩 논리적으로 스택의 형태로 쌓이게(push) 됩니다. 그리고 실행이 종료될 때마다 위에 있는 것부터 하나씩 사라집니다.(pop)

자바스크립트는 **네 가지를 코드의 실행 기준** 으로 나누고, **이 기준에 따라서 실행 컨텍스트가 만들어 집니다.**

1. **Global (전역, 코드가 실행되자 마자)**
2. **Function**
3. **Eval**
4. **Module**

즉 자바스크립트에서 코드가 실행되면, 자바스크립트 엔진이 이 네 가지 기준에 따라 코드를 구분하고, **이 기준에 따라 실행 컨텍스트를 초기화하게 됩니다. 즉, 이 기준에 따라 실행컨텍스트의 초기화 내용이 달라진다고 할 수 있겠네요!**

그리고 **그 안에서 선언된 변수는 이 문맥에 따른 의미를 가지게 되는 것** 입니다. 따라서, 앞에 언급한대로 이 문맥(실행 컨텍스트)는 **현재 변수가 어떤 상황에 처해있는지에 대한 설명을 담고 있게 되고, 이 설명을 위하여 렉시컬 환경이라는 일종의 자료구조를 사용하게 되었습니다.**

따라서 실행 컨텍스트를 의사 코드로 나타내면 다음과 같습니다.

```javascript
ExecutionContetext = {
  LexicalEnvironment: [Lexical Environment],
  VariableEnvironment: [Lexical Environment],
};
```

실행컨텍스트에 LexicalEnvironment 와 VariableEnvironment 라는 프로퍼티가 존재하고, 이 프로퍼티들이 Lexical Environment 라는 자료구조로 구현이 되는데요, VariableEnvironment애 대한 내용은 생략하고 이 글에서는 Lexical Environment 에 대한 내용만 다루도록 하겠습니다.

## 렉시컬 환경

```javascript
Lexical Environment = {
    environment record: ~,
    outer environment reference : ~
}
```

렉시컬 환경은 **environment record(환경 레코드)** 와 **outer environment reference(상위 환경에 대한 참조)** 라는 프로퍼티를 가지는 형태로 구현됩니다. 자세한 내용은 코드 예시와 함께 설명하도록 하겠습니다.

코드를 보겠습니다.

```javascript
function outer() {
  const a = 1
  const b = 2
  const c = 3

  function inner() {}
}

outer()
```

위 코드가 전역에서 실행되었다고 가정하면, 실행 컨텍스트의 스택에 전역 실행 컨텍스트가 먼저 push 되고, 그 위로 outer 함수의 실행 컨텍스트가 push되는 형태로 만들어 질 것입니다.

outer 함수의 실행 컨텍스트에 대한 렉시컬 환경에 대해서 살펴보겠습니다.

![](https://blog.kakaocdn.net/dn/0Xa4l/btrCdIBhEHA/fP3Q3bRLJ9VVEHfaRHOJsk/img.png)

이렇게 함수 문맥에서 선언된 식별자와 식별자의 바인딩 정보가 환경레코드에 바인딩 되고, Outer Environment Reference에는 outer 함수의 [[Global]] 내부 슬롯, 즉 outer 함수가 생성될 때의 바로 상위 스코프에 대한 레퍼런스가 바인딩 됩니다.

이렇게 **environment record(환경 레코드)의 경우, 식별자의 정의와 어떤 값을 담고 있는지의 정보를 담고 있고**, **outer environment reference(상위 환경에 대한 참조)의 경우 외부 렉시컬 환경에 대한 참조로 함수가 중첩되어있을 때, 상위 스코프 탐색을 위해서** 사용합니다.

이 렉시컬 환경을 통해서, 자바스크립트의 많은 동작을 설명할 수 있습니다. 대표적으로 계속 언급하고 있는 실행 컨텍스트와 스코프 체인에서의 식별자 처리 과정, 클로저 등이 있는데, 이제부터 렉시컬 환경의 구성요소인 environment record와 outer environment reference를 설명하면서 이 세 가지 동작에 대해서도 간단하게 설명하도록 하겠습니다.

## Environment record(환경 레코드)

![](https://blog.kakaocdn.net/dn/xyrNn/btrCboJ5cbV/ksMTEp6svVkqdfCExPYTkK/img.png)이미지출처 : TOAST UI (https://ui.toast.com/weekly-pick/ko\_20171006)

환경 레코드는 이와 같은 상속구조를 가집니다.

먼저 **구현 방식에 따라** **Declarative Environment Record(선언적 환경 레코드)** 와 **Object Environment Record**, **Global Environment Record** 으로 나누어집니다. **Declarative  Environment Record** 의 경우, 위에서 본 함수에 대한 렉시컬 환경에 대한 그림처럼 **식별자의 이름과 식별자에 바인딩된 값이 key와 value로 되어있는 형태** 이고, **Object Environment Record** 의 경우 [[BindingObject]] 라는 **객체를 참조하는 방식** 으로 되어있는데, 직관적으로 예상할 수 있다 싶이 Declarative 방식에 비해서 구현이 비효율적입니다. 하지만 **이는 Global Environment Record에서 전역 객체를 바인딩하기 위해서 활용됩니다.**

**Global Environment Record** 의 경우, **Declarative Environment Record 와 Object Environment Record 가 합쳐진 형태** 로 볼 수 있습니다. **Global Environment Record** 의 **Object Environment Record 부분에는 전역 변수 window 가 바인딩** 되어있기 때문에 이곳에서 관리되는 함수 선언문이나 var로 선언한 객체가 관리되고, **Declarative Environment Record** 에서는 let과 const와 같은 나머지 식별자들이 관리됩니다.

**Declarative Environment Record** 에서 다시 **Function Environment Record** 와 **Module  Environment Record** 로 나뉘어지는데요.

앞에서 **자바스크립트에서 소스 코드는 네 가지 분류 기준으로 분류되어 실행컨텍스트가 생성되고, 이 분류기준에 따라 실행컨텍스트의 초기화 방식이 달라진다.**라는 내용을 설명했는데요, 이는 환경레코드의 구현 방식에 따라서 분류해볼 수 있습니다.

따라서 함수에 의해서 생성되는 실행 컨텍스트의 렉시컬 환경의 환경 레코드(앞으로는 환경레코드라고만 언급하겠습니다)는 **Function Environment Record** 로, 모듈에 의해서 생성되는 실행 컨텍스트의 환경 레코드는 **Module  Environment Record** 로 만들어집니다.

그렇다면 위에서 언급한 코드인

```javascript
function outer() {
  const a = 1
  const b = 2
  const c = 3

  function inner() {}
}

outer()
```

의 outer 함수에 대한 실행컨텍스트의 environment record를 생각해봅시다.

함수 실행 컨텍스트이므로 환경 레코드가 **Function Environment Record** 으로 초기화되고 이는 다음과 같은 형태를 가집니다.

```javascript
 environmentRecord: {
    // 함수 내에 선언된 변수와 함수의 정보
      a : 1,
      b : 2,
      c : 3,

      inner : <Function>

    // 내부 슬롯
    [[ThisValue]]: global, // Any
    [[ThisBindingStatus]]: 'uninitialized', // 'lexical' | 'initialized' |  'uninitialized'
    [[FunctionObject]]: outer, // Object
    [[HomeObject]]: undefined, // Object | undefined,
    [[NewTarget]]: undefined // Object | undefined

  }
```

우선 함수 내에서 사용되는 식별자들이 key 와 value 형태로 만들어지고, 몇 가지 특별한 내부 슬롯들을 가지게되는데요.

내부 슬롯의 내용을 살펴보면 **this\*\***바인딩** 이나 **super**, **new target\*\* 등의 정보가 환경 레코드에서 관리됨을 알 수 있습니다.

이 중 this 에 관한 내용을 살펴보겠습니다.

**[[ThisBindingStatus]]** 라는 속성이 있는데, 이 속성은 이 함수가 화살표함수이냐, 화살표함수가 아니냐 에 따라서 값이 달라집니다. 이 속성은 **함수가 화살표 함수이면 lexical 이라는 값을 가지게 되고, 이 값을 가지면 local this value를 가지지 않습니다.** 흔히 화살표 함수가 this 가 없고, 외부 스코프의 this를 참조한다고 말을 하는데, 바로 이렇게 설명할 수 있습니다.

**화살표 함수가 아닌 함수에서는 uninitialized** 나 **initialized** 라는 값을 가지는데 **실행 컨텍스트가 실행 되기 전, this 바인딩이 일어나지 않았을 때는** **initialized** **(실행컨텍스트가 초기화만 된 상태)** 라는 값을 가지게 되고 **실행 컨텍스트가 실행되면서 this 바인딩이 결정되면 un** **initialized** **(실행컨텍스트가 초기화만 된 상태가 아님)** 이라는 값을 가지게 됩니다.

결국에는 자바스크립트에서의 식별자의 의미들은 모두 실행되는 문맥, 환경에서 관리되는 것입니다. 앞에서 **일반적인 세상에서 문맥을 파악하기 위해서는 현재의 상황과 이전의, 외부의 상황을 합쳐서 생각을 해야하고,** 이는 자바스크립트에서도 마찬가지 입니다. 라는 언급을 하였습니다. 그렇다면 환경 레코드는 현재의 상황을 설명한다고 생각하시면 되겠네요! 그렇다면 이전의 상황은 어떻게 구현되었을까요? 이 때 사용되는 것이 **Outer environment reference** 입니다.

## Outer environment reference(상위 환경에 대한 참조)

**Outer environment reference는 이전의, 외부의 상황에 대한 참조를 저장** 합니다. 이 "상황"은 렉시컬 환경이라는 자료구조로 구현된고, 따라서 Outer environment reference 는 바로 직전, 외부의 렉시컬 환경을 참조하고 있습니다.

**스코프 체인** 역시 Outer environment reference를 통하여 생각할 수 있습니다. 이를 통하여, **중첩적으로 참조를 타고 올라가는 식으로\*\***외부에 있는 다른 스코프의 변수를 찾아가거나 하는 과정이 발생하는 겁니다.\*\*

[footnote]이렇게 식별자의 스코프를 타고 올라가는 걸 스코프체인 이라고 하지만, ES5부터 렉시컬 환경이 도입되면서 스코프 체인의 구현이 각각의 변수 객체(렉시컬 환경이전의 구현)의 연결 리스트가 아닌 참조를 타고 올라가는 식으로 바뀌었습니다. 따라서 ECMAScript에서는 스코프 체인이라는 용어보다는 **Lexical nesting structure** 또는 **Logical nesting of Lexical Environment values** 으로 표현하고 있습니다.[/footnote]

**클로저** 역시 생각해볼 수 있는데요. 자바스크립트의 Garbage Collection 방식을 생각해보면, **자바스크립트에서는 더 이상 참조하지 않는 변수를 메모리에서 삭제** 합니다. 하지만, **Outer environment reference 를 통하여 렉시컬 환경이 외부의 상황을 참조하고 있으므로 이 정보가 메모리에서 삭제되지 않고, 외부 함수의 렉시컬 환경을 참조할 수 있는 것입니다.**

## **마무리**

결론적으로 자바스크립트는 렉시컬 환경을 통하여 현재 문맥을 설명하기 위한 상황을 설명한다고 할 수 있습니다. 즉, 현실 세상에서 어떤 문맥을 설명하는 과정, 외부 상황과 현재 상황을 함께 설명하는 그 과정이 그대로 자바스크립트의 문맥을 설명하는 과정으로 모델링 되었다고 생각할 수 있고, 자바스크립트의 많은 동작들이 이를 통해 발생한다고 할 수 있습니다.

## 참고 자료

더보기

1\. ECMA Script - 9.1 Environment Record : [https://tc39.es/ecma262/#sec-environment-records](https://tc39.es/ecma262/#sec-environment-records)[ECMAScript® 2023 Language Specification\
\
\
The first and subsequent editions of ECMAScript have provided, for certain operators, implicit numeric conversions that could lose precision or truncate. These legacy implicit conversions are maintained for backward compatibility, but not provided for BigI\
\
\
tc39.es](https://tc39.es/ecma262/#sec-environment-records)

2\. TOAST UI - 자바스크립트 함수 (3) - Lexical Environment : [https://ui.toast.com/weekly-pick/ko_20171006](https://ui.toast.com/weekly-pick/ko_20171006)

[자바스크립트 함수 (3) - Lexical Environment\
\
\
지난 글을 통해 함수의 생성과 함수의 호출 과정에 대해 간략히 알아보았다. 앞선 글(함수의 호출)에서 간단히 설명한 Execution Context에는 LexicalEnvironment와 VariableEnvironment라는 컴포넌트가 있다. 기\
\
\
ui.toast.com](https://ui.toast.com/weekly-pick/ko_20171006)

3\. Youtube - Lexical Environment by 김훈민 대리 (nts 프론트엔드 개발팀) : [https://www.youtube.com/watch?v=OPc73p2d0T8](https://www.youtube.com/watch?v=OPc73p2d0T8)

4\. Velog - dogyeong.log (Lexical Environment)  - [https://velog.io/@shroad1802/environment-record](https://velog.io/@shroad1802/environment-record)

[Environment Record\
\
\
ECMAScript의 Environment Record에 대해 정리해봤습니다.\
\
\
velog.io](https://velog.io/@shroad1802/environment-record)

5\. 자바스크립트는 왜 프로토타입을 선택했을까? : [https://www.notion.so/breakyourlimit/4df11c42d5804dcc8cebf5a618903507](https://www.notion.so/breakyourlimit/4df11c42d5804dcc8cebf5a618903507)

6\. 모던 자바스크립트 딥 다이브
