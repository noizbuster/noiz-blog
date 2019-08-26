---
title: "Express in Practice 002 - 프로젝트 만들기"
weight: 2
date: 2019-08-19T12:55:04.895Z
tags:
- nodejs
- express
categories:
- nodejs
---

# Express.js 프로젝트 만들기

## 사전준비

* Node.js - [Node.js 제대로 설치하기](/ko/series/nodejs/nodejs-basic/001-install-nodejs/) 참고
* Git

## git, npm 초기화

```bash
# 디렉토리를 하나 만들고
> mkdir lecture-express-in-practice
> cd lecture-express-in-practice

# git 초기화
> git init

# npm 초기화
> npm init

package name: (lecture-express-in-practice) 
version: (1.0.0) 0.0.0
description: 
entry point: (index.js) 
test command: 
git repository: https://github.com/noizbuster/lecture-express-in-practice.git
keywords: 
author: NoizBuster
license: (ISC) MIT
About to write to /home/noizbuster/project/noizbuster/lecture/lecture-express-in-practice/package.json:

{
  "name": "lecture-express-in-practice",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/noizbuster/lecture-express-in-practice.git"
  },
  "author": "NoizBuster",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/noizbuster/lecture-express-in-practice/issues"
  },
  "homepage": "https://github.com/noizbuster/lecture-express-in-practice#readme"
}

```

프로젝트를 만들 준비가 다 끝났다.

## Express.js 패키지 추가

Express.js 가 아직 알파라서 그냥 `npm install express` 로 설치하면 4.x 버전이 설치될것입니다. 그러니 현재 가장 높은 버전이 무엇인지 확인해 보아야 합니다.

```bash
> npm info express
express@4.17.1 | MIT | deps: 30 | versions: 263
Fast, unopinionated, minimalist web framework
http://expressjs.com/

keywords: express, framework, sinatra, web, rest, restful, router, app, api

...

dist-tags:
latest: 4.17.1       next: 5.0.0-alpha.7  

published 2 months ago by dougwilson <doug@somethingdoug.com>

```

`next` tag 로 버전 `5.0.0-alpha.7` 이 퍼블리시 되어있습니다. 이걸로 받아보도록 하죠.

```bash
> npm install express@next --save
npm notice created a lockfile as package-lock.json. You should commit this file.
+ express@5.0.0-alpha.7
added 53 packages from 38 contributors and audited 130 packages in 2.1s
found 0 vulnerabilities
```

그 다음 package.json 파일을 확인해보면 dependencies에 express 가 `"express": "^5.0.0-alpha.7"` 이렇게 추가된것을 볼 수 있습니다.

## Express 서버 만들기
Express 홈페이지에 `Getting started` 가이드에는 크게 두가지 방법을 제공합니다 Hello World 예제와 Express generator 를 사용하는방법입니다.  
그런데 Express generator 를 사용해서 프로젝트를 만들면 view render 같은 RESTful API 서버를 만드는데 직접적으로 관련이 없는 코드까지 생성을 해줍니다.  
어짜피 generator 를 이용해서 프로젝트를 만들어도 생성해주는 코드의 분량이 그렇게 많지 않으므로 그냥 Hello World 예제부터 시작해서 살을 붙여나가도록 하겠습니다.

일단 아래 모양처럼 디렉토리와 파일을 만들어줍니다.  
express server 는 src/server.js 에 작성될것이고 index.js 는 단순히 호출만 해서 실행시키는 역할을 해줄것입니다.
```bash
.
├── index.js
├── package.json
├── package-lock.json
└── src
    └── server.js
```

server.js 는 Express 홈페이지의 hello world 예제를 그대로 가져옵니다.  
한가지 추가된점은 module.exports 로 express app 을 지정 해 주는것입니다.  
이렇게 해두면 나중에 여러개의 app 을 켜거나 test code 를 작성할때 express app 에 접근하기가 쉬워집니다.

src 디렉토리 밑에 코드들을 배치하는것은 제 취향인데요, 나중에 src 디렉토리 내부를 트랜스파일링 하거나 한다면 이렇게 작성된 코드는 한개 디렉토리 밑에서 관리ㄴ는게  설정을 쉽게 하는데 도움이 됩니다. 

```javascript
# src/server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
```

```javascript
# index.js
const server = require('./src/server');

module.exports = server;
```

index 파일을 만들어서 사용하는것도 그냥 제 취향입니다.  
나중에 다른 서비스들이나 APM 같이 express 앱보다 먼저 초기화가 되어야 하는 경우에 코드가 섞여서 보이지 않게 해줍니다.  
필요하지 않다면 index.js 파일을 만들지 않고 start script가 바로 src/server.js 를 실행해도 됩니다.

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node index.js"
},
```
package.json 파일에 start 스크립트를 추가해줍시다.

`npm start` 로 실행한다음 브라우저에서 localhost:3000 으로 접속해보면
![](helloworld.png)
위와 같이 Hello World! 가 잘 출력됩니다.

## gitignore

커밋을 하기전에 status 를 확인해보면 다음과 같은 상태일것입니다.
``` bash
> git status

On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	index.js
	node_modules/
	package-lock.json
	package.json
	src/

nothing added to commit but untracked files present (use "git add" to track)
```

아직 커밋되지 않은 항목들이 무슨일을 하는지 살펴보면

__index.js__  
__src/__  
우리가 만든 파일과 디렉토리들 입니다.

__node_modules/__  
다운받은 dependency 들이 저장됩니다.

__package.json__  
npm 프로젝트에 관련된 정보가 저장됩니다.  
버전정보와 의존성 패키지를 비롯한 각종 메타데이터와 스크립트들, dev dependency 들이 사용하는 설정값등이 저장됩니다.

__package-lock.json__  
어떤 버전의 dependency 가 설치되어있는지 기록됩니다.
package.json 파일안에는 의존성 패키지들의 버전이 범위로 표현됩니다. 때문에 `npm install` 이 실행되는 시점에 따라 서로 다른 버전의 의존성이 설치되고, 이에 따라 서로 다른 사람들간의 미묘한 버전차이가 문제를 만드는 경우 알기 어렵다는 문제가 있었습니다.
때문에 __원하는 버전의 범위__ 는 package.json 에 저장되고 __실재로 설치된 버전__ 은 package-lock.json 에 저장되게 됩니다.  
따라서 다른 사람이 내 프로젝트를 받아서 `npm install` 을 했을때 내가 사용하고 있는 dependency 들과 정확하게 같은 버전을 사용하기를 바란다면 package-lock.json 파일도 커밋 해 주어야 합니다.

그럼 .gitignore 파일을 만들어 봅시다.

github 에 사람들이 널리 사용하는 Node.js 프로젝트용 .gitignore 파일들이 공유되고 있습니다.

* https://github.com/nodejs/node/blob/master/.gitignore
* https://github.com/github/gitignore/blob/master/Node.gitignore

이런파일들을 다운받아서 내 프로젝트에 넣거나 직접 내가 필요한만큼만 넣어서 사용 할 수도 있습니다.

``` bash
# Node.js
node_modules/

# IDE
.idea/
```
이런식으로 말이죠

이제 필터링된 파일들을 커밋하면 됩니다.

# Code
https://github.com/noizbuster/lecture-express-in-practice

# 다음순서
널리 사용하는 미들웨어들을 소개하고 추가해서 RESTful API 서버를 만들 준비를 할것입니다.

# References
* [express - hello world](https://expressjs.com/en/starter/hello-world.html)
