#book #deepdive #javascript

# 18장 함수와 일급 객체

> 일급 객체 (first-class object)의 조건

- 무명의 리터럴로 생성 가능 (런타임에 생성 가능 / 동적 생성)
- 변수나 자료구조에 저장 가능
- 함수의 파라미터로 전달 가능
- 함수의 리턴값으로 사용 가능

따라서, 자바스크립트에서 함수는 `일급 객체`이다.

```js
// 1. 무명의 리터럴로 생성 가능 (익명 함수)
const greet = function () {
  return "Hello!";
};

console.log(greet()); // Hello!

// 2. 변수나 자료구조(객체, 배열)에 저장 가능
const obj = {
  sayHi: greet,
};

console.log(obj.sayHi); // [Function: greet]
console.log(obj.sayHi()); // Hello!

const arr = [greet, () => "Hi again!"];

console.log(arr[0]()); // Hello!
console.log(arr[1]()); // Hi again!

// 3. 함수의 파라미터로 전달 가능

function execute(fn) {
  return fn(); // 전달받은 함수 실행
}

console.log(execute(greet)); // Hello!

// 4. 함수의 반환값으로 사용 가능

function createGreeter() {
  return function () {
    return "Hello again!";
  };
}

const newGreet = createGreeter();

console.log(newGreet); // [Function (anonymous)]
console.log(newGreet()); // Hello again!
```

### 함수객체 고유 프로퍼티

- length: 함수의 파라미터의 갯수
- name: 함수 이름 (무명함수라면 함수를 가리키는 식별자)
- arguments : arguments 객체 {}
- caller: 함수 자신을 호출한 함수
- prototype

```js
function sum(x, y) {
  return x + y;
}

console.log(Object.getOwnPropertyDescriptors(sum));

/*
{
  length: { value: 2, writable: false, enumerable: false, configurable: true },
  name: {
    value: 'sum',
    writable: false,
    enumerable: false,
    configurable: true
  },
  arguments: {
    value: null,
    writable: false,
    enumerable: false,
    configurable: false
  },
  caller: {
    value: null,
    writable: false,
    enumerable: false,
    configurable: false
  },
  prototype: { value: {}, writable: true, enumerable: false, configurable: false }
}

*/
```

### 함수객체 내 arguments 프로퍼티

argument 프로퍼티의 값은 arguments 객체로 함수 호출시 전달된 인수의 정보를 가지고 있는 유사 배열 (array-like object) 객체이며 함수 내부에서 로컬 변수처럼 사용된다.

#### arguments 객체의 프로퍼티

- 인수 정보 (유사배열로 저장)
- length: 전달된 인수의 갯수
- callee: 호출되어 arguments 객체를 생성한 함수, 자기 자신을 가리킴
- Symbol(Symbol.iterator): arguments 객체를 순회 가능 자료구조인 이터러블(iterable)로 만들기 위한 프로퍼티.

```js
function sum(x, y) {
  console.log(Object.getOwnPropertyDescriptors(arguments));
  return x + y;
}

sum(1, 2);

/*
// arguments 객체의 프로퍼티
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  length: { value: 2, writable: true, enumerable: false, configurable: true },
  callee: {
    value: [Function: sum],
    writable: true,
    enumerable: false,
    configurable: true
  },
  [Symbol(Symbol.iterator)]: {
    value: [Function: values],
    writable: true,
    enumerable: false,
    configurable: true
  }
}
  

*/
```

전달된 argument가 초과되면 무시되지만 그래도 arguments 객체에 저장됨.<br>
(두개의 파라미터만 받기 때문에 함수 리턴 값은 여전히 3이지만 arguments 객체의 정보는 아래처럼 저장됨. ) <br>
_!유사배열이라 배열 매서드 사용은 안됨._

```js
// 인수가 초과 될때.
sum(1, 2, 3, 4); // 3

/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '2': { value: 3, writable: true, enumerable: true, configurable: true },
  '3': { value: 4, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false, configurable: true },
  callee: {
    value: [Function: sum],
    writable: true,
    enumerable: false,
    configurable: true
  },
  [Symbol(Symbol.iterator)]: {
    value: [Function: values],
    writable: true,
    enumerable: false,
    configurable: true
  }
}

*/
```

### 함수객체 내 프로퍼티

생성자 함수로 호출할 수 있는 함수 객체, constructor만 소유한 프로퍼티. <br>
함수가 생성자 함수로 호출될때 함수가 생성할 인스턴스의 프로토타입 객체를 가리킴.
