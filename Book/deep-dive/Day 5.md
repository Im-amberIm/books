#javascript

# 9장. 타입 변환과 단축 평가

## 타입변환

> - 명시적 타입 변환 (explicit coercion) / 타입 캐스팅 (type casting): 개발자 의도로 타입 변환
> - 암묵적 타입변환 (implicit coercion) / 타입 강제 변환(type coercion): JS 엔진이 코드 문맥에 따라 암묵으로 타입 변환.
> - _기존 원시값은 변환 x, 기존 변수값으로 다른 타입의 새로운 변수 생성할때_

### 문자열 타입으로 변환

#### Implicit coercion

`+` 피연산자가 2개 이상이고 하나 이상이 문자열일때 문자열 연결 연산자로 문자열 값 만든다.

`console.log(1 + "1" + 1 + 23);  //11123`

Symbol 타입 -> 타입 에러

객체타입

```js
//객체에 대한 단항연산자

console.log({} + ""); // [object Object]

console.log(Math + ""); // [object Math]

console.log([] + ""); // ""

console.log([2, 3] + ""); // 2,3

console.log(function () {} + ""); // function () {}

console.log(Array + ""); // function Array() { [native code] }
```

#### Explicit coercion

- String() : String 생성자 함수 사용 (빌트인 )
- (NaN).toString(): Object.prototype.toString 빌트인 매서드 사용
- `+` 문자열 연결 연산자 사용

<br>

---

<br>

### 숫자 타입으로 변환

#### Implicit coercion

- 산술 연산자: `-`, `*`, `/`, `+` 쓰일떄 암묵저으로 숫자 값을 반환하기 위해 숫자로 피연산자를 변환
  \*\*\*`+`는 피연산자(문자열) 하나일떄 숫자로 변환

```js
//숫자로 바뀔때

+"" + // 0;
  "0" + // 0
  true; // 1
```

- 비교연산자: `>` `<` 크기를 비교하기 위해 피연산자를 숫자로 변환

### Explicit coercion

- Number(): Number 생성자 함수 사용 (빌트인 )
- parseInt(), parseFloat(): 빌트인 함수 사용 (문자열만 숫자로 타입 변환)
- `+` 단항 산술 연산자 (다른타입 앞에 `+`)
- `*` 산술 연산자 (타입 `*` 1)

<br>

---

<br>

### 불리언 타입으로 변환

#### Implicit coercion

**JS 엔진은 불리언 타입이 아닌 값을 Truthy, Falsy 값으로 평가해 구분.**
Falsy값: `false`, `undefined`, `null`, `0` ,`-0`, `NaN`, `''`

#### Explicit coercion

- `Boolean()`: Boolean 생성자 함수 사용
- `!!`: ! 부정 논리 연산자를 두번 사용

<br>

---

<br>

## 단축 평가

#### **논리 연산자 사용**

논리합(||), 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자중 어느 한쪽으로 평가된다.

- `&&` 둘다 참이어야 참
  `left && right`
  left = true면 right, false면 left (둘다 참이여야 하기 때문에 왼쪽이 falsy값이면 평가 끝남)

- `||` 하나만 참이여도 참
  `left || right`
  left = true면 left, false면 right (하나만 참이여도 참이라 왼쪽이 true면 평가 끝남)

- 삼항 연산자 `? :`<br>
  `direction = '왼쪽' ? left : right `

  direction = '왼쪽' 이 참이면 left 거짓이면 right

#### **옵셔널 체이닝 연산자 사용 (Optional chaining)**

`?.`
좌항의 피연산자가 `null` 또는 `undefined`면 undefined 반환
그 외면 우항의 프로퍼티 참조를 계속함 (체이닝).

```js
const fruit = null;
const apple = fruit?.apple;

console.log(apple); // undefined
```

_`&&`는 좌항 null, undefined 포함 falsy값이면 `좌항`을 그대로 반환_

#### **null 병합 연산자 (nullish coalescing)**

`??`
좌항의 피연산자가 `null` 또는 `undefined`면 우항을 반환, 아니면 좌항을 반환.

_`||`는 좌항이 null, undefined 포함 falsy값이면 `우항`을 그대로 반환_
