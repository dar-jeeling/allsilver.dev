---
title: '[Danverse] 230206 프로젝트 일지'
date: 2023-02-06 21:39:20
tags: ['프로젝트_일지', 'Danverse']
category: 'Project'
draft: false
---

## Feat

- Avatar 컴포넌트를 구현하였다. 쌩으로 컴포넌트를 설계해나가고, Storybook을 통해 동작 테스트 가이드를 만드는건 너무나도 오랜만이라 온갖 오류를 만났다.

  - 빠른 개발을 위해, 디자인 시스템을 모두 설계하지는 말고 `Chakra-ui`를 적극적으로 사용하기로 하였다. (디자이너가 존재하는 프로젝트라서 이 부분은 조금 염려되기는 한다..) 하지만, `next.js` 에서 제공하는 이미지 최적화를 위하여 몇 가지 최적화 할 수 있는 컴포넌트는 직접 만드는게 좋을 것 같다.
  - 기본적으로 `next/image` 에 `fill` 속성을 넣은 후, wrapper를 통해 감싸는 형태로 컴포넌트를 만들었으나... 아바타 특성상 `wrapper`에 css props를 넣어야만 하였고, 이는 `fill` 속성만으로는 제대로 동작하지 않았다. 이를 위해서 `wrapper`에 `next.js` 공식문서가 안내하는 일부 css props를 반드시 사용해야만 한다. ~~사실 art.zip에서도 next/image를 사용하는 일부 부분에서 border-radius가 먹히지 않아서 그냥 날카로운 모서리를 사용하는 것으로 타협봤었는데 이런 뒷이야기가...~~

- 위에서 이어지는 이야기로.. `next/image`를 좀 더 커스텀이 자유로운 컴포넌트로 만들기 위하여 `StyledImage` 컴포넌트를 구현하였다. 이 컴포넌트는 기본적으로 `next.js` 공식문서가 `next/image`의 `fill` 속성과 함께 사용하는 css props를 가지고 있으며, 사용자가 `style` (혹은 `className`)을 주입하면 이에 맞춰서 잘 커스텀 된다.

  ```typescript
  const StyledImage = ({
    src,
    width,
    height,
    alt,
    className, // tailwind 스타일링을 위한 클래스 네임
    style, // inline css를 위한 style 객체
    placeholder = 'blur',
  }: StyledImageProps) => {
    return (
      <div className={`${className}`} style={{ ...style, width, height }}>
        <Image
          src={src}
          alt={alt}
          fill
          placeholder={placeholder}
          blurDataURL={placeholder && PLACEHOLDER_IMG}
        />
      </div>
    )
  }
  ```

## Issue

- **storybook 에서 `next.config` 설정하기**

  > 참고자료 : [Can't properly set up next-config storybook to get images from url | StackOverflow](https://stackoverflow.com/questions/67409774/cant-properly-set-up-next-config-storybook-to-get-images-from-url)

  storybook은 개발시에 사용하는 config와는 다소 독립적으로 움직이는 면이 있는 것 같다.
  `next/image`를 사용하면서, 외부 api를 통하여 이미지를 불러오기 위해서는 `next.config`의 images `hostname`을 설정해줘야 하는데, 이를 storybook에서 정상적으로 사용하려면 `.storybook`의 `preview.js` 역시 함께 설정해줘야 한다.

  ```javascript
  Object.defineProperty(nextImage, 'default', {
    configurable: true,
    value: props => <img {...props} />,
  })
  ```

- **storybook 에서 `path alias` 설정하기**

  > 참고 :[ How to resolve a path alias in Storybook | plusreturn](https://plusreturn.com/blog/how-to-resolve-a-path-alias-in-storybook/)

  위와 비슷하게 storybook에서 `tsconfig.json` 파일에 설정한 `path alias`를 설정하기 위해서는 `.storybook`의 `main.js`에도 `path alias`를 설정해주어야 한다. 🌧️ storybook이 이렇게 다른 설정 파일과 독립적으로 움직이는 것에 대해서 생각해보면, storybook도 그의 빌드와 실행을 위해서 자신만의 webpack 을 가지기 때문에, storybook으로 실행한 부분은 우리가 개발하는 부분과는 어느정도 독립적인 애플리케이션(애초에 여는 port도 다르니깐)이라고 볼 수 있을 것 같다.

  ```javascript
  // .storybook/main.js
  const path = require('path')

    module.exports = {
    // 윗 부분 생략
        webpackFinal: async (config) => {
            config.resolve.alias = {
            ...config.resolve.alias,
            '@components': path.resolve(**dirname, '../src/components'),
            '@constants': path.resolve(**dirname, '../src/constants'),
            // ...
            }
            return config
            },
    }
  ```

- [Module not found: Error: Can't resolve 'util' #18319](https://github.com/storybookjs/storybook/issues/18319)

  [제시된 답변 `yarn add -D util`로 해결하였다.](https://github.com/storybookjs/storybook/issues/18319#issuecomment-1173697483)

## Reference

> [Can't properly set up next-config storybook to get images from url | StackOverflow](https://stackoverflow.com/questions/67409774/cant-properly-set-up-next-config-storybook-to-get-images-from-url)

> [ How to resolve a path alias in Storybook | plusreturn](https://plusreturn.com/blog/how-to-resolve-a-path-alias-in-storybook/)
