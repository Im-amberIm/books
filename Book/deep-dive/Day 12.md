#javascript

# 생성자 함수에 의한 객체 생성

> 생성자 함수 (Constructor)란 `new` 연산자와 함께 호출하여 객체 (instance)를 생성하는 함수. 생성자 함수에 의해 생성된 객체를 instance라 함.

### Built-in 생성자 함수

**JavaScript의 주요 내장 생성자 함수들:**

| 생성자   | 용도           |
| -------- | -------------- |
| Object   | 기본 객체 생성 |
| String   | 문자열 객체    |
| Number   | 숫자 객체      |
| Boolean  | 불리언 객체    |
| Function | 함수 객체      |
| Array    | 배열           |
| Date     | 날짜           |
| RegExp   | 정규표현식     |
| Promise  | 비동기 처리    |

```js
const surname = new String("Im");
const numbers = new Array(1, 2, 3);
const today = new Date();

console.log(surname); // String{"Im"}
console.log(numbers); // [1, 2, 3]
console.log(today); // 현재 날짜/시간
```

### 생성자 함수 특징

- PascalCase 명명 규칙 사용
- new 연산자 필수 (없으면 일반 함수로 동작)
- 객체 생성 템플릿으로 활용
- 생성자 함수의 내부의 `this`는 생성자 함수가 (미래에) 생성할 인스턴스와 바인딩됨.

<br>

### 인스턴스 생성 과정

자바스크립트 엔진은 암묵적으로 인스턴스를 생성하고 반환한다.<br>
생성자 함수가 인스턴스를 생성하는것은 필수이고, 생성된 인스턴스를 초기화 하는것은 옵션이다.

1. 인스턴스 생성과 this 바인딩
   - 런타임 이전에 암묵적으로 빈객체 생성 `{} (인스턴스)`
   - 생성된 빈 객체는 this에 바인딩 됨
2. 인스턴스 초기화
   - 생성자 함수 코드 실행
   - this에 바인딩된 인스터스 초기화
3. 인스턴스 반환
   - 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환

```js
function Person(name, age) {
  // 1. 암묵적으로 빈 객체 생성 -> this에 바인딩됨
  // this = {};

  // 2. this를 통한 프로퍼티 초기화
  this.name = name;
  this.age = age;

  // 3. 완성된 인스턴스가 바인딩된 this 반환 (명시적 반환이 없을 경우)
  // return문은 생략함. (생략하는게 맞아~)

  //생략 안할떄 케이스 (what if)
  // 3-1. 빈객체 리턴할때
  return {}; // 명시적으로 객체 반환시 this는 무시되고 객체를 반환

  // 3-2. 원시값 반환할때
  return 100; // 원시값 반환시 원시값은 무시되고 this 반환.
}
const person1 = new Person("Alice", 25);

// return문 생략할때의 값
console.log(person1); // Person { name: 'Alice', age: 25 }
```

### 내부 메서드 `[[Call]]`과 `[[Construct]]`

함수는 일반객체이기 때문에 객체가 포함한 내부슬롯과 내부 매서드 포함 함수객체를 위한 <br>

- **내부 슬롯:** `[[Environment]]`, `[[FormalParameters]]`
- **내부 메서드:** `[[Call]]`, `[[Construct]]`

를 포함한다.

**일반함수로 호출시 내부 메서드로 Call이 호출되고 생성자 함수로 호출시 Constructor가 호출된다.**

**함수 객체 종류**

1. Callable -> `[[Call]]`을 갖는 함수 객체
2. Constructor -> `[[Construct]]`를 갖는 함수 객체
3. non-constructor ->`[[Construct]]`를 가지지 않는 함수 객체

_모든 함수객체는 callable이면서 construct이거나 callable이면서 non-construct이다._
<br>

### constructor vs non-constructor

> 함수 생성시 정의 방식으로 구분됨

- `constructor`: 함수 선언문, 함수 표현식, 클래스
- `non-constructor`: 메서드 (ES6 메서드 축약 표현), 화살표 함수

<br>

### new 연산자

new 연산자와 호출하면 call이 아닌 construct이 호출된다. (생성자 함수로 호출하려면 new연산자를 써야하는 이유) <br>
함수가 객체를 반환하지 않으면 빈객체를 반환한다. (객체를 반환하는 함수에 생성자 함수 쓰는게 유용)

<br>

### 생성자 함수로 호출되게 하는법

Pascal case 컨밴션으로 생성자 함수인것을 명시하더라도 호출할때 new 연산자를 누락할수 있다. 그 세이프 가드로서 활용할 수 있는 방법.

#### new.target

> 메타 프로퍼티로 함수내 지역변수로 사용되어 생산자 함수로 호출시 `new.target`은 함수 자신을 가리키고
> 일반 함수로 호출시 `undefined`이다.

`new.target`을 활용해 생성자 함수가 `new` 키워드 없이 호출될 때, 자동으로 `new`를 붙여 다시 호출하도록 만듬.

```js
function Person(name, age) {
  if (!new.target) {
    return new Person(name, age); // new 없이 호출되면 new 붙여서 다시 호출
  }
  this.name = name;
  this.age = age;
}
const person1 = new Person("Alice", 25);
console.log(person1); // Person { name: 'Alice', age: 25 }

const person2 = Person("Bob", 30); // new 없이 호출 -> 자동으로 new Person 호출
console.log(person2); // Person { name: 'Bob', age: 30 }
```

<br>

#### instanceof를 활용한 스코프 세이프 생성자 패턴

> IE 등 new.target을 지원하지 않는 환경에서 사용하는 패턴

```js
function Person(name, age) {
  if (!(this instanceof Person)) {
    // new 없이 호출되면 new 붙여서 다시 호출
    return new Person(name, age);
  }
  this.name = name;
  this.age = age;
}

const person1 = new Person("Alice", 25);
console.log(person1); // Person { name: 'Alice', age: 25 }

const person2 = Person("Bob", 30); // new 없이 호출 -> 자동으로 new Person 호출
console.log(person2); // Person { name: 'Bob', age: 30 }
```

<br>

### 빌트인 생성자 함수

> 빌트인 생성자 함수는 new연산자와 함께 호출되었는지 확인 후 값 반환

- `Object`, `Function`은 `new`를 생략해도 생성자 함수로 호출
- `String`, `Number`, `Boolean`은 `new`를 생략하면 문자열, 숫자, 불리언 값으로 반환 (=데이터 타입 변환)
