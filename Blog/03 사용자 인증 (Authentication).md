#blog

# 웹사이트 로그인 기능 구현: 세션 vs 토큰 기반 인증

## 웹 인증의 필요성 및 발전 과정

웹 애플리케이션에서 인증은 사용자가 본인임을 확인하고, 허가된 권한을 부여하기 위한 필수적인 과정이다. 초기에는 사용자 이름(username)과 비밀번호(password) 기반의 인증 방식이 주로 사용되었다. 이러한 방식은 **지식 기반 인증(Knowledge-based Authentication)**으로 분류되며, 여전히 많은 웹사이트에서 사용되고 있다.

하지만 인증 방식은 점차적으로 발전하고, 로그인 유지 방식도 다양화되었다. 웹사이트에서는 세션 기반(Session-based) 방식과 상태 없는(Stateless) 방식으로 나뉘고, 각 방식은 서버의 데이터 처리 방식에 따라 달라진다.

## 세션 기반 인증 vs Stateless 인증

### 세션 기반 인증 (Session-based Authentication)

**서버에 상태 저장:** 서버는 사용자가 로그인할 때 세션 ID를 생성하여 저장한다. 사용자는 세션 ID를 포함한 요청을 보내고, 서버는 이를 검증하여 인증을 처리한다.

장점: 세션 데이터가 서버에 저장되므로, 토큰 탈취 방지 및 빠른 인증 처리가 가능하다.

단점: 서버의 부하가 증가하고, 세션 동기화가 필요하며, 확장성이 떨어질 수 있다.

### 상태 없는 인증 (Stateless Authentication)

**서버에 상태 저장하지 않음.** Stateless 인증은 **JWT(JSON Web Token)**와 같은 토큰을 사용하여 서버는 사용자 정보를 검증만 한다. 서버는 세션 상태를 저장하지 않으며, 클라이언트 쪽에서 토큰을 보관하고 인증 정보를 관리한다.

장점: 서버에 세션 정보를 저장할 필요가 없으므로 서버 부하가 적고 확장성이 좋다. 분산 서버 환경에서 유용하다

단점: 토큰 탈취 시 위험하며, 로그아웃 처리나 세션 무효화가 어렵다.

---
## 브라우저 스토리지 매커니즘

웹 애플리케이션에서 인증 정보를 저장하는 방법에는 여러 가지가 있다. 브라우저는 기본적으로 세 가지 스토리지 메커니즘을 제공한다:

1. 쿠키 (Cookies)

> 특징: 서버와 클라이언트 간에 데이터를 자동으로 전송하며, HttpOnly 속성으로 XSS 공격을 방지.

쿠키는 로컬 스토리지와 세션 스토리지와 다르게 같은 도메인으로 요청시 자동으로 요청에 포함되어 서버에 보낸다.

**주요 용도:** 세션 기반 인증 및 자동 로그인에 자주 사용.

보안: Secure와 SameSite 속성을 사용하면 CSRF를 방어.

2. 로컬 스토리지 (LocalStorage)

> 특징: 웹 브라우저에 데이터를 영구적으로 저장하며, 서버와의 자동 전송은 없다.

**주요 용도:** JWT와 같은 토큰 기반 인증에 사용.

보안: XSS 공격에 취약할 수 있어 민감한 데이터를 저장할 때 주의가 필요.

3. 세션 스토리지 (SessionStorage)

> 특징: 브라우저 탭에만 저장되며, 브라우저를 닫으면 데이터가 사라짐.

**주요 용도:** 단기 세션 유지와 관련된 정보 저장에 적합.

보안: 로컬 스토리지와 마찬가지로 XSS 공격에 취약.

---

### JWT (Json Web Token)

JWT는 클레임(claim)이라고 하는 정보를 JSON 형태로 안전하게 전송하기 위한 표준 형식이다.
JSON 형식의 데이터를 문자열로 인코딩한 토큰

#### JWT 구조

> JWT는 세 부분으로 구성되며, 각 부분은 점(.)으로 구분된다:

1. 헤더 (Header)
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
- alg: 서명 알고리즘 지정
- typ: 토큰 유형 지정

2. 페이로드 (Payload)
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516247022
}
```
- 실제 전달하려는 데이터
- 클레임(claim)이라 부르는 정보 단위로 구성

3. 서명 (Signature)
```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```
- 토큰의 진위여부를 확인하는 서명

#### JWT 특징

1. **자가 수용적(Self-contained)**
- 필요한 모든 정보를 토큰 자체에 포함
- 별도의 조회 없이 인증 가능

2. **무상태(Stateless)**
- 서버에 상태 저장 불필요
- 서버 확장성 향상

3. **보안**
- 서명으로 위변조 검증 가능
- 민감정보는 페이로드에 포함하지 말 것

### Session

세션은 서버 측에서 유저의 정보를 저장하고 관리하는 방법이다.

#### 세션 동작 방식

1. **세션 생성**
```javascript
// 서버 측 세션 생성 예시 (Express)
app.post('/login', (req, res) => {
  req.session.userId = user.id;
  req.session.save();
});
```

2. **세션 저장소**
- 메모리 (Redis, Memcached)
- 데이터베이스 (MongoDB, MySQL)

#### 세션 특징

1. **보안성**
- 중요 정보가 서버에만 저장됨
- 클라이언트는 세션 ID만 보유

2. **서버 자원**
- 각 세션마다 서버 메모리 사용
- 동시 접속자가 많을 경우 부하 발생

3. **확장성**
- 여러 서버간 세션 동기화 필요
- 세션 클러스터링 구현 필요

#### 세션 관리 예시

```javascript
// Redis를 이용한 세션 저장소 구현
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24시간
  }
}));
```

___

### 세션인증 (with 쿠키를 이용)

사용자가 로그인하면 서버에서 session을 생성하고 session ID로 사용자의 인증 상태를 관리한다.
서버에서 유저 정보를 관리하고 처리하는것은 세션 기반이라한다.

1. 사용자가 로그인 요청 (POST /login)

사용자가 아이디와 비밀번호를 입력하고 로그인 요청을 보냄.

2. 서버에서 사용자 인증

서버는 데이터베이스에서 사용자의 정보를 조회하고 비밀번호를 검증함.

검증 성공 시, 서버에서 세션 ID를 생성하고 이를 저장함.

3. 세션 ID를 클라이언트에 쿠키로 전달

서버는 Set-Cookie 헤더를 사용하여 세션 ID를 클라이언트(브라우저)로 전달함.

**예제 응답 헤더:**

```http



HTTP/1.1 200 OK

Set-Cookie: sessionId=abcd1234; HttpOnly; Secure; SameSite=Strict



```

4. 클라이언트가 요청을 보낼 때 세션 ID 자동 포함

이후 클라이언트(브라우저)는 서버에 요청을 보낼 때마다 자동으로 쿠키에 저장된 세션 ID를 포함하여 요청함.

**예제 요청 헤더:**

```http

GET /profile HTTP/1.1

Host: example.com

Cookie: sessionId=abcd1234

```

5. 서버에서 세션 ID를 확인하여 인증 유지

- 서버는 요청을 받을 때, 세션 ID를 확인하고 저장된 세션 데이터와 대조하여 인증 여부를 판단.

- 세션이 유효하면 요청을 처리하고, 만료되었거나 유효하지 않으면 로그인 다시 요청.

6. 사용자가 로그아웃하면 세션 삭제

- 사용자가 로그아웃하면 서버에서 세션을 제거하고, 쿠키도 만료시킴.

### Stateless 방식: JWT 토큰 인증

JWT(JSON Web Token)를 사용한 인증은 서버에 상태를 저장하지 않는 방식으로, 토큰 자체에 필요한 정보를 담아 인증을 처리한다.

1. 사용자가 로그인 요청 (POST /login)

사용자가 아이디와 비밀번호를 입력하고 로그인 요청을 보냄.

2. 서버에서 사용자 인증 및 JWT 생성

- 서버는 데이터베이스에서 사용자 정보를 확인하고 인증
- 인증 성공 시, JWT 토큰을 생성 (헤더.페이로드.서명)

**예제 JWT 응답:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJpYXQiOjE1MTYyMzkwMjJ9.4Kj7EkXGwXyApXr..."
}
```

3. 클라이언트에서 토큰 저장

- 클라이언트는 받은 토큰을 로컬 스토리지나 쿠키에 저장
- 이후 요청 시 Authorization 헤더에 포함하여 전송

**예제 요청 헤더:**

```http
GET /profile HTTP/1.1
Host: example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. 서버에서 토큰 검증

- 서버는 요청의 JWT 토큰을 검증 (서명 확인)
- 토큰이 유효하면 요청을 처리하고, 유효하지 않으면 401 Unauthorized 응답

5. 토큰 만료 및 갱신

- JWT는 만료 시간(exp)이 있어 보안성 강화
- Refresh Token을 사용하여 만료된 액세스 토큰을 갱신 가능
