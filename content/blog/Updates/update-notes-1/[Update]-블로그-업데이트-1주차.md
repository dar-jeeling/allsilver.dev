---
title: '[Updates] 블로그 업데이트 1회차'
date: 2022-12-08 20:47:36
category: 'Updates'
tags: []
draft: false
thumbnail: './images/update_1_week_thumb_list.png'
---

<div class="unsplash-wrapper">
<img class="unsplash-thumbnail-image" alt="thumbnail" src="./images/blog_update_thumb.png" />
<div class="unsplash-author">
Photo by <a href="https://unsplash.com/@heftiba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Toa Heftiba</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</div>
</div>

# 들어가기

티스토리에서 블로그를 옮기면서, 옮기기로한 가장 큰 이유가 블로그를 **내 입맛에 맞게 커스텀 하는 것**이였다.

지금까지 블로그를 이용하면서 개인적으로 탐나거나 있으면 좋겠다 생각했던 부분들을 점진적으로 추가해나갈 예정이다.

업데이트 해나갈 대략적인 내용은 해당 블로그 [GitHub Repo의 Wiki](https://github.com/dar-jeeling/allsilver.dev/wiki/%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%98%88%EC%A0%95-%EA%B8%B0%EB%8A%A5%EB%93%A4)에 기록하고 있으며,
업데이트 내용은 [Wiki](https://github.com/dar-jeeling/allsilver.dev/wiki/Update-Notes)와 이 블로그에 작성한다.

# 이번 주기의 업데이트 내용

## **스크롤 버튼 추가**

   <img width="151" alt="image" src="https://user-images.githubusercontent.com/74234333/206437031-69cd8f35-ceae-4bf6-af2c-69ee41d48fed.png">

특히, 이력서와 같은 길이가 긴 문서에서는 스크롤 버튼이 있으면 UX 가 향상될 것이라고 생각했었다.
Table Of Content 를 추가하는 방법도 있겠지만, 현재 시험 기간이기도 하고 TOC의 레이아웃(특히 모바일에서) 을 어떻게 처리할 지에 대해서 아직도 마땅히 생각하는 바가 없기 때문에 TOC에 비하여 개발 코스트도 적고, 전 페이지에서 범용적으로 사용할 수 있는 스크롤 버튼을 추가하였다.

## **리스트 UI 썸네일이 보이도록 변경**

  <img width="678" alt="image" src="https://user-images.githubusercontent.com/74234333/206437083-c13b318b-b195-4d6f-a1f9-d6b0f5b49e14.png">

많은 개발 블로그에서 썸네일이 없는 경우에는 unsplash 이미지를 불러오는 식으로 사용하고 있기 때문에 썸네일의 유무가 게시글 하나하나를 눈에 들어오게 만드는 역할은 큰 것 같다.
이 썸네일을 어떻게 보여주는가...에 대해서 고민을 했는데, **1. 왼쪽에 정사각형으로 썸네일 배치 후 오른쪽에 글 내용 관련** **2. 썸네일을 위쪽에 크게 배치 후 아래에 글 내용** 의 두 경우가 있는 것 같다.

나는 개인적으로는 직접적으로 관련도 없는 사진이 크게 보이는게 좋을까? 라는 생각을 하지만.. 생각 외로 다른 사람들에게 물어본 결과 2.의 방식을 더 선호하는 사람이 많았다. 우선은 2.의 방식을 적용하고 다른 괜찮은 생각이 들면 레이아웃을 바꿔볼 생각이다.

## **카테고리에 글 갯수 보이는 기능 추가**

  <img width="631" alt="image" src="https://user-images.githubusercontent.com/74234333/206437379-1a4bae81-71d2-4281-b2dd-f9678fc5cef0.png">

## **post 리스트에서 카테고리와 날짜 정보를 보여주도록 변경**

  <img width="212" alt="image" src="https://user-images.githubusercontent.com/74234333/206437202-dfacd59a-28d1-48cc-bdf5-54f3a31a3ffb.png">

## **도메인 이전 및 배포 방식 `Netlify`로 변경**

처음에는 `github-pages` 를 사용하여 배포하였으나, 블로그 이름과의 통일성을 가지고 싶었기도 했고 예전부터 나만의 도메인을 가지고 싶은 로망이 있었기 때문에 이 김에 도메인을 구매하면서 배포 방식도 `Netlify`로 변경하였다.
변경한 이유는 우선 `github.io` 로 끝나는 도메인의 경우 구글에서 sitemap 등록에 애로 사항이 있는 것 같고 (상당히 비슷한 주제의 질문이 많이 올라왔었고, 본인도 그 문제를 겪고 있었다), 배포를 자동화 할 수 있긴 하지만 자동화하는 작업 마저도 귀찮았기 때문에 `main` 브랜치에 push만 하면 자동으로 배포를 해줄 수 있으며, 도메인 설정이 편하고 SSH 인증서까지 지원해주는 `Netlify`를 사용하였다.

## **글 스크롤에 따른 progress bar 추가**

스크롤 버튼과 함께 TOC 의 부재를 보완하는 기능을 위해 추가하였다. 아주 다행히도 `Gatsby` 에서 관련 플러그인을 지원하고 있어서 쉽게 추가할 수 있었다.
한 가지 걸리는 점은 웹의 경우 (모바일은 x) 스크롤을 맨 아래까지 내려도 progress bar 가 끝까지 채워지지는 않던데... 일단 내가 건들 수 있는 영역은 아니므로 우선은 그냥 두기로 하였다.
