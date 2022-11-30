---
title: 'about'
date: 2019-1-27 16:21:13
lang: 'ko'
---

# 김다은

## About Me

**개발에 있어서 기본기가 가장 중요하다고 생각합니다**.

- 프론트엔드 기술의 기본이 되는 자바스크립트를 학습하기 위하여, 모던 자바스크립트 딥 다이브 독서 스터디를 리딩하고 있습니다.
- 라이브러리나 프레임워크를 학습하기 전에 해당 기술이 가지고 있는 기본 컨셉과 세계관을 이해하는 것을 최우선으로 생각하고, 프로젝트의 성격과 잘 부합하는 라이브러리나 프레임워크를 선택하려고 노력합니다.

**기록과 문서화를 중요하게 생각합니다.**

- 프로젝트를 개발하면서 있었던 일들을 기록하고, 프로젝트 개발 종료 후 [회고](https://break-your-limit.tistory.com/category/%ED%9A%8C%EA%B3%A0)를 작성합니다.
- 팀과의 소통을 위한 기록 역시 중요하다고 생각합니다.
  - Notion 과 Github 의 Discussion을 활용하여, 팀원들과 프로젝트 이슈를 활발하게 공유합니다.

<div class="contact-and-channel" style="display:flex;justify-content:space-between">

<div class="contact">

## Contact

**Email.** lllspartium@gmail.com

</div>

<div class="channel">

## Channel

**Blog.** [https://break-your-limit.tistory.com](https://break-your-limit.tistory.com/)

**GitHub.** [https://github.com/dar-jeeling](https://github.com/dar-jeeling)

</div>
</div>

# Projects

<div class="project-section" style="width:100%">
  <div style="display:flex;justify-content:space-between" class="project-container">
    <div class="project-title" style="background-color: whitesmoke; padding:10px;width:30%">

## Artzip

**개발**

**22.07.21~22.08.15**

**리팩터링**

**22.08.15~22.11.10**

[**Github**](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE)

[**Notion**](https://www.notion.so/BackFro-ArtZip-8db56ad1304e441e8abe0b7045207852)

[**프로젝트 회고**](https://break-your-limit.tistory.com/75)

  </div>

  <div class="project-detail" style="margin-left: 30px;width:65%">

**미술 전시회의 정보를 조회하고 후기를 공유할 수 있는 웹 플랫폼**

> 💡 **Tech Stack**
>
> TypeScript, Next.js, Emotion, Recoil, SWR, Vercel

- 커뮤니티 페이지, 후기 상세 페이지 구현
  - `InterSection Observer` 를 이용하여 커뮤니티 피드와 댓글의 무한 스크롤 로직 작성
- `Recoil` 을 이용한 전역 유저 상태 관리 로직 구현
- [쿠키를 이용한 SSR 환경에서의 인증 로직 구현 및 모듈화](https://break-your-limit.tistory.com/77)
  - 7개의 페이지 중 5개의 페이지의 Data Fetching 로직을 CSR 에서 SSR로 마이그레이션
  - LightHouse 로 측정한 평균 SEO 점수 68.3 점에서 98.3 점으로 **약 43.92% 증가**
- [이미지 최적화를 위한 `next/image` 도입](https://break-your-limit.tistory.com/76)
  - (메인 페이지 기준) resources 용량 60.6 MB 에서 54.4 MB로 **약 10.23 % 감소**, Load 속도 10.33 s 에서 3.79로 **약 63.31 % 감소**
- 백엔드 개발에 의존성이 있는 로직을 프론트엔드에서 미리 구현하기 위하여 `MSW` 도입
- `Vercel` 을 이용한 배포
- [효율적인 협업을 위한 Github Disscussion 을 이용한 프로젝트 문서화](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions)

   </div>
    </div>
  </div>

  <br>

<div class="project-section" style="width:100%">
  <div style="display:flex" class="project-container">
    <div class="project-title" style="background-color: whitesmoke; padding:10px;width:30%">

## LUVOOK

**22.06.06~ 22.06.22**

[**Github**](https://github.com/prgrms-fe-devcourse/FEDC2_LUVOOK_Jieun)

**[Notion](https://www.notion.so/f567b7542b3d4708be7827b91c74e4b6)**

[**프로젝트 회고**](https://break-your-limit.tistory.com/55)

 </div>

  <div class="project-detail" style="margin-left: 30px;width:65%">

**도서 문구 기반의 도서 공유 플랫폼**

<aside>

> 💡 **Tech Stack**
>
> JavaScript, React, Emotion, Netlify

</aside>

- [`Context API` 와 `useReducer`를 이용한 전역 유저 상태 관리 로직 구현](https://break-your-limit.tistory.com/52)
- 재사용성과 확장성을 고려한 공통 컴포넌트 개발
  - Button, Image, Avatar, BookCard, ListSlider, Navbar 컴포넌트 구현
  - `Storybook` 을 이용한 구현한 컴포넌트 인터렉션 테스트 및 문서화
- 메인 페이지 구현
  - 메인 페이지의 검색, 카테고리 내 검색 기능 구현
  - `Promise.all` 을 이용한 데이터 패칭 로직 구현
- 404 페이지 구현

</div>
</div>
</div>

<br>

<div class="project-section" style="width:100%">
  <div style="display:flex" class="project-container">
    <div class="project-title" style="background-color: whitesmoke; padding:10px;width:30%">

## DuckEggs

**2021.06~2021.08**

[**Github**](https://github.com/Hackathon-DuckEggs/PNU-DuckEggs)

[**Notion**](https://www.notion.so/8-19-663785d02b5d4d3d9be230f60208c4dc)

  </div>

  <div class="project-detail" style="margin-left: 30px;width:65%">

**자연어 분석을 이용한 리뷰 분석 플랫폼**

> 💡 **Tech Stack**
>
> JavaScript, React, Styled Component

- 프로젝트 팀장 및 웹 프론트엔드 개발
- Google Chart 와 D3 Wordcloud를 이용한 자연어 분석 결과 데이터 시각화
- [부산대학교 제4회 창의융합 소프트웨어 해커톤 장려상 수상](https://pnuswedu.org/04_hackathon/previous.php)
    </div>
    </div>
  </div>

# Study

## [모던 JavaScript Deep Dive 스터디](https://www.notion.so/Deep-Dive-cb93ad0db4f941b79fc31ae6a6ff645c)

**2022.04 - 11**

- 자바스크립트의 기본 동작 원리를 이해하기 위한 모던 자바스크립트 Deep Dive 독서 스터디
- **스터디 리드 역할**
  - 전반적인 스터디 진행 역할과 각 주의 주제 관련 내용 공유
  - 스터디 주제에 따라 팀원들의 의견을 반영하여 스터디 방식을 유동적으로 결정

## [CS 발표 스터디](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia)

**2022.04 - 2022.07**

- 일주일에 한 번, 학습할 CS 키워드를 선택하여 학습한 내용에 대해 발표하는 스터디
- 해당 CS 키워드에 대한 발표 자료 작성

  **[스터디 발표 자료]**

  - [Observer Pattern과 Pub-sub 패턴](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia/blob/main/5%ED%9A%8C%EC%B0%A8/%EA%B9%80%EB%8B%A4%EC%9D%80-Observer%20Pattern%EA%B3%BC%20Pub-sub%20%ED%8C%A8%ED%84%B4.md)

  - [LexicalEnvironment](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia/blob/main/3%ED%9A%8C%EC%B0%A8/%EA%B9%80%EB%8B%A4%EC%9D%80%20-%20Lexical%20Environment/LexicalEnvironment.md)

  - [**프로토타입**](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia/blob/main/2%ED%9A%8C%EC%B0%A8/2%EC%A3%BC%EC%B0%A8-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EA%B9%80%EB%8B%A4%EC%9D%80.md)

# Skill

### FrontEnd

- HTML5 ,CSS3, JavaScript (ES6), TypeScript
- React, Recoil
- Next.js

# Education

<div class="edu-section" style="display:flex">

  <div class="edu-title" style="width:30%;background-color:whitesmoke;padding:10px">

**프로그래머스 <br> K-Digital Training
프론트엔드 엔지니어링 데브코스 2기 수료**

**2022-03 ~ 2022-08**

  </div>

  <div class="edu-description" style="width:65%">

- JavaScript 주요 문법, CSS, Vue, React 등의 프론트엔드 기본기 습득
- 각 주제에 관한 과제 구현과 팀원끼리의 코드 리뷰
- 팀 프로젝트를 통한 협업 경험
- 배운 내용에 대한 꾸준한 기록을 통해, 배움 기록 왕 2회 선정

  </div>

</div>

<br>

<div clsas="edu-section" style="display:flex">

<div class="edu-title" style="width:30%;background-color:whitesmoke;padding:10px">

**부산대학교 정보컴퓨터공학부**

**2019-03 ~ 재학 중 (2023년 8월 졸업 예정)**

</div>

<div class="edu-description" style="width:65%">

<div>

</div>
