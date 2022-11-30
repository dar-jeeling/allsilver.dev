---
title: 'white-space: pre-wrap; (css로 줄바꿈 반영하기)'
date: 2022-09-09 21:12:01
category: 'Technical'
tags: ['CSS', '줄바꿈', 'Whitespace']
draft: false
---

JSX 형식에서는 `\n` 문자를 인식하였을 때, 자동으로 줄바꿈을 해주지 않는다고 한다.

문장마다 `\n`을 spilt 하여 중간중간 `<br />` 태그를 넣어주는 방식도 있겠지만,

배열 연산을 사용한다는 것 자체가 비용이 들어간다고 판단하였다.

이의 경우 CSS 속성인 `white-space: pre-wrap;`  를 사용하면 된다.

```css
white-space: pre-wrap;
```

## 참고 자료

[https://stackoverflow.com/questions/40418024/how-to-replace-n-to-linebreaks-in-react-js](https://stackoverflow.com/questions/40418024/how-to-replace-n-to-linebreaks-in-react-js)

[How to replace /n to linebreaks in react.js?\
\
\
I am trying to replace every /n to a <br> tag in ReactJS. In my note.note object there is a string with multiple /n in it. example note.note: test\\ntest\\ntest What I have tried in ReactJS:...\
\
\
stackoverflow.com](https://stackoverflow.com/questions/40418024/how-to-replace-n-to-linebreaks-in-react-js)

[https://dev.to/cassidoo/make-line-breaks-work-when-you-render-text-in-a-react-or-vue-component-4m0n](https://dev.to/cassidoo/make-line-breaks-work-when-you-render-text-in-a-react-or-vue-component-4m0n)

[Make line breaks work when you render text in a React or Vue component\
\
\
Sometimes you just want those pesky newline characters to actually work!\
\
\
dev.to](https://dev.to/cassidoo/make-line-breaks-work-when-you-render-text-in-a-react-or-vue-component-4m0n)
