---
title: 'emotion 에서 props 받아와서 사용하기 with TypeScript'
date: 2022-10-19 23:48:52
category: 'Technical'
tags: ['emotion', 'typescript']
draft: false
---

React 를 이용하여 컴포넌트를 만들 때, 호버를 이용한 이벤트가 있었는데

컴포넌트에서 사용한 `isHover` state와 css 의 가상 선택자 hover의 싱크가 맞지 않아서, 레이아웃 상의 버그가 있었다.

따라서 컴포넌트 내의 Hover state 을 css에서도 그대로 사용하기 위하여 `emotion`의 `props`를 이용하기로 하였다.

## styled.ts : `emotion`에서 `props` 이용하기

이미 정해져 있는 styled.의 속성에 다른 것을 추가하기 위해서는

`emotion` 의 styled component가 제네릭으로 구현되어있으므로 `styled.div<추가해서 속성>`으로 사용하면 된다.

`TypeScript` 와 함께 `props` 를 이용하기 위해서는 다음과 같이 사용한다.

```typescript
// props 로 사용할 타입 선언
interface HoverProps {
  isHover: boolean
}

export const ExhibitionCard = styled.div<HoverProps>`
  // 다른 속성 생략
  filter: ${props => (props.isHover ? 'brightness(50%)' : '')};
`
```

## tsx 에서는?

컴포넌트가 선언된 `tsx`에서는 기존의 컴포넌트 `props` 사용하듯이 그대로 사용한다.

```typescript
 <S.ExhibitionCard isHover={isHover}>
 	<!-- 이하 생략 -->
 </S.ExhibitionCard>
```
