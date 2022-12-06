---
title: 'about'
date: 2019-1-27 16:21:13
lang: 'ko'
---

# 안녕하세요!<br>프론트엔드 개발자 지망생 김다은 입니다!

**개발에 있어서 기본기가 가장 중요하다고 생각합니다**.

- 프론트엔드 기술의 기본이 되는 `JavaScript`를 학습하기 위하여, `모던 JavaScript 딥 다이브` 독서 스터디를 리딩하였습니다.
- 라이브러리나 프레임워크를 학습하기 전에 해당 기술이 가지고 있는 기본 컨셉과 세계관을 이해하는 것을 최우선으로 생각하고, 프로젝트의 성격과 잘 부합하는 라이브러리나 프레임워크를 선택하려고 노력합니다.

**기록과 문서화를 중요하게 생각합니다.**

- 프로젝트를 개발하면서 있었던 일들을 기록하고, 프로젝트 개발 종료 후 [회고](https://dar-jeeling.github.io/?category=%ED%9A%8C%EA%B3%A0)를 작성합니다.
- 팀과의 소통을 위한 기록 역시 중요하다고 생각합니다.
  - `Notion` 과 `GitHub` 의 `Discussion`을 활용하여, 팀원들과 프로젝트 이슈를 활발하게 공유합니다.

<div class="contact-and-channel" style="display:flex;justify-content:space-between">

<div class="contact">

### Contact

**Email** lllspartium@gmail.com

</div>

<div class="channel" >

### Channel

**Blog** [https://dar-jeeling.github.io/](https://dar-jeeling.github.io/)

**GitHub** [https://github.com/dar-jeeling](https://github.com/dar-jeeling)

</div>
</div>

# Projects

## Art.zip [(자세히 보기)](https://breakyourlimit.notion.site/Artzip-3b72e2396cbc4c74b15e9e6dba11dab6)

**미술 전시회의 정보를 조회하고 후기를 공유할 수 있는 웹 플랫폼**

|               |                                                                                                                                                                                                                                                                                                              |
| :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   **기간**    | 2022.07.21 - 2022.08.14 / 2022.08.15 - 2022.11.10 (리팩터링)                                                                                                                                                                                                                                                 |
| **외부 링크** | [Github](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE), [Notion](https://backend-devcourse.notion.site/BackFro-ArtZip-8db56ad1304e441e8abe0b7045207852), [프로젝트 회고](https://dar-jeeling.github.io/%ED%9A%8C%EA%B3%A0/artzip-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0/) |

<aside>

> 💡 **Tech Stack**
>
> TypeScript, Next.js, Emotion, Recoil, SWR, Vercel

</aside>

- 커뮤니티 페이지, 후기 상세 페이지 구현
  - `InterSection Observer` 를 이용하여 커뮤니티 피드와 댓글의 무한 스크롤 로직 작성
- `Recoil` 을 이용한 전역 유저 상태 관리 로직 구현
- [쿠키를 이용한 SSR 환경에서의 인증 로직 구현 및 모듈화](https://dar-jeeling.github.io/Technical/Recoil%EA%B3%BC-Cookie%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Nextjs%EC%9D%98-SSR-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EC%A0%84%EC%97%AD-%EC%9D%B8%EC%A6%9D-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-JWT-%ED%86%A0%ED%81%B0-%EC%83%88%EB%A1%9C-%EA%B3%A0%EC%B9%A8-%EC%9C%A0%EC%A7%80/) 를 통한 페이지 SSR 마이그레이션 작업과 이를 통한 성능 향상에 기여
  - 7개의 페이지 중 5개의 페이지의 Data Fetching 로직을 CSR 에서 SSR로 마이그레이션
  - **LightHouse 로 측정한 평균 SEO 점수 `68.3 점`에서 `98.3 점`으로 약 `43.92%` 증가**
- [이미지 최적화를 위한 `next/image` 도입](https://dar-jeeling.github.io/Technical/nextImage-%EC%A0%81%EC%9A%A9%EA%B8%B0/)
  - (메인 페이지 기준) 크롬 개발자 도구에서 측정한 resources 용량 `60.6 MB` 에서 `54.4 MB`로 **약 10.23 % 감소**, Load 속도 `10.33 s` 에서 `3.79 s`로 **약 63.31 % 감소**
- 백엔드 개발에 의존성이 있는 로직을 프론트엔드에서 미리 구현하기 위하여 `MSW` 도입
- `Vercel` 을 이용한 배포
- [효율적인 협업을 위한 GitHub Disscussion 을 이용한 프로젝트 문서화](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions)

## LUVOOK [(자세히 보기)](https://breakyourlimit.notion.site/LUVOOK-c96ff293d90c47f4a9880f487c2d5339)

**도서 문구 기반의 도서 공유 플랫폼**

|               |                                                                                                                                                                                                                                                                                              |
| :-----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   **기간**    | 2022.06.06 - 2022.06.22                                                                                                                                                                                                                                                                      |
| **외부 링크** | [GitHub](https://github.com/prgrms-fe-devcourse/FEDC2_LUVOOK_Jieun), [Notion](https://prgrms.notion.site/f567b7542b3d4708be7827b91c74e4b6), [프로젝트 회고](https://dar-jeeling.github.io/%ED%9A%8C%EA%B3%A0/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0-ALL-WE-NEED-IS-LUVOOK/) |

<aside>

> 💡 **Tech Stack**
>
> JavaScript, React, Emotion, Netlify

</aside>

- 재사용성과 확장성을 고려한 UI 공통 컴포넌트 개발

  - `Button`, `Image`, `Avatar`, `BookCard`, `ListSlider`, `Navbar` 컴포넌트 구현
  - `Storybook` 을 이용한 구현한 컴포넌트 인터렉션 테스트 및 문서화
  - 이전 프로젝트(`DuckEggs`)에 비해 컴포넌트 재사용으로 인한 코드 중복을 줄일 수 있었으며, 프론트엔드 직무의 기본이자 가장 중요한 역량이 되는 기본 컴포넌트 설계 방식에 대해 배울 수 있었음.

- [`Context API` 와 `useReducer`를 이용한 전역 유저 상태 관리 로직 구현](https://dar-jeeling.github.io/Project/220610-220612-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%9D%BC%EC%A7%80-TIL/)

  - 외부 라이브러리 사용없이 `React`에서 제공하는 기본 `hook`과 `api`를 사용하여 상태관리를 구현함으로써 애플리케이션의 기본적인 전역 상태 관리 흐름에 대해서 이해할 수 있게 됨.

- 메인 페이지 구현
  - 메인 페이지의 검색, 카테고리 내 검색 기능 구현
  - `Promise.all` 을 이용한 데이터 패칭 로직을 구현하는 등, 각 API 호출 방식에 따라 `async/await` 에만 국한하지 않는 효율적인 데이터 패칭 방식 고려
- 404 페이지 구현

## DuckEggs [(자세히 보기)](https://breakyourlimit.notion.site/DuckEggs-114866f6943d4cb2a32e200792cb770e)

**자연어 분석을 이용한 리뷰 분석 데이터 시각화 플랫폼**

|               |                                                                                                                                                   |
| :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|   **기간**    | 2021.06 - 2021.08                                                                                                                                 |
| **외부 링크** | [GitHub](https://github.com/Hackathon-DuckEggs/PNU-DuckEggs), [Notion](https://surf-effect-52e.notion.site/8-19-663785d02b5d4d3d9be230f60208c4dc) |

> 💡 **Tech Stack**
>
> JavaScript, React, Styled Component

- 프로젝트 팀장 및 웹 프론트엔드 개발
  - 프론트엔드 역할로의 첫 프로젝트였으며, 프로젝트 팀장 역할을 통한 각 직무의 역할 파악 및 프로젝트 진행 상황 관리
- `Google Chart` 와 `D3 Wordcloud`를 이용한 자연어 분석 결과 데이터 시각화
  - 다양한 분석 결과 데이터를 사용자가 잘 이해할 수 있는 방법을 고려한 차트 형태 선택
- [부산대학교 제4회 창의융합 소프트웨어 해커톤 장려상 수상](https://pnuswedu.org/04_hackathon/previous.php)

# Study

## 모던 JavaScript Deep Dive 스터디

|               |                                                                                        |
| :-----------: | -------------------------------------------------------------------------------------- |
|   **기간**    | 2022.04 - 2022.11                                                                      |
| **외부 링크** | [Notion](https://wild-gear-1b0.notion.site/Deep-Dive-cb93ad0db4f941b79fc31ae6a6ff645c) |

- `JavaScript`의 기본 동작 원리를 이해하기 위한 모던 JavaScript Deep Dive 독서 스터디
- **스터디 리드 역할**
  - 전반적인 스터디 진행 역할과 각 주의 주제 관련 내용 공유
  - 스터디 주제에 따라 팀원들의 의견을 반영하여 스터디 방식을 유동적으로 결정

## CS 발표 스터디

|               |                                                                      |
| :-----------: | -------------------------------------------------------------------- |
|   **기간**    | 2022.04 - 2022.07                                                    |
| **외부 링크** | [GitHub](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia) |

- 일주일에 한 번, 학습할 CS 키워드를 선택하여 학습한 내용에 대해 발표하는 스터디
- 해당 CS 키워드에 대한 발표 자료 작성
- 스터디를 통하여 여러 CS 키워드에 대하여 관심을 가질 수 있는 계기가 됨.

**[스터디 발표 자료]**

- [Observer Pattern과 Pub-sub 패턴](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia/blob/main/5%ED%9A%8C%EC%B0%A8/%EA%B9%80%EB%8B%A4%EC%9D%80-Observer%20Pattern%EA%B3%BC%20Pub-sub%20%ED%8C%A8%ED%84%B4.md)

- [LexicalEnvironment](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia/blob/main/3%ED%9A%8C%EC%B0%A8/%EA%B9%80%EB%8B%A4%EC%9D%80%20-%20Lexical%20Environment/LexicalEnvironment.md)

- [프로토타입](https://github.com/prgrms-web-devcourse/FE-CSstudy-withlia/blob/main/2%ED%9A%8C%EC%B0%A8/2%EC%A3%BC%EC%B0%A8-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EA%B9%80%EB%8B%A4%EC%9D%80.md)

# Education

## 프로그래머스 K-Digital Training 프론트엔드 엔지니어링 데브코스 2기 수료

|          |                   |
| :------: | ----------------- |
| **기간** | 2022.03 - 2022.08 |

- `JavaScript` 주요 문법, `CSS`, `Vue`, `React` 등의 프론트엔드 기본기 습득
- 각 주제에 관한 과제 구현과 팀원끼리의 코드 리뷰
- 팀 프로젝트를 통한 협업 경험
- 배운 내용에 대한 꾸준한 기록을 통해, 배움 기록 왕 2회 선정

## 부산대학교 정보컴퓨터공학부

|          |                                          |
| :------: | ---------------------------------------- |
| **기간** | 2019-03 - 재학 중 (2023년 8월 졸업 예정) |

# Skill

### FrontEnd

- HTML5 ,CSS3, JavaScript (ES6), TypeScript
- React, Recoil
- Next.js
