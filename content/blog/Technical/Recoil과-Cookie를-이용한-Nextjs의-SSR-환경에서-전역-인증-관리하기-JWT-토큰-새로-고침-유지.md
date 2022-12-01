---
title: 'Recoil과 Cookie를 이용한 Next.js의 SSR 환경에서 전역 인증 관리하기 (JWT 토큰, 새로 고침 유지)'
date: 2022-10-14 19:56:02
category: 'Technical'
tags: ['쿠키', '인증', 'SSR', 'Recoil', 'NextJS', 'JWT토큰', 'getInitialProps']
draft: false
---

## 들어가면서

이전 Art.zip 회고에서 배포 사이트에서 쿠키를 읽을 수 없는 문제가 있었기 때문에 새로 고침을 하여 앱이 새로 구동될 때마다 로그인이 풀리는 버그가 존재하였다.

이 글에서는 어떻게 문제를 해결하였는지에 대하여 서술한다.

## 프로젝트에서 사용한 인증 방식

각 프로젝트마다 인증을 위하여 사용하는 방법과 유저의 상태를 저장하는 방법이 다를 것이기 때문에, Art.zip 프로젝트에서 사용한 인증 방식을 먼저 설명하겠다.

이 방식은 요청을 보낼 때, set-cookie 를 이용하여 쿠키 속에 담겨있는 토큰을 서버에서 관리하는 방식이 아니라, 토큰을 관리하기 위하여 localStaroge 를 이용하는 것과 비슷하게, cookie 에 토큰을 담아 관리하는데 이는 `Next.js`의 서버에서 pre-rendering 을 할 때, 인증 정보를 담기 위하여 cookie 에 토큰을 담아서 클라이언트 쪽에서 관리한다.

토큰 재발행의 경우, Access Token 을 디코드 하면 얻을 수 있는 userId 와 만료된 Access Token, 그리고 Refresh Token을 request body 에 담아 보내는 방식을 사용한다.

## TL;DR

- `pages/_app.tsx`에서 `getInitialProps` 를 이용하여 유저의 정보를 pre-fetching 한다.
- `getInitialProps` 나 `getServersideProps` 에서 쿠키를 이용하기 위해서는 `res.ctx.cookie` 를 이용한다.
- 위에서 받아온 정보를 `RecoilRoot`의 `initialState` 를 통하여 직접 초기화 해준다.
- 클라이언트에서 인증 상태를 유지할 때는 Recoil 의 `effect` 를 통하여 cookie 의 상태를 구독하고, 이 상태에 따라 전역 인증을 사용한다.
- 클라이언트에서 쿠키를 관리하기 위하여 `react-cookie` 라이브러리를 사용한다.

## 해결한 방법

### 1\. 클라이언트에서의 토큰 관리

`react-cookie` 라이브러리를 통하여 쿠키를 관리한다.

#### 1-1. Token의 getter, setter, remove

```typescript
// import 생략
const cookies = new Cookies()

function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 14)

  cookies.set(key, token, {
    path: '/',
    expires: key === 'REFRESH_TOKEN' ? expires : undefined,
  })
}

function removeToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') {
  cookies.remove(key, { path: '/' })
}

function removeTokenAll() {
  removeToken(ACCESS_TOKEN)
  removeToken(REFRESH_TOKEN)
}

function getAccessToken() {
  return cookies.get(ACCESS_TOKEN)
}

function getRefreshToken() {
  return cookies.get(REFRESH_TOKEN)
}
```

우리 프로젝트에서 로그인은 로그인 페이지에서 따로 로그인하고, 로그아웃은 헤더에서 (어느 페이지에서든) 가능하게 만들었기 때문에 토큰에 대한cookie.set의 path 옵션을 '\\'로 한다. 이는 토큰을 사용하는 cookie의 set, remove 에서 공통적으로 사용하므로 따로 `utils`에 `TokenManager.ts`를 만들어서 토큰을 관리하는 메서드를 만들었다.

또한 token을 가져오려면 `react-cookie` 라이브러리에서 `Cookies` 객체를 사용하는 쪽에서 일일이 만들어야했기 때문에, `Token`에 대한 `getter`와 `setter`도 구현하였다.

#### 1-2. `authorizeFetch`

```typescript
async function authorizeFetch({
  accessToken,
  refreshToken,
  apiURL,
}: {
  accessToken: string
  refreshToken: string
  apiURL: string
}) {
  const headers = {
    ...(accessToken ? { accessToken: accessToken } : {}),
  }

  try {
    const { data } = await axios.get(apiURL, {
      headers,
    })
    // 유효한 토큰인 경우
    return { isAuth: true, data: data.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      // 인증되지 않은 경우
      if (e.response && e.response.status === 401) {
        const { userId } = parseJwt(accessToken as string)

        try {
          const { data: newTokenData } = await userAPI.reissueToken({
            userId: parseInt(userId),
            accessToken,
            refreshToken,
          })

          const newAccessToken = newTokenData.data.accessToken
          setToken('ACCESS_TOKEN', newAccessToken)

          const { data: newAuthData } = await axios.get(apiURL, {
            headers: {
              accessToken: newAccessToken,
            },
          })

          return { isAuth: true, data: newAuthData.data }
        } catch (e) {
          const { data } = await axios.get(apiURL)
          return { isAuth: false, data: data.data }
        }
      }
    }
    const { data } = await axios.get(apiURL)
    return { isAuth: false, data: data.data }
  }
}
```

getInitialProps 나 getServerSideProps 등에서 인증 로직을 구현하기 위한 메서드이다.

메서드에서는 엑세스 토큰을 확인하여 인증된 값이 올바르게 들어왔다면 그 값을 그대로 리턴하고,

올바르지 않고, 401 unauthorized 에러가 나오면 토큰을 기반으로 다시 재인증하고,

그럼에도 에러가 난다면 인증되지 않은 값을 리턴한다.

## 2\. Recoil을 통한 관리

### 1\. `effect` 를 이용하여 쿠키의 값을 구독하기

Recoil 의 `effect` 는 부수 효과를 관리한다. (react의 `useEffect` 와 비슷하다.)

유저의 상태를 불러오기 위해서는 "쿠키"의 값이 필요하기 때문에 쿠키의 값을 구독하도록 하고,

이 값이 바뀔 때마다 `effect` 내부의 `set` 함수가 실행되도록 한다.

```typescript
import { atom } from 'recoil';
import { SIGNOUT_USER_STATE } from '../constants';
import { authorizeFetch, removeTokenAll, getAccessToken, getRefreshToken } from 'utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const cookieEffect =
  (accessTokenKey: 'ACCESS_TOKEN', refreshTokenKey: 'REFRESH_TOKEN') =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ setSelf, onSet }: any) => {
    onSet(async () => {
      try {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (!accessToken || !refreshToken) {
          removeTokenAll();
          return SIGNOUT_USER_STATE;
        }

        const { data } = await authorizeFetch({
          accessToken,
          refreshToken,
          apiURL: // 자기 자신의 정보를 불러오는 api,
        });

        const { userId, email, nickname, profileImage } = data;
        return { userId, email, nickname, profileImage, isLoggedIn: true };
      } catch (error: unknown) {
        removeTokenAll();
        console.error(error);
        return SIGNOUT_USER_STATE;
      }
    });
  };

const userAtom = atom({
  key: `user/${new Date().getUTCMilliseconds() * Math.random()}`,
  effects: [cookieEffect(ACCESS_TOKEN, REFRESH_TOKEN)],
  default: SIGNOUT_USER_STATE,
});

export default userAtom;
```

### 2\. `RecoilRoot`, `_app.tsx`

```typescript
// import 생략

function ArtZip({ Component, pageProps, userData }: AppProps | any) {
  // 일부 내용 생략되어 있음.

  // Recoil의 initialState 초기화
  const initialState = ({ set }: MutableSnapshot) => {
    const { userId, email, nickname, profileImage } = userData;
    const isLoggedIn = userId !== null;
    set(userAtom, { userId, email, nickname, profileImage, isLoggedIn });
  };

  return (
    <RecoilRoot initializeState={initialState}>
    <!-- 안의 내용은 일부 생략 -->
       <Layout>
          <Component {...pageProps} />
        </Layout>
    </RecoilRoot>
  );
}

ArtZip.getInitialProps = async (appContext: AppContext) => {
  // 서버 사이드 쿠키 받아오기
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const allCookies = cookies(ctx);

  const accessToken = allCookies[ACCESS_TOKEN];
  const refreshToken = allCookies[REFRESH_TOKEN];

  const removeAllCookies = () => {
  // 서버 사이드 쿠키 삭제
    ctx.res &&
      ctx.res.setHeader('Set-Cookie', [
        `ACCESS_TOKEN=deleted; Max-Age=0`,
        `REFRESH_TOKEN=deleted; Max-Age=0`,
      ]);
  // 클라이언트 사이드 쿠키 삭제
    removeTokenAll();
  };

  let userState = SIGNOUT_USER_STATE;
  // 서버 사이드 쿠키가 남아있을 경우, 해당 쿠키로 인증 시도
  if (refreshToken && accessToken) {
    try {
      const { isAuth, data } = await authorizeFetch({
        accessToken,
        refreshToken,
        apiURL: // 내 정보 불러오는 api URL,
      });

      userState = isAuth ? { ...data, isLoggedIn: true } : SIGNOUT_USER_STATE;

      if (!isAuth) {
        removeAllCookies();
      }
    } catch (e) {
      removeAllCookies();
      userState = SIGNOUT_USER_STATE;
    }
  }

  if (userState.userId === null) {
    removeAllCookies();
  }

  return { ...appProps, userData: userState };
};

export default ArtZip;
```

새로고침을 하였을 때, 유저의 로그인 정보가 유지되게 하기 위하여 앱의 진입점인 `__app.tsx`에서 쿠키로 가지고 있는 토큰 값을 통하여 전역 상태를 초기화한다. `Next.js`의 경우, 클라이언트에서 쿠키를 `set` 하고 나면 자동으로 `appContext` 의 `ctx` 에 쿠키 값이 들어가는 것 같다. (앞으로는 이 쿠키를 서버 사이드 쿠키라고 칭하겠다.) 이 서버 사이드 쿠키에 저장된 리프레시 토큰과 엑세스 토큰을 활용하여 위에서 구현한 `authorizeFetch` 로 인증된 데이터 값을 가지고 온다.

`getInitiaProps`를 통하여, `Next.js`의 `prefetching` 을 이용하여 내 정보를 받아온 후, 받아온 값을 `RecoilRoot`의 `initialState`에 직접 초기화 해준다.

여기에서 처음에는 recoil의 `default` 를 이용해보려고 했었으나, `default` 보다 `__app.tsx` 를 만들어내는 로직이 먼저 실행되어 서버와 클라이언트의 상태가 일치하지 않게 되어 Hydration 에러가 발생하거나 컴포넌트 트리가 생성되지 않는 오류가 있었다. 따라서 제일 먼저 실행되는 `__app.tsx` 에서 Recoil을 초기화하는 로직을 넣어준다.

이 때, `getInitiaProps` 함수를 실행시켜 반환된 값을 얻기 위하여 (쿠키 값을 얻어오기 위하여) Custom App을 사용하였다. 관련 내용은 다음 링크를 참고하길 바란다.

> [Advanced Features: Custom \`App\` \| Next.js](https://nextjs.org/docs/advanced-features/custom-app)

## 회고

클라이언트에서 쿠키를 직접 조작하고 관리해야하기 때문에 엑세스 토큰과 리프레시 토큰 모두 클라이언트에서 가지고 있어야 하여서, 따로 보안 설정을 할 수 없다는 점이 아쉬웠다.게다가 클라이언트에서 토큰을 관리해야 하기 때문에 앱이 구동될 때마다 자기 자신의 정보를 불러오는 메서드를 호출하고, 토큰의 유효기간을 설정해서 유효기간 이후로 재발급 하는 과정을 구현해줘야하는 등의 번거로움이 있었다.

본질적으로 인증 방식을 Vercel 에서 지원하는 것 처럼 자동으로 리프레시 토큰을 붙여서 인증하면 훨씬 깔끔할 것 같지만, 클라이언트에서 토큰을 관리하는 방법에 대해서 깊게 공부해볼 수 있었던 기회였다.

> [서버 사이드 렌더링(\`getServerSideProps\`) 환경에서 인증 로직 사용하기 · Discussion #313](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions/313)

> [모든 페이지에 대해서 쿠키를 조작할 때 · Discussion #309 ](https://github.com/prgrms-web-devcourse/Team-BackFro-ArtZip-FE/discussions/309)

## 참고 자료

> [Atom Effects \| Recoil](https://recoiljs.org/ko/docs/guides/atom-effects/)

> [Recoil with Storage (feat. effects) - 오픈소스컨설팅 테크블로그](https://tech.osci.kr/2022/07/05/recoil-react-js-state-management/)

> [<RecoilRoot> \| Recoil](https://recoiljs.org/docs/api-reference/core/RecoilRoot/)

> [[react, next.js] SSR환경에서 access_token, refresh_tokne 관리하기(cookie이용) | 티스토리, lemontia](https://lemontia.tistory.com/1012)
