---
title: '[프로젝트 회고] 바닐라 JavaScript로 Notion 클론 텍스트 에디터 만들기'
date: 2022-04-21 16:27:00
tags: ['프로젝트_회고', '노션_클론']
category: '회고'
draft: false
thumbnail: '../../assets/oldThumbnails/notion_thumb_list.png'
---

<div class="unsplash-wrapper">
<img class="unsplash-thumbnail-image" alt="thumbnail" src="../../assets/oldThumbnails/notion_thumb_content.png" />
<div class="unsplash-author">
Photo by <a href="https://unsplash.com/@studiopoline?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pauline Bernard</a> on <a href="https://unsplash.com/s/photos/notion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</div>
</div>

### 들어가면서

데브코스에서 바닐라 자바스크립트 강의를 수강한 후, 노션을 클론하는 프로젝트가 있었다. 자바스크립트로 뭔가를 구현한다는 것 자체가 처음이였어서 그런지 강의조차 듣고 소화하는데 정말 오래걸려서(그렇다고 강의를 소화못하고 프로젝트를 하면 정말로 아무것도 못할 것 같았다), 어찌어찌해서 노션 프로젝트를 시작하니 남은 시간은 약 3일.. 이 3일의 시간동안 노션을 무사히 구현할 수 있을까?

### 구현 내용

![](https://blog.kakaocdn.net/dn/dA35if/btrz0CYZBpn/zniKsQYvrJfjVdSSH8LY40/img.gif)best practice..지만 어쨌든 시연 gif

바닐라 JS 만을 이용하여, 노션의 일부 기능을 구현하는 프로젝트였다. 프로젝트에서 핵심이라고 느꼈던 부분은 다음과 같다.

- **데이터 가공** : 서버에서 내려 준 Documents들의 데이터를 FE 단에서 가공하여, notion의 방식대로 보여주기. 즉 받은 Documets 들을 트리 형태로 사용자에게 보여주는 것이다.
- **상태의 관리** : 노션은 Component 단위로 나뉘어져있으며, 이 Component들은 상태를 가진다. 이 상태의 경우 API 요청을 통하여 받아온다. **API 요청을 받아올 때마다, Component 들의 상태를 업데이트 해줘야 한다.**
- **컴포넌트 구조** : 기능 단위로 Component 를 분리한다.
- **SPA 구현** : history API를 통해 url에 따라 다른 요소들을 렌더링하는 식으로 만들어야 하는데, SPA라는 특성상 화면 깜빡임이 없어야 한다. **즉, 상태가 변한다면 필요한 요소만 다시 렌더링 되어야 한다.**

#### Component 구조와 기능

![](https://blog.kakaocdn.net/dn/dHEFHG/btrz47QUIjq/tYtshLcqr3jxFkzOVY4RPk/img.png)

- **App** : 각 컴포넌트를 모듈로써 불러오고, 실행한다. 나의 경우에는, App.js가 프로그램 시작 시 첫 진입점이라고 생각하고 구현하였다. 따라서, history API를 통한 라우팅 처리 역시 App.js 에서 일어나도록 하였다.
- **Sidebar** : 서버에서 문서 목록을 받아오고, 이를 통해 DocumentList에 문서 목록을 전달해주고 렌더링 하고, 각 Document에서 발생하는 이벤트를 처리한다.
- **PostEditPage** : 문서의 생성, 수정이 일어난다. 자동 저장 편집기의 기능을 구현하기 위하여, 이벤트 디바운싱을 이용하여 로컬스토리지에 수정한 내용을 저장하고, 저장한 후에는 내용을 로컬 스토리지에서 지워버린다.
- **RootPage** : 문서가 없을 때 root URL로 접속하였을 시 볼 수 있는 페이지이다.
- **DocumentList** : 서버에서 받아온 문서 목록을 받아 트리구조로 만들어서 보여준다. 또한 사용자가 문서를 토글하거나 해서 보이는 구조를 변경하였을 시, 이 상태를 로컬스토리지에 저장해서 다른 페이지로 이동하거나 새로고침 하는 경우에도, 토글 상태를 유지하도록 한다.
- **Editor** : 문서를 작성한다. keyup 이벤트가 일어날 때 마다, setState가 일어난다.

![](https://blog.kakaocdn.net/dn/bwOiYS/btrz44fEKJ3/IBUHKqmNBLQvxZuWHykBxK/img.jpg)문서가 없는 경우의 화면![](https://blog.kakaocdn.net/dn/ySBAE/btrzYCFdfzl/YbZaD9rI51xybkCLkKpAI1/img.png)문서가 존재할 때의 화면

### 어려웠던 점들

#### Document Tree 토글 구조 만들기

[How To Create a Tree View](https://www.w3schools.com/howto/howto_js_treeview.asp)

DocumentList에서 Document의 목록을 받은 후, 처리하는 과정에서, 재귀를 통하여 Tree 구조를 만드는 것 자체는 자명했으나.. 토글 기능을 추가하는 점에서 어려움을 겪었다. 결론을 먼저 말하자면, EventListener를 통하여 click 이벤트가 일어났을 때 마다 CSS 속성을 변경하는 식으로 토글을 구현하였다. **이 때, 자바스크립트에서 지원하는 classList를 활용하여 CSS 속성을 제어한다는 점이 신기하다고 생각하였다.** 또한, 이 경험은.. 후에 SPA를 구현할 때도 사용하게 된다.

#### SPA를 구현한다는 것

아직도 SPA라는 개념이 어렵다. 대강 필요한 부분만 업데이트한다...라고 생각을 하면서 구현을 했는데 사용성에 있어서, 사용하기 편한 SPA를 구현하는 것이 정말로 어려웠다.

특히 내가 가장 어려웠던 부분은 화면 깜빡임을 최소화 하는 것이였다. 처음에는 app에서 라우팅이 일어날 때 마다, 해당 화면을 innerHTML을 통해서 지우고 나서 다른 요소를 렌더링하는 방식을 이용하였는데, 이러한 innerHTML 이 화면을 지우는 부분에서 화면 깜빡임이 불가피하였다.

따라서 **DocumentList의 CSS 속성을 추가하는 방식을 이용하여, 화면이 바뀔 때마다 CSS 속성을 추가하고, 해당 CSS 속성일 때는, 요소의 display 속성을 none으로 하면서 SPA를 구현하였다.** 이 방식이.... 좋은 방식인지는 잘 모르겠다.

#### 상태의 관리와 비동기 처리

처음에 더미 데이터를 사용하여 구현하였을 때는 상태 관리에 대한 별다른 이슈가 생기지 않았으나, API와 연동하고 나서 부터 문제가 발생하기 시작하였다. API 처리를 위하여 async/await의 비동기처리를 이용하였는데, 이것 때문에 내가 보고 있는 화면과 뒤에서 서버와 클라이언트의 소통이 같은 시간선에서 일어나지 않기 때문에, 이 시간선을 메우기 위한 작업을 하는 것들이 정말로 어려웠다.

뒤에서도 이야기를 할 것이지만, 이 시간의 간극 동안 사용자의 편의를 위하여 낙관적 업데이트와 같은 기법을 사용하고 싶었으나... 위의 Document Tree를 구현할 때, **클라이언트 측에서 다루기 쉬운 자료구조 형태를 만들지 않은 것이 화근** 이되어, 그러한 업데이트를 하지 못한게 아쉬웠다.

#### Pub-Sub 패턴 사용해보기

[[번역] 초보 프론트엔드 개발자들을 위한 Pub-Sub(Publish-Subscribe) 패턴을 알아보기 | rinae.dev](https://www.rinae.dev/posts/why-every-beginner-front-end-developer-should-know-publish-subscribe-pattern-kr)

SPA 형태를 만들기 위하여, 왼쪽에는 Sidebar를 두고 오른쪽에는 page(RootPage, PostEditPage)를 두어, app 에서 이를 렌더링하는 구조를 만들었다. 하지만, 여기서 문제가 생긴 점이 있었다. 어떤 컴포넌트의 변경이 전체 상태에 영향을 주게 되어, 다른 컴포넌트를 다시 렌더링 해야하는 것이였다.

나의 경우에는 Sidebar의 DocumentList는 전체 문서 목록을 상태로 가지고 있는데, 이러한 문서의 목록이 PostEditPage에서 문서의 수정이나 추가가 일어날 때는 그 전체 문서 목록에 영향을 주기 때문에, 이 상태 변화를 Sidebar가 감지하여 DocumentList의 상태를 다시 변경해야한다는 것이였다.

그래서 처음에는 app에 하나만 있던 Sidebar를 분리해서 페이지에 하나하나 넣어줄까..생각을 했는데 이건 정말로 SPA의 목적에서 벗어나는 행위이므로 다른 방안을 생각해야 했었다.

따라서, 내가 원하는 동작 방식에 주목을 하였다.

**『PostEditPage에서 상태의 변경이 일어나면, 이 상태의 변경이 일어났음을 Sidebar가 감지하도록 해야한다.』**

즉, 이 말은 PostEditPage 가 상태가 변경되었다고 발행(publish)하면 이 PostEditPage를 구독(subscribe)하고 있는 Sidebar가 이러한 상태 변경을 감지한다. 이를 통해서 pub-sub 패턴을 사용하여서, 적용시켜보았다. 따라서, PostEditPage에 subcribe 함수를 구현하였고, Sidebar가 이 subcribe를 import 해서 사용하도록 하였다.

사실 정확하게 말하자면 프로젝트에서 사용한 패턴은 Pub-Sub 패턴보다는 Observer 패턴에 가깝긴하다.

시간에 쫒겨서 Pub-Sub 패턴을 제대로 적용하고 공부해보지 못하였기 때문에 다음 CS 발표 스터디에서 Pub-Sub 패턴을 주제로 삼아서 이야기를 해보려고 한다.

### 아쉬웠던 점과 보완할 점

#### Document Tree 구조 만들기

나는 재귀함수랑 아직도 낯을 가리고 있기 때문에, 받아온 문서 목록을 재귀구조를 통하여 Tree 형태로 만드는게 너무 어려웠다. 또한 서버에서 상태를 받아올 때 마다 재귀 구조로 새롭게 목록을 생성하도록 만들다보니 만들어진 이후에 DocumentList의 상태를 변경했을 때(Document가 추가되거나 삭제되었을 때) 사용성을 위한 낙관적 업데이트로 클라이언트 쪽에서 수정하는 로직을 구현하기가 어려웠고, DocumentList의 상태가 변경될 때 마다 서버에서 데이터를 받아오는 과정이 발생하므로, Sidebar의 렌더링 속도가 느리다는 문제점이 있었다.

따라서 애초부터 DocumentList를 클라이언트 측에서 다루기 쉬운 자료구조를 이용하는 것이 관건이라고 생각하였다. 이제서야 생각이 났는데.. 데브코스 첫주차쯤에 배웠던 Linked List를 통하여 트리 구조를 구현하고, 이 구조를 DocumentList에 상태로 저장하게 하면 어떨까..라는 생각이 든다.

#### 사용자 편의성과 낙관적 업데이트

이 점이 아쉬웠던 것은

**비동기와 상태관리 \+ 클라이언트에서 서버가 받아온 데이터를 통해 적절한 자료구조를 만드는 것**

에 대한 이해도 부족으로 요약할 수 있다.

비동기에 대한 이해부족으로 클라이언트에서 다룰 상태에 대한 적절한 자료구조를 만들지 못하였고, 따라서 클라이언트 단에서 관리해야할 데이터가 복잡해졌고, 이 데이터를 다루지 못해서 결국엔 사용자 편의성까지 해치게 되었다.

따라서, 이번 프로젝트에서는 특히 **비동기와 상태관리, 자료구조** 가 중요하게 느껴졌던 프로젝트였다.

#### 클린코드와 Validation

구현하기가 급급해서 머릿속에서 '아\- 이부분은 나중에 함수로 빼야지', '아\- 여기 변수이름 조금 바꿔놔야지', '아\- 여기 유효성 검사를 구현해야지'라는 생각은 했었는데, 생각만 했다 ㅋㅋㅋㅋㅋ 막상 구현 완료 후 디버깅할 때는 정신이 없어서 리팩터링이고뭐고 아무 생각이 들지 않더라..

Clean Code에서 클린코드는 습관이라는 말이 있다. 동감한다. 코드에서 냄새가 나는 시점이 바로 리팩터링을 해야하는 시점인 것이다... 그리고 이건 Validaton 도 마찬가지다.

아! 그리고 esLint와 Prettier를 연계해서 처음으로 사용해봤는데, 진짜 좋았다!

[ESLint & Prettier, Airbnb Style Guide로 설정하기 | velog](https://velog.io/@_jouz_ryul/ESLint-Prettier-Airbnb-Style-Guide%EB%A1%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

#### 이상한 버그

PR을 전부 작성하고 나서 이상한 버그를 발견하였다. 버그에 진입하는 방법도 진짜 신기한데ㅋㅋㅋ 이 버그를 만들어내기 위해서는

1\. 처음에 VSC에서 serve를 해야하고

2\. 이 때 서버에서 받아온 DocumentList는 비어있어야 한다.

위의 1,2의 조건을 모두 만족시키면 RootPage에서 Editor로 글을 생성할 때, 자동으로 생성되지 않고 제목을 변경해야 수정이되는 문제가 있다. 이 버그가 처음 구현할 때도, 발생해서 수정을 했었는데 이상하게 VSC로 serve를 처음하는 시점에서 다시 이 버그가 발생한다. 왤까...

#### 추가요구사항

추가 요구 사항을 구현하다가 모든게 꼬이는 경험을 여러번 겪고 나서 추가 요구사항을 구현하지 못하였다.

추가 요구 사항과, 내가 이 요구사항들을 왜 구현하지 못했을까에 대해서 간단하게 생각을 해보았다.

- **div와 contentEditable로 노션처럼 에디터 만들어보기**각 DOM 요소들에 대하여 이해가 부족했던 것 같다. 특히나 contentEditable 속성을 제대로 이해하지 못하였다.
- **부모 Document에서 자식 Document로 이동할 수 있도록 하기** 비동기와 상태관리에 대한 이해가 더욱 필요하다. 각 component 별로 state를 계속 console에 출력하면서 확인을 해봤었는데, 위에서 언급했던 내가 브라우저에서 보고 있는 것의 시간대 !== 서버와 클라이언트의 통신 의 부조화때문에 비동기 상태관리가 잘 이해되지 않았었다. 따라서, 이 state를 받아오기 전까지 그 전에 클라이언트에서 무언가를 해줘야한다.

#### CSS

지금까지 모든 과제에 CSS를 적용하지 않았었는데... 업보폭탄 제대로 맞았다. 그래서 토글을 구현한다던가, SPA를 구현한다던가에서 CSS 속성을 사용해볼 생각을 초반에 하지 못했어서 과제가 더 어렵게 느껴졌던 것 같다. 그리고 notion 비스무리하게 스타일링 할 때, DOM 요소들이 내맘대로 움직이지 않아서 너무 힘들었다ㅋㅋㅠㅠㅠ 역시.. CSS는 연습이다.

### 회고

모든게 새로웠고ㅋㅋㅋㅋ, 그래서 결과물의 퀄리티와 상관 없이 재밌게 구현했었다. 사실 프로젝트 전까지 강의를 소화하기 너무 힘들어서, 의욕이 조금 떨어진 것 같았는데 이 프로젝트가 트리거가 되어 더욱 강의를 즐겁게 수강할 수 있을 것 같다.

그리고 비동기에 대한 관심이 생겨서 이 부분에 대해서 깊게 공부를 해볼 것이다. 비동기와 비동기를 다루는 방식들(pub-sub 패턴이 아니고 다른 패턴들도), 함수형 프로그래밍을 통하여 비동기를 다루는 것 까지 학습을 하고, 아티클을 작성하거나... 발표를 하거나... 하고 싶다.

또한, 항상 뭔가 프로젝트를 하면서 느끼지만 자료구조와 알고리즘은 진짜 중요하다. 특히나 클라이언트 단에서 받아온 데이터를 올바른 자료구조로 잘 만들어나가는게 결국엔 사용자의 편의성까지 만들어주는 것이라는 걸 제대로 깨달을 수 있었던 프로젝트 였다.

### 번외

나는 다른 곳으로 잘 새는 성향이 있어서, 코딩이나 프로젝트를 할 때 우선순위를 위해서, 당장 해야하는 일을 메모하고 체크해가면서 하는 습관이 있다. 지금까지 종이에 대충 적다보니깐 조금 깔끔하게 하고 싶어서 노션에 예쁘게...는 못만들어도 최소한 깔끔하게 정리하면서 체크하려고 했는데

![](https://blog.kakaocdn.net/dn/pbJd7/btrz0ulT7Z5/qUKP4QUBJsqaKMKvzohW6k/img.png)희망편

점점 다양한 버그가 생기고, 집중하다 보니깐 원래 하던 방식으로 돌아가 버렸다ㅋㅋ 역시 난 조금 와일드(?)한 방식이 맞는 것 같다. (글씨체도 점점 맛이가고 있는 것을 보실 수 있다)

![](https://blog.kakaocdn.net/dn/bifsIW/btrz0C5Pje4/oqFheTSkQFUZIKnRWrSKek/img.jpg)절망편
