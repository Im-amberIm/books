#javascript

# 10장 객체 리터럴

> 이 장의 제목인 객체 리터럴은 객체를 생성하기 위한 표기법이다.

### 객체를 생성할 수 있는 방법들

- 객체 리터럴
- Object
- 생성자 함수
- 생성자 함수
- Object.create 매서드
- 클래스 (ES6);

**객체 리터럴 문법**

**`{}`를 이용해 변수에 할당하여 객체 생성**

```js
let person = {
  name: "Im",
  age: 20,
};
```

<br>

## 객체란?

다양한 타입의 값을 하나로 구성한 복한적인 자료 구조.
원시값 = immutable value
객체값 = mutable value

> 객체는 프로퍼티의 집합으로 프로퍼티는 `key`와 `value`로 구성 되어 있다.

```js
//객체 리터럴로 객체를 생성했을 때

let person = {
	name: "Im",
	age: 20
	"phone-number": "010-1234-1234"
}

```

`person` = object > `name: "Im"` = property > `name` = key >`"Im"` = value

- key: 문자열과 실볼값 (빈문자 포함) 가능

  **식별자 네이밍 규칙을 따리지 않는 다면 `''`로 감싸야됨**

- property value: JS에서 사용 가능한 모든 값 가능

자바스크립트의 함수는 일급객체로 값으로 취급 되므로 property value에 들어갈수 있다.
이때 일반 함수와 구분하기 위해 프로퍼티 값이되는 함수를 method로 지칭한다.

- Property : 객체의 상태를 나타내는 값 (data)
- Method: property(상태 데이터)를 참조 하고 조작할 수 있는 동작 (behaviour)

```js
let person = {
  name: "Im",

  //method (es6이후에는 일반 함수임)
  greeting: function () {
    return console.log(`my name is ${this.name}.`);
  },
};

person.greeting(); // my name is Im.
```

**ES6 이후에서는 아래처럼 매서드 축약 표현으로 정의된 함수만 method라 지칭한다.**

```js
let person = {
  name: "Im",

  // method (es6 이후)
  greeting() {
    return console.log(`my name is ${this.name}.`);
  },
};

person.greeting(); // my name is Im.
```

ES6 매서드는 non-constructor로 인스턴스를 생성하지 못해 생성자 함수를 호출 할 수 없다.

#### 프로퍼티 키 동적 생성 방법

```js
let obj = {};
let key = "hello";

obj[key] = "world";

console.log(obj); // {hello: "world}
```

_없는 키면 새로운 프로퍼티가 생성되고 이미 존재하는 키면 프로퍼티 값이 갱신됨_

#### 프로퍼티 삭제

```js
delete person.age; // 없는 프로퍼티 삭제해도 에러 없음 무시됨
delete person.name; // 있는 프로퍼티면 삭제됨
```

#### 프로퍼티 접근법

dot notation : `객체.프로퍼티`
bracket notation:`객체.['프로퍼티']`

```js
let person = {
  name: "Im",
  age:20

  };



console.log(person.name); // Im (dot notation)

console.log(person.['name']); // Im (bracket notation)
```

#### 축약 표현 (property shorthand)

`key`와 `value`가 같다면 축약 가능

```js
let a = 1,
  b = 2;

const num = { a, b };

console.log(num); // {a: 1, b: 2}
```
