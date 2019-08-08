---
title: "Lodash - 만능 주머니칼"
date: 2019-08-08 14:11:59
tags:
- nodejs
categories:
- nodejs
---

# Lodash

> A modern JavaScript utility library delivering modularity, performance & extras.

처음으로 Package Tour 에서 이야기하고자 하는 패키지는 역시 [Lodash](https://lodash.com/) 입니다.

저는 Node.js 를 처음 접하고 다른 사람들의 코드를 읽기 시작하고나서 `_.find(data, {id: 'MY_ID'})` 와 같은 코드를 자주 접하게 되었습니다.  
Node.js와 Javascript를 배우기 이전에 제가 주로 사용하던 Python 이나 JAVA 같은 언어에서는 `$` 나 `_` 같은 특수문자를 단독으로 변수명으로서 사용하는 경우를 본적이 없어서 매우 생소했던 기억이 있습니다.

Lodash 는 array, collection, object 들을 대량으로 조작하는데 필요한 함수들을 다양하게 제공합니다.

javascript 내장 array의 `map()`, `filter()`, `reduce()` 와 같은 함수들은 때로는 Lodash의 그것보다 빠르거나 느리거나 합니다. 하지만 훨씬 유연하고 작성하기 쉬운 함수들을 제공합니다.

## 나의 경험
저는 lodash를 매우 헤비하게 사용합니다. 사실상 거의 모든 기능을 수시로 사용하고 있습니다.  
그중에서도 제가 특히 즐겨 사용하는 기능은 `set`, `get`, `find` 와 같은 함수들 입니다.  
어떤것들은 javascript 에도 있는 기능들이지만 비교해보면 번거로운 작업들을 많이 줄여줍니다.

예를들어 nasted 한 object 깊숙이 있는 데이터를 꺼내오고 싶을때를 예로들면 이렇습니다.
``` javascript
const data = {
    family: [
        {name: 'carry', role: 'mother'},
        {name: 'david', role: 'father'},
        {name: 'tom', role: 'son'},
    ],
    stranger: [
        {name: 'kim', role: 'doctor'}
    ]
}
```

만약 두번째 가족구성원의 역할을 가져오고 싶다면 어떤식으로 접근해야 좋을까요?  
안전하게 데이터를 읽고 싶다면 이런식으로 작성 할 수 있습니다.

```javascript
let role = undefined;
if (data.hasOwnProperty('family')) {
    if (data.family.length >=2) {
        role = data.family[1].role;
    }
}
```

하지만 lodash를 사용하면 한줄이면 됩니다.
```javascript
let role = _.get(data, 'family.1.role');
```
만약 family 나 array 의 두번째 원소, 혹은 role 필드가 없다면 위 함수는 undefined 를 리턴하게 됩니다.  
가뜩이나 복잡한 작업을 해야하는데 단순한 json 데이터 접근까지 피곤하다면 금새 지쳐버릴지도 모르죠.  
이럴때 lodash 는 생산성에 큰 도움이 됩니다.

`set` 도 마찬가지로 nasted 한 경로를 주고 값을 집어넣으면 중간에 비는 array나 object 를 알아서 생성해줍니다.  
`find` 의 경우에는 굳이 함수로 작성하지 않고도 조건을 간단하게 줄 수 있습니다. 위의 예시에서 엄마에 해당하는 object를 찾고 싶다면
```javascript
const motherObject = _.find(data.family, {role: 'mother'});
```
이런식으로 처리 할 수 있습니다.

# How to Use

여러가지 방법으로 패키징되어 배포되고 있는 라이브러리지만, 서버작업을 주로하는 저는 npm 으로 설치해서 가장 많이 사용합니다.

```bash
npm install lodash --save
```

코드내에서는 저도 `_` 문자로 주로 할당해서 사용합니다.
```javascript
const _ = require('lodash');

const data = {name: 'noizbuster', age: 30, password: 'awesome_me'};
const public_data = _.pick(data, ['name', 'age']);
```

# Alternative, Similar Project

* [underscore](https://underscorejs.org/) - lodash 의 가장 큰 경쟁자입니다. 제공하는 기능도 비슷하고 사용법도, 심지어 이름조차 비슷합니다!