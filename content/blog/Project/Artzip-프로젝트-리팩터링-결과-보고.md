---
title: '[Art.zip] 프로젝트 리팩터링 결과 보고'
date: 2022-11-14 02:39:16
tags: ['리팩터링', 'Artzip']
category: 'Project'
draft: false
---

프로젝트 종료 이후, 약 2개월 동안 수행되었던 리팩터링 작업이 서버가 닫힘과 동시에 끝이 났다.

이 포스팅에서는 리팩터링을 위해서 어떤 작업을 수행하였는지와 어떻게 수행하였는지, 어떤 성과를 이뤘는지에 대하여 작성한다.

## 들어가면서

![](https://blog.kakaocdn.net/dn/bth45X/btrQ0QNx62F/k9KnXh7m7NMnqdFBwSd3vk/img.png)프로젝트 완성 직후에 받은 평가들

지금 생각해보면 프로젝트의 볼륨이 당시 우리 팀이 할 수 있었던 것보다 꽤나 큰 편이였다. 따라서 프로젝트를 완성(했다고 생각)하고 나서 엄청난 변수들이 발생했는데, 주요 변수는 **SSR 방식에 대한 얕은 이해** 와 **라이브러리에 대해 충분히 알아보지 못했던 것**, 그리고 **배포 환경 내에서 충분한 테스트를 진행하지 못하였던 것** 이였다.

프로젝트에 대한 주요 피드백 역시 이 변수로 인해 나온 것들이였다. 우리 팀은 먼저 피드백 위주로 프로젝트를 개선하고 이 후에 성능이나 UX 면에서 프로젝트를 개선하기로 방향을 잡았다.

## 리팩터링 시작하기

리팩터링 시작 전 팀원끼리 다같이 피드백들을 다시 읽어보고 각자 체크 리스트를 작성하였다.

![](https://blog.kakaocdn.net/dn/b0e6cY/btrQ278QYFE/Js1PYk7Ol7zSPsUK9kGxW1/img.png)리팩터링 초반에 작성한 체크리스트. 실제로는 이것보다 더 많은 리팩터링을 수행하였다

체크리스트를 작성한 이후에 Discussion 을 조금 더 잘 활용해보고자 Discussion 에 Refactoring 탭을 만들고, 매 주 마다 각자 안건을 작성하면서 매 주 디스코드 회의를 통하여 개선작업을 할 지 결정하였다.

![](https://blog.kakaocdn.net/dn/bFv6LF/btrQ1mMbWjq/CQDm5C2v1k3OFBVrhbJlG1/img.png)

#### 리팩터링의 방향

피드백을 읽어가면서 다음과 같이 리팩터링의 방향을 설정하였다.

\- **잔 버그들 관련 (인증)** : 대부분 인증 문제에서 발생한 버그들이였다. 앱을 완성할 당시에는 배포 시 쿠키가 저장되지 않아서 토큰을 제대로 읽지 못하는 이슈가 있었다. **최우선적으로 인증 이슈를 고쳐야 한다.**

\- **서비스가 느리다** : 특히나 메인 페이지에서 성능 이슈가 있었다. 인증 관련 버그 때문에 당시 Next.js의 제대로 된 기능을 이용하지 못하고 useEffect 를 이용한 CSR로만 렌더링하고 있었으며 next/image 와 같은 최적화를 위한 기법도 거의 적용되지 못한 상태였다. 따라서 **리팩터링을 하면서 Next.js의 기능을 최대한 활용하여 프레임워크에서 제공하는 성능 최적화를 이용하여야 한다.**

\- **예외처리와 비밀번호 등의 validation**

또한, 피드백 받은 내용 뿐만 아니라 추가적으로 성능과 UX 관점에서의 리팩터링 방향도 설정하였다.

**\- 성능 관점**

\- SWR를 사용하고자 했으나, 프로젝트하면서는 사용하지 못하였기 떄문에 리팩터링을 하면서 부분적으로 SWR를 적용하여 CSR 을 최적화 한다.

**\- UX 관점**

\- 각 페이지에 대한 접근성을 최적화 한다. (meta 정보 추가)

\- 반응형이 적용되지 않은 페이지에 반응형을 적용한다.

또한 이 전의 작업에서는 직접 브랜치로 이동하여 개발 환경 내부에서 테스트가 위주가 되었다면, **이 후에서는 vercel 에서 각 pr 마다 시범 배포를 해준다는 점을 이용하여, 배포 환경 내부에서 테스트를 위주로 하였다.**

## 주요 성과

### 인증 문제 해결

[Recoil과 Cookie를 이용한 Next.js의 SSR 환경에서 전역 인증 관리하기 (JWT 토큰, 새로 고침 유지)](https://www.allsilver.dev/Technical/Recoil%EA%B3%BC-Cookie%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Nextjs%EC%9D%98-SSR-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EC%A0%84%EC%97%AD-%EC%9D%B8%EC%A6%9D-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-JWT-%ED%86%A0%ED%81%B0-%EC%83%88%EB%A1%9C-%EA%B3%A0%EC%B9%A8-%EC%9C%A0%EC%A7%80/)

개인적으로는 가장 뿌듯한 작업이다. 대략 2개월 동안의 삽질이 있었고, 발상은 산책하다가 전구처럼 스쳐지나갔었다..

관련 게시글을 작성하였기 때문에 자세한 내용은 작성하지 않겠지만,

이 문제가 발생한 가장 큰 원인은 **Next.js 앱이 실행되는 과정을 정확하게 이해하지 못해서 발생하였던 것** 과 **라이브러리를 제대로 알아보고 설치하지 않은 것** 이라고 생각한다.

우선 Next.js에서 앱이 실행되는 과정을 생각해보면 제일 먼저 `_app.tsx` 가 실행되고,

다음과 같이 `_app.tsx`가 작성되었다고 할 때,

```typescript
function ArtZip({ Component, pageProps, userData }: AppProps | any) {
  return (
    <RecoilRoot>
      <SWRConfig>
        <ThemeProvide>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}

ArtZip.getInitialProps = async (appContext: AppContext) => {
  // 안의 코드 생략
};

export default ArtZip;
```

제일 먼저 `getInitialProps`로 서버사이드 데이터 패칭이 일어나고 `RecoilRoot` 로 감싸준 부분에서 일련의 Recoil 로직이 실행될 것이며 안쪽으로 타고 가는 방식으로 앱이 실행될 것이다.

Next.js를 사용하면서 아무 생각없이 코드를 작성하는 것 보다, 서버 사이드 렌더링을 사용한다는 부분을 계속 주의하면서 상태가 어떻게 흘러가는지를 잘 파악해가면서 코드를 작성하는 것이 중요하다는 것을 뼈저리게 느낄 수 있었다.

### 성능 관점

앱이 느리다는 평가를 받았기도 하고, 우리 팀도 체감하는 내용이기도 해서 프로젝트의 성능을 최적화하기 위하여 최선을 다 하였다. 또한 동시에 인증 문제로 인하여 SSR를 제대로 활용하지 못한 부분에 SSR를 활용함으로써 SEO 가 중요한 페이지에서 활용하기로 하였다.

이를 위한 Factor들은 다음과 같다.

- [(Performance) next/Image를 적용한 이미지 최적화](https://www.allsilver.dev/Technical/nextImage-%EC%A0%81%EC%9A%A9%EA%B8%B0/)
- (Performance) 부분적으로 SWR 을 이용하여 Client Data Fetching 최적화
- (SEO) 사용할 수 있는 부분에 SSR 사용하기
- (Acessibility) 각 페이지에 meta 정보 추가하기

내가 맡은 커뮤니티 페이지와 리뷰 상세 페이지의 리팩터링 전 후의 성능 변화(LightHouse 로 측정)은 다음과 같다.

- **커뮤니티 페이지**

![](https://blog.kakaocdn.net/dn/vSfoQ/btrQ9bCpPF1/6a35kbsN9RD5ZRZcVThgE1/img.png)리팩터링 전 후의 LightHouse 점수 비교![](https://blog.kakaocdn.net/dn/cHcxoj/btrQ8ImJ99A/eL9nzkR1fKkpfD6fBeMpF0/img.png)Performance Metric 비교

- **리뷰 상세 페이지**

![](https://blog.kakaocdn.net/dn/cbwCN1/btrQ2RrpK1r/ULfpQu9u6mjyXkWAbqs3QK/img.png)리팩터링 전 후의 LightHouse 점수 비교![](https://blog.kakaocdn.net/dn/bwyT93/btrRa2SJ8NY/QLVmELOp9sdMnBw9yVGWI1/img.png)Performance Metric 비교

전체적으로 유의미한 성능 변화가 있었다.

[내가 맡은 페이지 외의 전체 페이지에 대한 결과는 Discussion 에 남겨두었다.](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions/349)

### UX 관점

프로젝트를 급하게 완성하다보니, UX 적인 최적화가 거의 되어있지 않기 때문에 리팩터링을 하면서 UX 적으로 불편한 부분이 있으면 바꿔나가고 리뷰를 받는 방식으로 최적화 하였다.

UX 관점으로 최적화한 부분은 다음과 같다.

\- **반응형 디자인**

![](https://blog.kakaocdn.net/dn/bsZu6D/btrQ1mrVf8d/44KhgAZdFa9kMvjmEBWOLK/img.gif)커뮤니티 페이지 반응형![](https://blog.kakaocdn.net/dn/cXH8Ni/btrQ1gea31g/bfS6Q6gy0ZKvEIPBZJL8sK/img.gif)후기 상세 페이지 반응형

\- **그 외 자잘한 UX 최적화**

![](https://blog.kakaocdn.net/dn/lQOlq/btrQ9awJe7m/8edg66kzO97hlvMtr6Lma1/img.png)호버시 텍스트 위로 가게 하기

이건 사실 최적화라기 보단 버그 픽스에 가까운데.. Emotion (styled component)의 기능인 컴포넌트의 props를 스타일링에 활용할 수 있다는 점 을 이용하여 수정하였다.

![](https://blog.kakaocdn.net/dn/czH5XO/btrQ0wIAvQK/QIRLnpbdYqvJjteDWDow50/img.png)지나간 날짜는 선택할 수 없게 하기![](https://blog.kakaocdn.net/dn/dVL7Cb/btrQ1gSM1OY/aEcAy5oz9aaPcQ9AfvpKz1/img.png)사용자에게 댓글 없음 메시지 표시하기

![](https://blog.kakaocdn.net/dn/Xe3d3/btrQ4aYzCyw/6TKEZOLbwHj6XAmoa3Y5nK/img.gif)무한 스크롤 로직 변경 및 Spinner 추가

사실 기본 중에 기본인 내용이 많긴 하지만.. 천천히 내가 만든 부분을 직접 테스트 해보면서 UX에 대한 개선 사항을 찾아보고 최적화를 하는 과정이 보람찼다.

[이 외의 전체 UX 최적화 작업 역시 Discussion 에 남겨두었다.](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions/350)

## 프로젝트를 마치면서

![](https://blog.kakaocdn.net/dn/m93Ri/btrQ1fzyEaE/LZkj3oVZvqI5aGkyCKBB0K/img.png)

우여곡절이 많았던 Art.zip 의 리팩터링 작업이 끝이 났다.

프로젝틀를 하면서도 그랬지만, 리팩터링을 하고 나서도 얻은 점이 정말로 많았다.

서버가 닫히지 않았으면 아마 영원히 리팩터링을 하고 있을 것 같지만ㅎㅎ...  이제 깔끔하게 놓아주고 이를 양분으로 삼아 더 좋은 개발을 해야 할 때가 온 것 같다.

데브코스가 끝나고 나서도 활발하게 리팩터링에 참여해주신 ㄱㄷ2팀에게 감사를 표한다.
