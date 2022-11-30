---
title: "[Artzip 리팩터링] 최적화 방향 잡기"
date: 2022-08-20 23:03:03
tags: ["리팩터링", "Artzip"]
draft: false
---
## TL;DR

- LightHouse를 통하여 성능 지표를 확인하여 최적화 방향을 잡아보자.
- 이미지 최적화 방식을 생각해보고 이 기능들을 사용할 수 있는 nextJS에 어울리는 `next/image`를 활용하는 방향으로 이미지 최적화 방향을 설정해 보았다.

## 들어가면서

당장 개발하고 있는 우리 팀도 느꼈고, 백엔드 쪽에서도 한 번 이야기가 나왔었고,

타 팀에서의 피드백에서도 전체적으로 애플리케이션이 느리다는 피드백을 많이 받았다.

특히나 많은 피드백을 받은 페이지는 두 군데 였는데, 첫 번째로 가장 중요한 메인 페이지이다.

![](https://blog.kakaocdn.net/dn/P0HTa/btrJ7RTdR1p/RVW5xBWECatNvLvBwm0El1/img.png)

Next JS의 중요한 장점 중 하나는 '개선된 첫 페이지 로딩 속도' 이고, 사이트의 첫 인상인 만큼 로딩속도가 중요한 부분이다.

그리고 두 번째로 비슷한 현상을 나타내는 부분이 있었는데,

![](https://blog.kakaocdn.net/dn/bcGcDo/btrJ70Cp51s/qJQprWpjYfTnLrjGqaPWw1/img.png)유저 페이지 \- 좋아요 한 후기

![](https://blog.kakaocdn.net/dn/r2vXO/btrJ7se6ipW/KPqEWKn5I5syrCLroCkNWK/img.png)유저 페이지 \- 좋아요 한 전시회

유저 페이지였다.

우선, 렌더링이 느려지는 원인을 파악해보면 메인 페이지와 유저 페이지의 경우,

메인 페이지는 CSR 방식으로 이미지를 불러오고 있고, 유저 페이지는 SSR 방식으로 이미지를 불러오고 있다. 즉 렌더링 방식의 문제는 아닌 것 같고 **이미지를 브라우저에 그려내면서 속도가 느려졌다** 고 생각한다. (물론 LightHouse 분석 결과 SSR 방식을 사용하는 것을 권장하는 내용이 있긴 하였다.)

이 페이지들은 공통적으로 **이미지를 주로 사용하는 컴포넌트를 많이 사용하고 있다.**

**따라서, 이미지를 렌더링 할 때 성능 이슈가 생긴 것이라고 추측한다.**

## LightHouse 로 성능 파악하기

 우선, 개선을 하기 전에 실질적인 로딩 성능을 알아보기 위하여 크롬 개발자 도구의 LightHouse 를 사용하여 성능을 파악해보자. 우선 가장 시급한 부분이 메인 페이지의 성능이므로, 메인 페이지의 성능을 측정해 보았다.

![](https://blog.kakaocdn.net/dn/c1BA0N/btrKl2rJqVd/1CkAijwXcYUqaftgrwB851/img.png)

그냥봐도 Performance 부분에서 문제가 있어보인다.

조금 더 자세히 알아보았다.

![](https://blog.kakaocdn.net/dn/b2ZWkm/btrKl2rJjlk/pzbjomjEhl7fujbQxSOSAK/img.png)메인페이지의 분석 결과

- First Contentful Paint - 첫 DOM 을 렌더링하는데 걸리는 시간
- **Time to Interactive**\- 웹 페이지가 사용자와 상호작용하기 위해 걸리는 시간
- **Spread Index** \- 웹 페이지를 불러올 때, 콘텐츠가 시각적으로 표시되는 데 까지 걸리는 시간
- **LCP (Largest Contentful Paint)** \- 뷰 포트에서 가장 큰 콘텐츠가 렌더링 될 때 걸리는 시간
- **Total Blocking Time -** First Contentiful Paint 와 Time to Interactive 사이의 시간, 즉 메인 스레드가 blocking 되는 시간
- Cumulative Layout Shift - 예상치 못한 레이아웃 이동

이다.

## Performance - LightHouse에서 제시해준 방안

#### Opportunities

 페이지 로드를 더욱 빠르게 해주는데 도움은 되지만, LightHouse에서 매겨준 퍼포먼스 점수에는 영향을 주지 않는다고 한다. 어떤 방안을 제시하였는지 살펴보자.

![](https://blog.kakaocdn.net/dn/bJiYDB/btrKkf6Kgu5/Kk5g2zmwKJ9NoLOTpYyc2K/img.png)

- **Properly size image** -  적당한 크기의 이미지 사용하기. `Next/image` 를 사용하면 최적화가 편하다고 한다. 슬프게도 API 로 받아오는 이미지의 경우 예상할 수 없는 외부 URL에는 적용할 수 없고(`Next/image` 를 사용하기 위해서는 next.config.js에 각각의 이미지 url의 end point를 제시해야 하기 때문) 로고와 같은 정확하게 근원을 알 수 있는 이미지에서만 사용이 가능하다.
- **Reduce unused Javascript** : 말 그대로 사용하지 않는 자바스크립트 코드를 제거하기.. Next JS로 만든 앱의 경우 `Webpack Bundle Analyze` 을 사용하여 사용하지 않는 자바스크립트 코드를 탐지할 수 있다고 한다.
- **Use HTTP/2** \- 외부 이미지 url이 HTTP/1.1을 사용하고 있어서 제시되었다고 생각한다. 이건 어쩔 수 없는 부분이므로 패스...

그 외에 많은 Oppertunites 가 제시되었는데, Next의 경우 `next/image` 를 사용하여 이 부분을 많이 개선할 수 있는 것 같다. 프로젝트에서 사용할 수 있는 부분은 `Next/image` 를 사용하도록 해야겠다.

#### Diagnostics

![](https://blog.kakaocdn.net/dn/dASwUL/btrKl26mEit/mA0Yq2WADkNK18qBbivjL0/img.png)

 애플리케이션의 퍼포먼스에 대한 정보이다. 역시 performance 점수에는 영향을 미치지 않는다.

- **Avoid enormouse network payloads**
- **Serve static assets with an effcient cache policy** \- CSR를 사용한 부분이므로 next 에서 지원하는 SSR이나 SSG이용하기... 특히나 SSG의 경우에는 CDN에서 캐시를 해주기 때문에 이를 사용하여 최적화 할 수 있을 것 같다.
- **Ensure text remains visible during webfont load** \- 이 경우에는 font-display: swap 속성을 통하여, 웹 폰트가 로드될 때 text는 사용자가 볼 수 있게끔 할 수 있다고 알고 있다.
- **Image elements do not have explicit width and height** \- CSR를 사용한 부분에서 (아무래도 이미지를 받아올 때 그 부분은 비어있으므로) 그 사이즈 만큼 레이아웃이 비어있다는 문제가 있는 것 같다. (즉 CLS에 영향을 미친다는 뜻) 역시 next/image 를 활용하던가, 로딩 스켈레톤 처리 등을 할 수 있을 것 같다.

## 어떻게 최적화를 할 수 있을까??

리포트를 살펴 보면, 어쨌던 간에 렌더링 시간을 최적화 시켜서 사용자가 인터렉션 하기 까지 걸리는 시간을 줄여야 한다.

특히나, 이 페이지들은 이미지를 많이 사용하는 부분이므로 이미지 최적화가 필요하다고 생각하였다. (다른 쪽에서의 최적화도 필요하겠지만, 이는 최적화를 진행하면서 다뤄보겠다)

우선 당장 생각나는 이미지 최적화 방식은 다음과 같다.

- **Lazy Loading**

    이미지가 뷰 포트에 들어오기 시작하면 로딩을 한다. 이 방법의 경우, 첫 페이지에서는 모든 카드가 뷰 포트에 들어오기 때문에 실질적으로 우리의 최적화에서는 사용하기에 적합하지 않다. (근데 내가 맡은 커뮤니티 페이지에서는 사용할 법 하긴 하다)
- **Progressive Loading**

    처음에는 로딩을 빠르게 할 수 있는 저화질의 이미지로 이미지를 로딩하였다가, 고화질의 이미지가 로딩되면 갈아끼우는 방식이다. 이 경우, 백엔드 측에 추가적인 API를 요청해야하기 때문에 프론트엔드 단에서는 처리하기 힘들 것 같다.
- **next/Image 사용하기**

    next/Image는 자동으로 width와 height를 설정하게 하는데, 이를 통하여 자동 스켈레톤 UI를 만들어준다던가 이미지를 캐싱하고, lazy loading을 지원하는 등의 기능을 지원한다. 이를 사용하여 많은 부분을 해결할 수 있을 것 같다. 또한 대부분의 이미지가 사용한 공공 api에서 제공되고, 우리 서버에서 제공되는 이미지이므로 domain에 추가하여 사용할 수 있을 것 같기도 하다.

    (\+ 추가 : 백엔드 측에서 사용하는 이미지의 domain들을 알려주셔서 이를 그대로 추가하면 될 것 같다!)

## 결론

LightHouse 를 통하여 프로젝트의 성능 지표를 분석해보았고, 이미지 최적화에 대하여 알아보았다. 우선적으로 `next/image` 를 활용하여보기로 하였고, 이 성능 지표를 따라서 다양한 성능 최적화를 적용할 예정이다.

또한 관련 내용을 프로젝트의 discussion과 issue에 올려두었다.

[https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions/107](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions/107)

[next/image 사용 시, Invalid src prop 에러 · Discussion #107 · prgrms-web-devcourse/Team-BackFro-ArtZip-FE\
\
\
next/image 사용 시, Invalid src prop 에러 next.config.js 에서 hostname 다음에 오는 링크를 설정한다. 해결 방안 : module.exports = { reactStrictMode: true, // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으\
\
\
github.com](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions/107)

[https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/issues/223](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/issues/223)

[[공통] next image를 사용하기 위한 domain 추가 · Issue #223 · prgrms-web-devcourse/Team-BackFro-ArtZip-FE\
\
\
개요 이미지 최적화를 위해 next/image 를 사용하기 위하여 domain을 추가합니다. 백엔드 분에게 여쭤봤는데, 도메인이 정해져있는 것 같더라고요! 우선 추가하고 커뮤니티 페이지에 점진적으로 추\
\
\
github.com](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/issues/223)

## 참고자료

더보기

[https://ui.toast.com/weekly-pick/ko\_202012101720](https://ui.toast.com/weekly-pick/ko_202012101720)

[LCP(Largest Contentful Paint) 최적화하기\
\
\
Largest Contentful Paint(LCP)는 Core Web Vitals의 지표이며 뷰포트에서 가장 큰 콘텐츠 엘리먼트가 나타날 때 측정한다. 페이지의 주요 내용이 화면에 렌더링이 완료되는 시기를 결정하는데 사용된다.\
\
\
ui.toast.com](https://ui.toast.com/weekly-pick/ko_202012101720)

[https://onlinemediamasters.com/avoid-enormous-network-payloads-wordpress/](https://onlinemediamasters.com/avoid-enormous-network-payloads-wordpress/)

[15 Ways to Avoid Enormous Network Payloads in WordPress\
\
\
Avoiding enormous network payloads simple means you need to reduce page size which can be done through various methods.\
\
\
onlinemediamasters.com](https://onlinemediamasters.com/avoid-enormous-network-payloads-wordpress/)

[https://fe-developers.kakaoent.com/2022/220714-next-image/](https://fe-developers.kakaoent.com/2022/220714-next-image/)

[Next/Image를 활용한 이미지 최적화\
\
\
카카오엔터테인먼트 FE 기술블로그\
\
\
fe-developers.kakaoent.com](https://fe-developers.kakaoent.com/2022/220714-next-image/)

[https://oliveyoung.tech/blog/2021-11-22/How-to-Improve-Web-Performance-with-Image-Optimization/](https://oliveyoung.tech/blog/2021-11-22/How-to-Improve-Web-Performance-with-Image-Optimization/)

[웹사이트 최적화 방법 \- 이미지 파트 \| 올리브영 테크블로그\
\
\
이미지 최적화로 웹 성능을 향상시키는 방법\
\
\
oliveyoung.tech](https://oliveyoung.tech/blog/2021-11-22/How-to-Improve-Web-Performance-with-Image-Optimization/)

[https://codingmoondoll.tistory.com/entry/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-4-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8C%8C%EC%9D%BC-%EC%B5%9C%EC%A0%81%ED%99%94](https://codingmoondoll.tistory.com/entry/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-4-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8C%8C%EC%9D%BC-%EC%B5%9C%EC%A0%81%ED%99%94)

[프론트엔드 성능 최적화 \- 4\. 이미지 파일 최적화\
\
\
이 글은 아래 링크의 내용을 바탕으로 작성되었습니다. https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html https://www.youtube.com/watch?v=2QYpkrX2N48 https://d..\
\
\
codingmoondoll.tistory.com](https://codingmoondoll.tistory.com/entry/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-4-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8C%8C%EC%9D%BC-%EC%B5%9C%EC%A0%81%ED%99%94)