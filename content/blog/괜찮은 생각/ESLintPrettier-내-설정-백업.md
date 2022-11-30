---
title: 'ESLint+Prettier 내 설정 백업'
date: 2022-04-26 16:45:06
category: '괜찮은 생각'
tags: []
draft: false
---

VSC extension에 prettier과 Eslint 가 모두 설치되어있고,

prettier의 Format on Save가 활성화 되어있다고 가정.

[Airbnb 코딩 규칙](https://github.com/airbnb/javascript) 을 적용함

### 1\. 설치

터미널에

`npx install-peerdeps --dev eslint-config-airbnb`

명령어로 설치

### 2\. 세팅하기

#### **.eslintrc.js**

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: ['@typescript-eslint/parser', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error'],
    'no-param-reassign': ['error', { props: false }],
  },
}
```

#### **.prettierrc.json**

```json
{
  "arrowParens": "avoid",
  "printWidth": 80,
  "quoteProps": "as-needed",
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "none"
}
```
