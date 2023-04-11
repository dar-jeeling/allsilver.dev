---
title: '파일을 읽고, 파일을 line 별로 쪼개서 JSON 문자열의 배열로 변환하는 함수'
date: 2023-04-11 14:26:31
category: '괜찮은 생각'
tags: ['유용한 함수']
draft: false
---

## 코드

다음과 같이 작성한다.

```jsx
const fs = require('fs')

function readFileToJSONString(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }
    const lines = data.split('\n').map(line => JSON.stringify(line))
    callback(lines) // 실행 결과를 받은 후, 실행할 콜백 함수
  })
}

// 사용 예
const filePath = './src/components/base/Atom/Atom.stories.tsx' // 원하는 파일 경로
readFileToJSONString(filePath, jsonResult => {
  console.log(jsonResult)
})
```

## 실행 결과

[이 코드](https://github.com/dnd-side-project/dnd-8th-1-frontend/blob/develop/src/components/base/Atom/Atom.stories.tsx)에 실행했을 경우, 다음과 같은 결과를 확인할 수 있다.

```json
[
  `"import Atom from '.'"`,
  `"import { ComponentStory, ComponentMeta } from '@storybook/react'"`,
  "\"\"",
  "\"/**\"",
  "\" * 스토리북 확인을 위한 샘플 파일입니다.\"",
  "\" */\"",
  "\"export default {\"",
  "\"  component: Atom,\"",
  `"  title: 'Example/Atom',"`,
  "\"  parameters: {\"",
  `"    componentSubtitle: '공통 컴포넌트로 사용되는 컴포넌트',"`,
  "\"  },\"",
  "\"  /**\"",
  "\"   * 컴포넌트에 대해 Container가 필요할 경우 decorators에 추가하면 됩니다.\"",
  "\"   */\"",
  "\"  decorators: [\"",
  "\"    (Story) => (\"",
  "\"      <div className=\\\"bg-blue-200 h-10 w-10\\\">\"",
  "\"        <Story />\"",
  "\"      </div>\"",
  "\"    ),\"",
  "\"  ],\"",
  "\"} as ComponentMeta<typeof Atom>\"",
  "\"\"",
  "\"const Template: ComponentStory<typeof Atom> = () => <Atom />\"",
  "\"\"",
  "\"export const Default = Template.bind({})\"",
  "\"Default.args = {}\"",
  "\"\""
]
```
