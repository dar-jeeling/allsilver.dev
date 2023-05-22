---
title: 'Vite 개발 환경에서 Proxy를 사용한 CORS 회피'
date: 2023-05-22 12:00:01
category: 'Technical'
tags: ['Vite', 'Proxy', 'CORS']
draft: false
---

## 들어가면서

로컬 개발 환경에서 API를 사용할 때, CORS(Cross-Origin Resource Sharing) 때문에 API 사용이 되지 않는 경우가 있다. 이 글에서는 Vite 개발 환경에서 Proxy를 사용하여 이러한 CORS 제약을 어떻게 효과적으로 회피하는지 알아보도록 하겠다. 이를 통해, 우리는 서버와 클라이언트가 같은 도메인에서 작동하지 않아도 개발을 원활하게 진행할 방법을 배울 수 있게 될 것이다. 특히나 과제 테스트처럼, 백엔드에게 해당 정책에 대한 제어 요청이 불가능할 때 유용하게 사용할 수 있을 것이다.

## vite의 server.proxy

vite의 `server.proxy`는 개발 환경 (`localhost`)에서 사용자 정의 프록시를 지정한다.

## 설정 방법

아래의 내용은 기본적으로 Vite 공식 문서의 [Server Options](https://vitejs.dev/config/server-options.html)를 따른다.
CORS를 회피하기 위해서 우리가 해야 할 일은 **브라우저의 요청 도메인과 서버의 요청 도메인을 일치시키는 것**이다. Vite의 `server.proxy`를 사용하면 **브라우저의 요청 (`localhost`)를 우리가 설정한 프록시 서버로 먼저 보내고, 프록시 서버가 실제 대상 서버에 요청을 전달**하게 된다. 이 과정에서 프록시 서버는 동일한 도메인에서 요청이 이루어진 것 처럼 보이도록 요청 도메인을 변경하게 되고 이를 통해 CORS를 우회할 수 있다.

이 예시에서는 `localhost`에서 CORS 제약이 걸린 `https://api.allsilver.com/`으로 GET 요청을 보낸다고 가정해보자.

프록시를 사용하기 위하여 `vite.config.ts`의 `defineConfig` 객체의 `server` 옵션을 활용하여 개발 서버에 대한 설정을 작성한다. 이 글에서는 프록시 설정을 작성하므로 `server`의 `proxy` 옵션에 대한 내용을 작성할 것이다.

설정 예제와 그에 대한 설명은 아래 코드와 코드 주석으로 작성하였다.

### 설정 : vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({})],
  server: {
    proxy: {
      // /api 라는 문자열이 target 에 지정한 문자열 https://api.allsilver.com/ 로 변환되어 사용된다.
      // 예를 들어 요청 도메인이 http://localhost:5173/api/hello 라면 프록시에 의하여
      // https://api.allsilver.com/hello로 요청이 되는 것이다.
      '/api': {
        // 프록시가 적용될 요청 경로의 시작 부분. 클라이언트가 보낸 요청의 URL이 api로 시작되면 이 설정이 적용된다.
        target: 'https://api.allsilver.com/', // 사용할 요청 도메인을 설정한다.
        changeOrigin: true, // HTTP 요청 헤더의 Host 값을 서버의 호스트와 일치하도록 변경한다. 이를 통해 클라이언트의 요청을 target에 설정된 도메인에서 온 것 처럼 변경할 수 있다.
        rewrite: path => path.replace(/^\/api/, ''), // 프록시 요청의 경로를 재작성하는 함수를 설정한다.
      },
    },
  },
})
```

따라서, 위의 설정을 사용한다면 예를 들어 `http://localhost:5173/api/hello` 라는 URL로 요청을 보낼 때 다음과 같은 과정이 진행된다.

1. 클라이언트의 요청 URL이 `/api`로 시작되므로 해당 프록시 설정이 적용된다.
2. 프록시는 `rewrite` 함수를 통해 클라이언트의 요청 URL에서 `/api` 부분을 삭제하고 `/hello` 로 변경한다.
3. 프록시는 `changeOption` 에 의하여 HTTP 요청 헤더의 Host 값을 `https://api.allsilver.com` 으로 변경한다
4. 프록시는 최종적으로 이 요청을 `https://api.allsilver.com/hello` 라는 URL로 `target` 서버에 전달한다.

그림으로 나타내면 다음과 같다.

<img src="https://i.imgur.com/JYhh8VV.png" alt="위 과정에 대한 도식" />

### 사용 예시

```typescript
export const request = async (options?: RequestInit) => {
  try {
    // /api 부분이 요청 도메인인 https://api.allsilver.com/ 로 치환되므로
    // CORS를 회피할 수 있다.
    const res = await fetch('/api/hello', {
      ...options,
      headers: {
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`API Call Fail: ${res}`)
    }
    return await res.json()
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      alert('An unexpected error occurred')
    }
  }
}
```

## 마무리

Proxy를 사용하여 CORS를 회피해보았다. vite의 server 옵션의 경우, 이 외에도 https 옵션을 사용하여 vite 개발환경을 https 로 사용하여 개발환경에서 https 때문에 문제가 생기는 부분(예: Chrome의 set-cookie 관련 정책)을 효과적으로 처리할 수 있으며, 다양한 네트워크 관련 문제를 프론트엔드에서 처리할 수 있다.

## Refernce

- [Server Options - Vite](https://vitejs.dev/config/server-options.html)

## 함께 보면 좋은 글

- [[HTTP 완벽 가이드] 06. 프락시](/독서/HTTP_6/)
