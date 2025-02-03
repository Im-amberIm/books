#javascript

# 16장 프로퍼티 어트리뷰트 (property attribute)

> 프로퍼티를 생성할때 프로퍼티의 상태를 나타내는 내부 슬롯.

### 내부 슬롯(internal slot)과 내부 매서드 (internal method)

자바스크립트 엔진의 구현 알고리즘 설명하기 위해 ECMAScript사양에서 사용하는 의사 프로퍼티 (pseudo property)와 의사 매서드(pseudo method).
`[[...]]`

**Property attribute:** 프로퍼티 상태(property state)을 나타냄
**property state:** property의 value(프로퍼티 값), writable(쓰기 가능한지), enumerable(열거 가능한지), configurable(재정희 가능한지)을 말함.

### 디스크립터 객체 (descriptor object)

> 프로퍼티 어트리뷰트 정보를 가지고 있는 객체

**확인법**
`Object.getOwnPropertyDescriptor`매서드로 프로퍼티 어트리뷰트를 확인.
(descriptor object 반환)

```js
const person = {
  name: "Im",
  gender: "female",
};

console.log(Object.getOwnPropertyDescriptor(person, "gender"));

// {
//  value: 'female',
//  writable: true,
//  enumerable: true,
//  configurable: true
// }

//복수형 매소드는 객체 전체 프로퍼티의 디스크립터 객체 반환
console.log(Object.getOwnPropertyDescriptors(person));

// {
//  name: { value: 'Im', writable: true, enumerable: true, configurable: true },
//  gender: {
//    value: 'female',
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
// }
```

## 프로퍼티는 2가지로 구분할수 있다

> 데이터 프로퍼티 vs 접근자 프로퍼티

### 데이터 프로퍼티 (Data property)

> 키와 값으로 구성

**프로퍼티 어트리뷰트**

- `[[Value]]`: 프로퍼티의 값
- `[[Writable]]` : Boolean 값으로 프로퍼티의 값의 변경 여부를 나타냄<br>
  (_false면 value는 read-only_)
- `[[Enumerable]]`: Boolean 값으로 열거 가능 여부를 나타냄<br>
  (_false면 for...in문, Object.keys 매서드로 열거 불가능❌_)
- `[[Configurable]]`: Boolean 값으로 프로퍼티 재정의 또는 삭제 할 수 있는 여부를 나타냄<br>
  (_false면 프로퍼티 삭제와 어트리뷰타 값 변경 불가능 ❌_)
- _`writable:true`인 경우 value 변경과 writable: false로 변경 가능_

프로퍼티가 생성될떄 Value는 프로퍼티 값으로 초기화 되고 나머지는 기본값이 true.

**어트리뷰트로 편집을 제한한 오브젝트는 재할당이나 삭제를 시도해도 그냥 안되고 무시되며 오류가 발생하지는 않음**

<br>

### 접근자 프로퍼티 (Accessor property)

> 자체적 값은 없고, 데이터 프로퍼티의 값을 일거나 저장할때 호출되는 접근자 함수(Accessor function)로 구성된 프로퍼티

- `[[Get]]`: getter함수. 접근자 프로퍼티키로 접근하면 이 함수를 호출해 프로퍼티 값 반환.
- `[[Set]]`: setter함수. 접근자 프로퍼티키로 접근해 값을 할당하면 이 함수를 를 호출해 값을 저장 후 반환.
- `[[Enumerable]]`: 데이터 프로퍼티와 같음.
- `[[Configurable]]`: 데이터 프로퍼티와 같음.

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  // Getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // Setter
  set fullName(name) {
    const parts = name.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
};

console.log(person.fullName); // "John Doe" (getter 호출)

person.fullName = "Jane Smith"; // setter 호출

console.log(person.firstName); // "Jane"

console.log(person.lastName); // "Smith"
```

### 프로퍼티 정의

`Object.defineProperty` 매서드로 프로퍼티 어트리뷰트 정의 가능.

```js
// 해당객체 해당 프로퍼티 어트리뷰트만 정의
Object.defineProperty(obj, propertyName, descriptor);

// 해당객체 모든 프로퍼티 어트리뷰트 정의
Object.defineProperties(obj, descriptor);
```

- **`obj`**: 프로퍼티를 정의할 객체.
- **`propertyName`**: 정의하거나 수정할 프로퍼티 이름.
- **`descriptor`** : 디스크립터 객체

<br>

_`descriptor`를 누락시키면 누락된 프로퍼티 어트리뷰트 값이 undefined, false로 기본값으로 지정된다._

- value, get, set 기본값: `undefined`
- writable, enumerable, configurable :`false`

```js
const person = {
  firstName: "John",
};

// value만 정의하고 정의되지 않는 값들은 다 false, 만약 value도 정의 안했으면 'undefined'
Object.defineProperty(person, "lastName", { value: "Doe" });

const attribute = Object.getOwnPropertyDescriptor(person, "lastName");

console.log(attribute);
// {
// value: 'Doe',
// writable: false,
// enumerable: false,
// configurable: false
// }
```

<br>

### 객체 변경 방지

> mutable한 객체를 immutable하게 하는 방법

| 메서드                       | 설명                                                                                         | 추가 가능? | 삭제 가능? | 수정 가능? | 속성 변경 가능? | 확인 방법                  |
| :--------------------------- | :------------------------------------------------------------------------------------------- | :--------: | :--------: | :--------: | :-------------: | :------------------------- |
| `Object.preventExtensions()` | 객체에 **새로운 프로퍼티 추가를 금지**. 기존 프로퍼티는 삭제 및 수정 가능.                   |     ❌     |     ✅     |     ✅     |       ✅        | `Object.isExtensible(obj)` |
| `Object.seal()`              | 객체에 **새로운 프로퍼티 추가 및 삭제 금지**. 기존 프로퍼티는 수정 가능하나, 속성 변경 불가. |     ❌     |     ❌     |     ✅     |       ❌        | `Object.isSealed(obj)`     |
| `Object.freeze()`            | 객체에 **새로운 프로퍼티 추가, 삭제, 수정, 속성 변경 금지**.                                 |     ❌     |     ❌     |     ❌     |       ❌        | `Object.isFrozen(obj)`     |
