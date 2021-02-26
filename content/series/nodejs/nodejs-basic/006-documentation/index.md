---
title: "006. Node.js 프로젝트 문서 자동화"
date: 2019-10-07T06:20:49.641Z
tags:
- nodejs
- documentation
categories:
- nodejs
---

# Document Automation
소프트웨어에 대한 스펙문서와 API 문서들을 소프트웨어 버전에 맞추어 일관성 있게 관리하는것을 어렵고 번거로운 일입니다.

CMS 사용하거나 문서규약등을 만들어서 관리 하는 방법도 있지만 이 문서에서 제안하는 방법은 개발자가 사용 할 수 있는 좀 더 자동화된 문서관리 방식입니다.

## Building documents
이 방법에 핵심은 어떤 소프트웨어와 관련된 모든 문서를 코드베이스에서 관리하는것입니다.

만약 DTO나 DB Schema 같이 여러소프트웨어가 공통으로 사용하는 부분은 별도로 분리하여 문서를 생성 할 수 있도록 해야합니다.

## What to document?
* 소프트웨어의 컨셉, 설계, 혹은 이론적 설명
* 소프트웨어내부의 함수, 데이터 모델
* 외부에 노출되는 인터페이스
* 유저 or 개발자 가이드

# Materials

## Common Documentation

### Markdown
간단한 문법으로 사용 할 수 있는 마크업 언어입니다.  
많은 오픈소스 프로젝트들이 문서를 마크다운으로 작성하는일이 많습니다.

### PlantUML
UML 을 표현하기 위한 문법과 이것을 이미지로 랜더링해주는 소프트웨어 입니다.  
JAVA 로 만들어져있습니다.

### Mermaid
UML 과 다양한 다이어그램을 표현하기 위한 문법과 이것을 랜더링해주는 D3 를 이용하는 Javascript 라이브러리입니다.  
PlantUML 에 비해 Markdown 렌더러와 연동이 쉬운편이고 배우는것도 어렵지 않습니다.

### lite-server
간단한 파일 서버를 구동시켜주는 npm 패키지 입니다.  
파일을 watch 해서 브라우저를 새로고침 해주거나 N 스크린에서 스크롤링을 동기화 해주는 등의 기능이 포함되어있습니다. 매우 간단한 설정으로 사용 할 수 있습니다.

## API Documentation

### JSDoc
일반적으로 가장 많이 사용하는 JS Documentation 툴입니다.
코드상에 특정 양식으로 코멘트를 남기면 이것을 파싱, 빌드하여 html 이나 json 같은 문서로 출력해줍니다.
다양한 템플릿과 플러그인들이 제공되기 때문에 입맛대로 산출물을 가공하거나 확장 할 수 있습니다.
```javascript
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

### TSDoc
Typing 된 코드에 대해서는 별도로 JSDoc 처럼 주석을 남기지 않아도 문서를 생성 해 줍니다.  
자동생성하기 모호한 부분은 JSDoc 과 대동소이하게 주석을 남겨 문서를 생성 할 수 있습니다.  
프로젝트가 TypeScript 를 사용한다면 사용을 권합니다.

### ESDoc
JSDoc 과 매우 유사합니다. es class 등을 좀 더 깔끔하게 지원합니다.  
JSDoc 에 비해서 플러그인이나 템플릿이 다양하지 않아서 차라리 JSDoc 사용을 추천합니다.

## RESTful API

### Open API Spec (A.K.A Swagger)
RESTful API 를 정의하는 방법에 대한 Specification 입니다.  
이 양식대로 문서를 생성해주거나 파일을 (YAML, JSON 등)을 파싱하여 Documentation 해주는 여러가지 소프트웨어들이 있습니다.

### swagger-jsdoc
https://www.npmjs.com/package/swagger-jsdoc  
JSDoc 처럼 주석에 @swagger 태그로 OAI 포맷으로 작성된 스펙을 한군데 모아 단일 OAI 파일로 만들어주는 패키지 입니다.

# Integrate with your project

여기부터는 문서 생성 자동화를 하기위해 필요한 예시 작업들을 해 보겠습니다.

## JSDoc

##### Step 1. Add Dependencies
먼저, 의존성 패키지들을 추가해줍니다.
```bash
npm install jsdoc --save-dev
npm install tui-jsdoc-template --save-dev
```
`jsdoc` 은 개발중에 필요한 패키지 이므로 --save-dev 로 설치해줍니다.  
`tui-jsdoc-template` 은 만들어질 문서의 템플릿 입니다. 이것 이외에도 다양한 템플릿이 있으니 취향이나 요구조건에 따라 선택해서 사용하시면 됩니다.


##### Step 2. Setup

이렇게 디렉토리가 구성되어 있습니다.
```
.
├── docs
│   ├── bs-config.doc.json  // lite-server 설정
│   ├── dist                // 빌드된 페이지가 위치합니다. gitignore 에 등록이 필요합니다.
│   ├── jsdoc.config.js     // jsdoc configuration
│   └── typedef_extends.js  // (optional) plugin
├── guide                   // jsdoc 의 tutorial 기능으로 빌드되는 일반 문서들
│   ├── index.json
│   └── introduce.md
├── package.json
├── package-lock.json
├── README.md               // README
├── index.js
├── src/                    // 소스코드들이 저장되는 디렉토리
└── test/                   // 테스트코드들이 저장되는 디렉토리
```

###### Step 2-1. docs/jsdoc.config.js
jsdoc 설정파일을 아래와같이 작성합니다.
```javascript
// docs/jsdoc.config.js
module.exports = {
    tags: {
        allowUnknownTags: true
    },
    source: {
        include: ["./src", './guide', 'README.md'],
        includePattern: ".(js|ts)$",
        exclude: ["./docs"],
        excludePattern: "(node_modules/|docs)"
    },
    plugins: [
        "plugins/markdown",
        "docs/typedef_extends"  // optional, plugin for extending @typedef
    ],
    opts: {
        template: "./node_modules/tui-jsdoc-template",
        encoding: "utf8",
        destination: "./docs/dist",
        recurse: true,
        verbose: true,
        tutorials: './guide'
    },
    templates: {    // Template 에서 요구하는 필드들이나 설정값들을 입력합니다.
        tabNames: { // 어떤 Template 을 사용하냐에 따라 내용이 달라 질 수 있습니다.
            api: "API",
            tutorials: "Guide"
        },
        logo: {
            url: "",
            width: "0px",
            height: "0px",
            link: ""
        },
        name: "My Project Name",
        footerText: "MyCompany - product name version x.xx",
        cleverLinks: false,
        monospaceLinks: false,
        default: {
            outputSourceFiles: false
        }
    }
};
```

###### Step 2-2. docs/bs-config.doc.json
lite-server 설정입니다. 사용할 포트와 서빙할 디렉토리를 지정해줍니다.
```json
{
  "port": 40605,
  "server": {
    "baseDir": "./docs/dist"
  }
}
```

###### Step 2-3. package.json
package.json 파일에 도큐먼트 빌드를 위한 스크립트를 추가해줍니다.
```json
{
    ...
    "scripts":{
        ...
    "doc": "npm run doc:watch & npm run doc:serve",
    "doc:build": "jsdoc -c ./docs/jsdoc.config.js",
    "doc:watch": "nodemon --exec 'npm run doc:build' --ext '.' --watch guide/**/*.md -i ./docs",
    "doc:serve": "lite-server -c docs/bs-config.doc.json",
        ...
    }
    ...
}
```

* doc - 아래 스크립트들을 실행해서 파일이 변경 될때마다 지속적으로 빌드하고 서빙합니다.
* doc:build - jsdoc 으로 문서를 빌드합니다.
* doc:watch - 지속적으로 파일들을 감시해서 변경이 있다면 도큐먼트를 다시 빌드해줍니다.
* doc:serve - lite-server 를 이용해서 개발문서를 서빙합니다.

###### Step 2-4. (Optional) plugin for typedef using inherit other type

jsdoc 은 기본적으로 다른 타입을 상속하여 새로운 typedef 를 하는것을 지원하지 않습니다.  
관리상의 이유로, 이런 기능이 필요한 경우 커스텀 플러그인을 이용해서 이런 기능을 사용 할 수 있습니다.

https://github.com/OpenGeoscience/geojs/blob/master/jsdoc/plugins/typedef_augments.js
파일을 넣고 jsdoc config 에서 설정해주면 됩니다.

##### Step 3. 사용
```bash
npm run doc
```
`docs/bs-config.doc.json` 에서 지정한 포트에 도큐먼트가 서빙되기 시작합니다.

## RESTful API
RESTful API 를 문서화 하기위해 이 문서에서는 `swagger-jsdoc` 을 이용하는 방법을 사용합니다.  
별도 파일을 관리 할 필요없이 라우터 코드에 주석을 남기는것으로 관리가 되기 때문에 코드를 고칠때 함께 해당 내용을 수정하기 용이하다는 장점이 있습니다.

이 작업들은 앞에 JSDoc 설정을 모두 한 이후에 추가적으로 이루어 집니다.

##### Step 1. Add Dependencies
먼저, 의존성 패키지들을 추가해줍니다.
```bash
npm install swagger-jsdoc --save-dev
npm install swagger-ui-dist --save-dev
npm install fs-extra --save-dev # 만약 node 프로그램이 이게 필요하다면 --save 로 추가하세요
```
`swagger-jsdoc` 은 jsdoc 처럼 작성된 코멘트들을 모아서 단일 파일로 만들어주는 패키지입니다.
`swagger-ui-dist` 는 미리 빌드된 swagger-ui 앱입니다. 정적으로 서빙 될 수 있습니다.

##### Step 2. Setup
디렉토리 구조에 이런 파일들이 추가됩니다.

```
.
├── docs
│   ├── bs-config.api.json      // ** RESTful API 문서를 위한 lite-server 설정
│   ├── bs-config.doc.json
│   ├── dist
│   ├── dist-rest               // ** 빌드된 RESTful API 문서가 위치할 디렉토리
│   ├── buildRestDoc.js         // OAS 파일을 static webpage 로 빌드하기 위한 스크립트
│   ├── jsdoc.config.js
│   ├── jsdoc_OAS_Def.js        // OpenAPI 스펙파일의 헤더, 메타데이터가 기입됩니다.
│   └── typedef_extends.js
├── guide
│   ├── index.json
│   └── introduce.md
├── package.json
├── package-lock.json
├── README.md
├── index.js
├── src
└── test
```

###### Step 2-1. jsdoc_OAS_Def.js
각 파일에 흩어져있는 OpenAPI spec 들을 `swagger-jsdoc` 이 한데모아 단일파일로 만들어주기위한 설정입니다.  
스펙파일의 헤더와 메타데이터도 함께 지정됩니다.

```javascript
const packageInfo = require('../package.json');

module.exports = {
    info: {
        // API informations (required)
        title: packageInfo.name + ' API', // Title (required)
        version: packageInfo.version, // Version (required)
        description: packageInfo.description, // Description (optional)
    },
    openapi: '3.0.0',
    // host, // Host (optional)
    // basePath: '/', // Base path (optional)
    apis: ['./src/**/*.js ']
};
```

###### Step 2-2. buildRestDoc.js

swagger-ui 를 이용한 API 문서를 만듭니다.  
만약 다른 라이브러리나 툴을 이용해서 도큐먼트를 만들고 싶다면 이부분을 자유롭게 바꾸면 됩니다.

```javascript
const fs = require('fs-extra');
const SwaggerUI_Dist = require('swagger-ui-dist').getAbsoluteFSPath();

const SWAGGER_FILE = __dirname + '/rest_api_spec.yaml';
const DIST_DIR = __dirname + '/dist_rest';
const DIST_SPEC = DIST_DIR + '/rest_api_spec.yaml';
const DIST_INDEX = DIST_DIR + '/index.html';

fs.ensureDirSync(DIST_DIR);
fs.copySync(SWAGGER_FILE, DIST_SPEC);
fs.copySync(SwaggerUI_Dist, DIST_DIR);

let indexFile = fs.readFileSync(DIST_INDEX).toString();
indexFile = indexFile.replace(/url:.*".*"/, `url: "/rest_api_spec.yaml"`);
fs.writeFileSync(DIST_INDEX, indexFile);
```

###### Step 2-3. docs/bs-config.api.json
lite-server 설정입니다. 사용할 포트와 서빙할 디렉토리를 지정해줍니다.
```json
{
  "port": 44605,
  "server": {
    "baseDir": "./docs/dist_rest"
  }
}
```

###### Step 2-4. package.json
package.json 파일에 도큐먼트 빌드를 위한 스크립트를 추가해줍니다.
```json
{
    ...
    "scripts":{
        ...
    "api": "npm run api:watch & npm run api:serve",
    "api:build": "swagger-jsdoc -d ./docs/jsdoc_OAS_Def.js -o ./docs/rest_api_spec.yaml && node ./docs/buildRestDoc.js",
    "api:watch": "nodemon --exec 'npm run api:build' -i ./docs",
    "api:serve": "lite-server -c docs/bs-config.api.json"
        ...
    }
    ...
}
```

* api - 아래 스크립트들을 실행해서 파일이 변경 될때마다 지속적으로 빌드하고 서빙합니다.
* api:build - swagger-jsdoc 으로 OAS 파일을 컴파일하고, 정적 페이지를 빌드합니다.
* api:watch - 지속적으로 파일들을 감시해서 변경이 있다면 도큐먼트를 다시 빌드해줍니다.
* api:serve - lite-server 를 이용해서 개발문서를 서빙합니다.

###### Step 3. 사용
```bash
npm run api
```
`docs/bs-config.api.json` 에서 지정한 포트에 도큐먼트가 서빙되기 시작합니다.

# Writing Document

## API Document
[JSDoc](https://jsdoc.app) 을 참고하여 코드에 주석을 작성하면 됩니다.

```javascript
/**
 * @async
 * @param {string} [reason]
 * @return {Promise<Job>}
 */
jobSchema.methods.cancel = async function (reason) {
    this.active = false;
    this.msg = reason || 'this job was cancelled';
    l.i(`Job:${this.title}(${this.id}) has been cancelled: ${this.msg}`);
    return this.save();
};
```

typedef_extends 플러그인을 설정해두면 아래처럼 typedef 를 할때 상속을 사용 할 수 있습니다.
```javascript
/**
 * @typedef {object} Record
 * @property {string} id    - ObjectId
 */

/**
 * BaseSchema for all resource
 * @typedef {object} BaseSchema
 * @extends Record
 * @property {string} name          - name for human
 * @property {string} description   - detailed text information of this item
 * @property {object} parameters
 */

/**
 * @typedef {object} MyResource
 * @extends BaseSchema
 * @property {function}             toJSON
 * @property {string}               type
 * @property {object}              [metadata]
 * @property {Fleet_Gridmap}       [metadata.gridmap]
 * @property {Fleet_Monochrome}    [metadata.monochrome]
 */
```

## RESTful API
swagger-jsdoc 세팅이 되면 이와 같이 원하드 위치에 OAS 포맷으로 RESTful API 문서를 작성 할 수 있습니다.
```javascript
/**
 * @swagger
 * /api/myresources/{resource_id}:
 *   put:
 *     description: update single resource
 *     tags: ['myresources']
 *     parameters:
 *     - name: resource_id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         format: ObjectId<Resource>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MyResourceSchema'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MyResourceRecord'
 */
routes.put('/:id', asyncHandler(async (req, res) => {
    let change = req.body;
    let result = await Resource.findByIdAndUpdate(req.params.id, change, {new: true});

    return res.json(result);
}));
```

## Guide, Document
[JSDoc - Tutorial Feature](https://jsdoc.app/about-tutorials.html)

JSDoc의 tutorial 기능을 이용하면 markdown 등으로 일반 문서도 작성 할 수 있습니다.  
이렇게 만들어진 문서들은 JSDoc 에서 바로 링크를 해서 참조 할 수도 있습니다.  
위의 예제에서는 guide 디렉토리 밑에 두개 파일이 있습니다.

###### guide/index.json
```json
{
  "introduce": {
    "title": "Guide for My Project"
  }
}
```

###### guide/introduce.md
```markdown
# Guide for My Project
...
## Installation
...
## How to use
...
```
