---
title: 'TIW : CSS로 트위치를 클론 한 내 코드를 셀프 코드 리뷰함.'
date: 2022-05-08 04:18:39
tags: ['TiL']
category: '데브코스'
draft: false
---

더보기

내 css 목표는 티스토리 스킨을 제작하는 것이다.

이번주는 CSS와 pre-processor를 배우고, 배운 내용을 활용하여 웹 사이트를 클론하는 과제를 하였다.

역시 급하게 시작하였기 때문에(그래서 깃 오류도 없었음) 그동안 TIL을 작성하지는 못했지만

기록으로 남겨두지 않는다면 이번 한 주를 멍하니 흘려보내는 것이므로

과제를 하면서 작성한 코드를 뜯어보면서 배운 내용을 정리해보도록 하겠다.

---

우선 내가 클론한 사이트는 [트위치](https://www.twitch.tv/?lang=ko) 이다.

![](https://blog.kakaocdn.net/dn/bFDO3K/btrBsZL6TvE/ZRGGbkfd5twjIGnEwogOy0/img.gif)

왜 트위치를 골랐냐면... 사실은 넷플릭스를 하려고 했었는데 마침 팀원 분이랑 주제가 겹쳐서...라는 현실적인 이유도 있었지만 이번 과제를 통해서 가장 내가 경험해보고 싶었던 점은

**『배운 토픽에 대한 내용들을 가능한 모두 활용해볼 것』** 이였다.

flex의 경우, 아는 내용이..긴 했지만 진짜 겉핥기로 알고 있었고, grid의 경우 정말로 초면이였기 때문에 최대한

CSS에 대한 기본기가 많이 부족한 상태긴 하지만, 개인적으로 CSS는 습관의 부분이 꽤나 차지하고 있다고 생각하기 때문에 새로 알게 되는 내용을 적용시켜보고 싶었다. (특히나 grid를 적극적으로 사용하기 위해서 노력하였다.)

그래서 트위치를 만들어보면 여러가지 속성을 적용시킬 수 있을 것 같다고 생각을 했다.

문제는 이번에도 과제를 꽤 급하게 했기 때문에... 뒤로 갈수록 되는대로 css를 만들던 습관이 나왔지만(코드 리부 하시는 분에게 미리 죄송합니다) 우선 셀프 리뷰를 하면서 이번 주 동안 배운 내용을 복기해보도록 하겠다.

---

## 1\. 마크업

제일 힘들었던 부분이였다. 왜냐하면

![](https://blog.kakaocdn.net/dn/uWm2v/btrBws68R7X/ZGcdNIqbJD3KVlm7FsWkL1/img.png)

js를 하나도 안쓰려고 하다보니깐 이렇게 순수하게 html 만 1400줄이 넘게 나왔다ㅋㅋㅋㅋ ㅋ거의 5시간 동안 마크업을 한 것 같다. 나름 꼼꼼하게 마크업을 했다고 생각했는데... 클래스 이름 정하는게 너무 어려웠고 시멘틱 태그를 적용하는 것 역시 어려웠다.

우선 마크업 구조는 크게 다음과 같이 잡았다.

![](https://blog.kakaocdn.net/dn/bt8RrE/btrBrLgC3w4/x5OJTscL5wmzl69oWmwms1/img.png)

큰 컴포넌트부터 작은 컴포넌트로 들어가는 방식으로 이야기를 해보려고 한다.

## 2\. 상단바 (navbar)

![](https://blog.kakaocdn.net/dn/FlaKP/btrBr6Lxz8T/VLxoU8imPukiHD6lDcqFZk/img.png)

상단 navbar의 경우 (그런데 navbar라는 표현이 제대로 된 표현이 맞나 싶다. header가 더 적절했을지도???) 이 컴포넌트를 만들었을 때 고려했던 점은 다음과 같다.

**1\. 상단 바가 화면 상단에 고정되게 하기**

**2\. flex 이용하기**

flex의 경우, 1차원 레이아웃 구조이기도 하고 상단바에서 왼쪽, 오른쪽이 끝에 붙어있고, 나머지 요소는 같은 간격으로 배치되어야 하기 때문에, 확신의 justify-contet: space-between을 이용하겠다는 생각이 들었다. 따라서, flex를 이용할 수 있도록 화면의 요소를 크게 left, center, right 로 나누어서 마크업 하였다.

#### 화면 최상단에 상단바 고정하기 \- position:sticky

![](https://blog.kakaocdn.net/dn/bfXFxK/btrBqDivqyv/8qbJ644qFRJiKHMFHAAXLk/img.png)

상단 바를 화면에 고정하기 위하여 **position: sticky;** 속성을 사용하였다. 이 속성의 경우 **설정한 위치 기준으로 설정한 위치에 도달하기 전까지는 static 속성처럼 행동하다가 설정한 위치에 다다르면 fixed 속성처럼 행동한다** 고 한다. 즉, sticky 속성의 경우 위치 기준이 필요하다. 따라서 **top, bottom, left, right 와 같은 속성이 없으면 제대로 동작하지 않는다.** 이 경우 nav을 항상 화면의 최상단(top: 0)에 위치하게 하기 위해서 top:0을 적용하였다. 그리고 가장 위에 와야하므로 z-index를 10 으로 주었다.

그런데 내 코드의 경우 상단에 고정하기 위한 코드와, flex에 관련된 코드가 멀리 떨어져있기 때문에 보는 사람이 조금 불편할 것 같다. 따라서 이 부분을

![](https://blog.kakaocdn.net/dn/JBKhu/btrBsZSMgw6/vySK8AAChKXxZFbSfOku5K/img.png)

이런 식으로 읽어내려가면서 일관성을 느낄 수 있도록 수정하였다.

### Left Container : 로고(이미지)와 버튼으로 구성

#### 이미지 크기를 요소의 크기에 맞게 조정하기

개인적으로 과제 내내 가장 힘들었던 부분이였다. 특히나 nav bar 부분에서는 트위치 로고가 이미지 파일이였고 폰트어썸에서 제공되는 아이콘이 마음에 안들어서 직접 그렸던 아이콘이 있었기 때문에 특히나 height와 width를 정하기가 어려웠다.

css 작업을 nav 를 가장 먼저하여서, 아무것도 모르는 상태에서 width와 height를 셀프로 적당히... 조정하였으나.....

![](https://blog.kakaocdn.net/dn/bwe4rl/btrBw97FfeP/xuYqkeGvz7lEh7asmzSLJ1/img.png)

CSS의 max-width와 max-height 속성을 활용하여 이미지 크기를 부모 요소에 맞게 조정할 수 있었다.

따라서 위의 코드는

![](https://blog.kakaocdn.net/dn/FNWVw/btrBs0jOCzN/LkkygcsJCFytNkBNU3K0Q0/img.png)

이 정도로 정돈할 수 있을 것 같다. 중복된 코드와, 영향을 미치지 않는 코드를 삭제하고 (width: auto) 방금 말했던 max-height 속성을 통해, 요소가 부모 요소의 영향을 받지만 30px 이상으로는 늘어나지 않도록 변경하였다.

navbar의 경우, 화면 너비(px)에 따라 반응형으로 움직이도록 설계하였기 때문에, px으로 정의한 부분은 바꾸지 않을 것 같아도 될 것 같았다.

### 툴팁 구현하기

트위치에서 몇몇 버튼에 커서를 올리면 그 요소에 대한 툴팁이 나오는데,

예-전에 css 세션에서 가상 요소를 만들어서 툴팁을 구현한다는 기억을 되짚어서...

[https://blogpack.tistory.com/1009](https://blogpack.tistory.com/1009)

[CSS 가상요소로 툴팁 말풍선 만들기\
\
\
자바스크립트 도움 없이 CSS만으로도 간편하게 멋진 툴팁을 만들어서 표시할 수 있습니다. 툴팁을 표시하는 버튼 만들기 먼저 툴팁에 표시할 텍스트 내용을 이미지 태그에 추가해야 합니다. 사\
\
\
blogpack.tistory.com](https://blogpack.tistory.com/1009)

이 블로그의 내용을 참고하여 툴팁을 구현하였다.

기본적인 구현 원리는

1\. 우선, 툴팁을 구성하고자하는 속성에 data-tooltip으로 툴팁 내용을 설정하고,

2\. 툴팁 가상요소를 만들고, 평소에는 display: none으로 설정해두었다가

3\. hover 되었을 때만 display: block을 이용해서 다시 보이게 한다.

이다.

이 툴팁 가상요소를 구현할 때 가장 중요한 점 중 하나는, 결국 툴팁은 hover하는 요소를 기준으로 움직여야 하므로, 툴팁 가상요소는 해당 요소에 대해서 position: absolute를 설정하고 해당 요소는 absolute가 잘 동작하게 하기 위하여 position: relative를 설정해야 한다는 것이다.

그리고, tooltip의 너비가 안의 text에 맞게 움직이도록 하기 위하여 fit-content 속성을 적용하였다.

![](https://blog.kakaocdn.net/dn/Ytak1/btrBw97IwI1/KzmqlWCWPK5q4z54mEumu0/img.gif)

## 3\. main

위의 전체 구조와 같이, 나는 가장 크게는 nav와 main으로 나눠서 마크업 구조를 잡았다.

그리고 main의 경우,

![](https://blog.kakaocdn.net/dn/bzklhX/btrBst7Dilv/RtUSI8koGhTK2Pwx28H39k/img.png)

다음과 같이 마크업 구조를 잡았다.

항상 css를 작업할 때, 요소들이 나뉘어져있을 때, 이 요소들의 위치를 조정하는게 정말로 힘들었는데,

수업시간에 grid를 배우면서 fr라는 단위를 활용하면 요소들의 width 나 height 위치를 잡기가 편할 것 같아서

main 은 grid를 이용하고, 사이드바와 section을 1 fr 과 6 fr로 나누어서 작업하였다.

그리고 이 fr 단위는 나중에 반응형을 작업할 때도 정말 편하게 사용할 수 있었다.

![](https://blog.kakaocdn.net/dn/bRfrIW/btrBsY7pX4m/dt76zYlbB0IaF8ZFl9Oiwk/img.png)

## 4\. sidebar

여기서 이슈가 한 가지 있는데, 스크롤바를 사이드바 높이 (100vh) 이상으로 올리면

![](https://blog.kakaocdn.net/dn/0bNAd/btrBxar2iKV/eDGlQoVBTWPoyOpsMSSQqk/img.png)

이렇게 사이드바도 함께 내려가버린다는 문제가 있다.... (해결못해서 pr에 질문하였음)

![](https://blog.kakaocdn.net/dn/4rC54/btrBxbdqptN/pLeKgj2HUsDMhP5gtXftjk/img.png)

각각 이렇게 구성하였으며, sidebar 자체는 display 속성을 주지 않았고 (처음에는 display:flex, flex-direction:column 속성을 줬었는데, 생각해보니 이거만 사용하면 아무 속성을 줄 필요가 없다.

- **사이드바 헤더** : 추천채널 문구와 닫는 아이콘을 양끝에 배치하고, 간격을 주기 위하여 헤더 자체를 플렉스로 설정하고, justify-content: space-between과 줄맞춤을 위하여 align-items: center 속성을 주었다.
- **추천 채널 리스트** : 리스트 라는 점을 살리기 위하여 ul 태그로, 각각의 아이템들은 li 태그로 만들었다. display: grid를 사용하여, 각 아이템들을 1 fr씩 배치하였고, grid-gap 속성을 이용하여 각 아이템의 간격을 맞추었다. (다만 이렇게하면 css에서는 전부 list-style을 none으로 설정해야 하는 불편함이 있었다.)

## 5\. 헤더

여기서 구현하지 못한 내용이 있다.

1\. 트위치에서 생방송 되는 화면을 가져와서, 반응형으로 화면이 줄어들면 이 방송화면도 줄어들어야 함.

2\. 생방송되는 화면들은 버튼으로 넘길 수 있어야하고, 넘기면 다른 방송이 플레이됨.

일단 1.의 경우 트위치의 API를 이용하는 영역이라서, 자바스크립트를 사용하지 않고서는(+트위치의 api를 따오지 않고서는) 구현할 수 없었고,

2.의 경우에는... 대체품으로 유투브 영상을 사용했는데, 이 영상을 iframe을 가지고 첨부할 때 영상의 크기가 정해져서 영상의 크기를 마음대로 조정할 수 없었다는 것이다.

그래서

![](https://blog.kakaocdn.net/dn/MkNJQ/btrBrr20v2N/FkZiKLXkdD3AkBKNwGRUwk/img.png)

이런 모양으로 만들어야하는 헤더를

![](https://blog.kakaocdn.net/dn/ctHIOu/btrBtCiOCmu/8IioQ5mruOrmpEIrWnYgl1/img.png)

이런식으로 밖에 구현하지 못했다... (배경은 그라데이션이 더 깔끔해서 그냥 그라데이션 처리했다)

그리고 저 카드형식의 ui의 경우 order 속성을 이용하면 구현할 수는 있을 것 같은데 이건 시간의 문제로.......

반응형으로 유튜브 동영상의 크기를 줄어들게 할 수 없었기 때문에, media 속성을 통해서 특정 너비가 되면 아예 헤더는 사라지도록 구현하였다.

또한 영상 설명의 여러 줄에서 글이 넘치면 elipsis를 적용하고 싶었는데, 평소에 이를 적용하려면 white-space : nowrap을 적용해야 하기에 디테일 설명이 한 줄로 나열되게 되는 문제가 생겼다.

이는

[https://velog.io/@susu1991/multiline-ellipsis](https://velog.io/@susu1991/multiline-ellipsis)

[multiline ellipsis\
\
\
보통 비디오의 제목이나, 상품의 이름 같은 경우 디자인적으로 정한 길이가 넘어가면 넘치는 내용을 자르고 잘렸다는 표시로 '...' 등을 붙입니다.이는 웹킷브라우저에서는 스타일시트만으로 제\
\
\
velog.io](https://velog.io/@susu1991/multiline-ellipsis)

이 코드를 활용하여 webkit box를 통해 구현할 수  있었다.

## 6\. 생방송 리스트

![](https://blog.kakaocdn.net/dn/b7PFiM/btrBtBxpaD0/njdDGT7DCeKH3LNkEdCHc0/img.png)

생방송 리스트는 위와 같이 구현하였다.

나름 시멘틱 태그를 활용해보자, 채널 리스트는 ul이라고 하고, 채널 아이템은 li로 했는데, 제대로 된 마크업인지는 잘 모르겠다. (일단 질러놓는 편)

- 채널 리스트 : 트위치 사이트에서는 최대 화면 크기에서 항상 4개의 라이브 리스트만 보이기 때문에, 나름 공간을 분할 할 때 가장 편하다고 생각하는 grid를 사용하여 각 column들을 4개로 분할 하였다.
- 채널 아이템 : 각 아이템에 라벨을 달아주기 위하여 position을 relative로 설정하고 각 라벨을 absolute 를 통하여 조정하였다.

  \- 채널 아이템의 설명 부분 (썸네일을 제외한 부분) 역시 아이템들을 양끝에 배치하기 위하여 flex를 사용하였다. 그리고 트위치에서 영상의 제목이 제일 길게 나타나는 것을 구현하기 위하여 **flex-grow : 1** 을 설정하여 요소가 늘어날 수 있도록 하였다.

## 7\. 반응형

코드 자체는 매우 급하게 짰으나... 놀랍게도 시간이 꽤 남아서 반응형을 조금 구현하였다. 또한 반응형을 구현하면서 px로 요소를 조정하게 되었기 때문에, px단위를 %단위로 바꿔야하나....의 고민이 덜어졌다. (이래도 되는지는 모르겠다)

또한 grid의 fr 을 정말을 정말 유용하게 사용하였다. 구체적인 크기를 크게 생각안해도 비율이 변경이 되서 정말... 편리하였다. (역시 이래도 되는지는 모르겠다.)

다만 반응형을 구현할 때, 이상하게 display 속성이 적용이 안되서 display 속성에 !important를 붙일 수 밖에 없었다. 이건..... 코드 리뷰를 받아보기로....

컴퓨터 문제로 영상은 안찍히는 와중에 움짤은 무슨 호러영화처럼 찍혀서 캡처로 대신한다. (난중에 정상적인 컴퓨터로 들어와서 다시 찍어보도록 하겠다)

더보기

![](https://blog.kakaocdn.net/dn/WxtSA/btrBu5Y7iVQ/M5x4eyMj7YI7KoAic7kfrK/img.png)기본 크기![](https://blog.kakaocdn.net/dn/bf0Qsp/btrBzeneOxD/1eEelGSG5kIIjhxUzzf9P0/img.png)중간크기. 헤더가 사라지고, 사이드바가 변경되며 비트 구매 아이콘의 형태가 변한다.![](https://blog.kakaocdn.net/dn/bDjy6g/btrBr5MOeH2/TjHhsiDaNEbvIInexhLk8k/img.png)가장 작은 크기. nav의 아이콘이 변화하며 툴팁 효과가 적용된다.

## 기타 이슈

### reset.css 적용

원활한 css 작업으로 reset.css를 적용하였으나 이를 적용할 때, 컴파일이 되지 않는 오류가 있었다. 이는 경로의 문제였는데(마치 바닐라 js를 사용할 때 index.html에서 무조건 첫 파일을 절대 경로로 지정해야했던 것과 비슷하다)

따라서 reset.css 를 import하기 위해서는 절대 경로를 사용하거나, 컴파일되는 css의 경로에 맞게 사용하여야 한다. (아니면 scss 폴더 안에 scss 파일로 reset고 main의 최상단에 이를 import 해주어도 된다.)

## 아쉬웠던 점

**1\. 사이드바의 토글 기능을 구현하지 못했다. (시간부족)**

[https://blogpack.tistory.com/880?category=804108](https://blogpack.tistory.com/880?category=804108)

[체크박스와 CSS로 만드는 사이드바 펼침 레이아웃\
\
\
체크박스의 체크 상태를 활용하면 사용자 선택에 의한 다양한 레이아웃 변경을 구현할 수 있습니다. 보통은 자바스크립트를 사용해 클릭 이벤트 리스너를 등록하는 방식으로 처리를 하기도 하\
\
\
blogpack.tistory.com](https://blogpack.tistory.com/880?category=804108)

위의 내용을 참고하면 만들 수 있을 것 같은데.... 코드 리뷰 리팩토링 하면서 차근차근 구현해보도록 하겠다.

**2\. 카테고리 리스트의 반응형이 아쉽다.**

카테고리 리스트의 경우, 화면이 작아지면 이 리스트가 전체적으로 작아지도록 구현하였는데(grid를 이용하여 fr 단위로 설정함) 내가 원했던 것은 화면이 작아지면 리스트의 일부만 보이고 나머지는 보이지 않으면서, 크기는 줄어들지 않는 것이 였다 ㅠㅠ

이를 flex:wrap;과 overflow:hidden 으로 구현하려고 하였으나.........

....

좋은 방법 없나요 여러분 (아니면 아예 버튼그룹 반응형 구현한 거 처럼 화면 크기에 따라서 media 쿼리를 작성해야하나... 생각중이다.)

**3\. 그 동안의 TIL 밀린걸 간단하고 편하게 정리하면서 쓸 수 있는 방법이 없을까 하고 작성했는데, 이게 더 복잡하고 번거로운거 같다.**

![](https://blog.kakaocdn.net/dn/q2Zoz/btrBxbxRxwM/aR39Pl6KoIvkQgToKBodnk/img.png)가장 힘들었던 순간
