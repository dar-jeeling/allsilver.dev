---
title: 'next/Image 적용기'
date: 2022-10-07 00:21:38
category: 'Technical'
tags: ['Next.js', 'next/image', 'Artzip']
draft: false
---

> [[Artzip 리팩터링] 최적화 방향 잡기](https://www.allsilver.dev/Project/Artzip-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%95%98%EA%B8%B0/)

위의 글에서 프로젝트의 렌더링이 오래 걸리는 원인을 해결하기 위한 방안으로 "이미지 렌더링 최적화"를 생각하였다.

그리고 프로젝트에서 Next.js를 사용하고 있으며,

이미지를 외부에서 내려 받지만 이미지의 도메인이 고정되어있기 때문에,

Next.js 가 제공하는 **Image Optimization** 을 이용하기로 하였다.

## 적용하기

적용자체는 어렵지 않았다.

다음과 같이 '`next/image`'에서 Image 를 import 해준다.

```typescript
import Image from 'next/image'
```

그리고 로컬에 있는 이미지를 사용한다면 다음과 같이 바로 적용하고,

```typescript
import 이미지이름 from '이미지 경로'
```

외부의 이미지를 사용하는 경우에는, next.config.js 파일에 다음과 같이 작성한다.

```javascript
module.exports = {
  reactStrictMode: true,
  // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  images: {
    domains: [
      // 외부 이미지를 사용할 경우, 그 이미지 URL의 엔드포인트
      // 예를 들어 www.example.com/123213123 이라면 www.example.com 을 작성한다.
    ],
  },
}
```

그리고 '`next/image`' 역시 기존의 image 태그와 사용법이 유사하였다.

단, 한 가지 유의할 점은 `layout="fill'`이 아닌 경우,

받아오는 용량을 제어하기 위하여 `size`나 `width`, `height` 속성이 꼭 필요한데,

프로젝트에서는 컴포넌트 스타일링을 위하여 `layout="fill"`로 설정하였다.

## 컴포넌트 스타일링

`next/Image` 를 적용하는 것보다 스타일링 하는 것이 더 어려웠다.

우리의 프로젝트의 경우, `emotion`을 이용하여 CSS-in-JS를 통하여 컴포넌트 스타일링을 하였는데,

`emotion` 으로 `next/Image` 에 바로 스타일을 적용하니 잘 적용되지 않는 문제가 있었다.

따라서, `next/Image` 위에 `div` 태그를 더 만들어서 이미지 Wrapper 를 만들어 준 후,

`next/Image` 의 속성을 `layout="fill"` 속성을 이용하여 스타일링 하였다.

```typescript
<S.FeedImage>
  <Image
    src={photos.length ? photos[0].path : exhibition.thumbnail}
    layout="fill"
    alt="Review Thumbnail"
  />
</S.FeedImage>
```

## 적용 결과

![](https://blog.kakaocdn.net/dn/MNLzT/btrNZpxquWt/CTm7P2whbGf1KsHC0l2aPk/img.png)next/Image 사용 전![](https://blog.kakaocdn.net/dn/bVdcjF/btrNYp5O7DT/c7UKAimn7hyTcLRtxtYIn0/img.png)next/Image 사용 후

next/Image 를 사용하여, next 의 image optimization 을 이용하여, 처음에 받아오는 이미지의 용량을 감소시켜 받아올 수 있었고 이에 따라 로딩 속도가 빨라짐을 확인할 수 있었다.

![](https://blog.kakaocdn.net/dn/Qt2G3/btrOEijuy4a/QNTcA7ZNgIsFft25YK8Bu0/img.jpg)모든 항목에서 유의미한 감소를 확인할 수 있다.

( **측정과 스크린샷을 제공해주신 기홍님께 감사드립니다!**)

> [ next/image \| Next.js\ ](https://nextjs.org/docs/api-reference/next/image)
