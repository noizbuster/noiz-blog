---
title: "Express in Practice 003 - 미들웨어"
weight: 3
date: 2019-08-26T15:16:27.324Z
tags:
- nodejs
- express
categories:
- nodejs
---

# 미들웨어 추가하기
널리 사용되는 두가지 미들웨어들을 우리 프로젝트에 추가해보겠습니다.  
이 포스트에서 다루는 미들웨어 패키지 이외에도 필요에 따라 자유롭게 원하는 패키지들을 추가해서 사용하면 됩니다.

## body-parser
[npm: body-parser](https://www.npmjs.com/package/body-parser)

HTTP body 를 원하는 형태로 파싱해주는 미들웨어 입니다.  
저의 경우 json 으로 파싱을 하는것을 기본으로 두고 사용합니다.

자세한 내용은 해당 패키지 문서를 참고하세요.

### 사용예시
``` javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
```

## cors
[npm: cors](https://www.npmjs.com/package/cors)
[CORS](https://www.w3.org/Security/wiki/CORS) 는 cross origin resource sharing 의 약자입니다.

자바스크립트 엔진 표준 스팩에 동일 출처 정책 ([same-origin policy](https://www.w3.org/Security/wiki/Same_Origin_Policy)) 라는 보안규칙이 있습니다.

이런경우 필요에 따라 그 제약을 해제해야 하는 경우가 있는데 CORS 세팅으로 이를 우회 시킬 수 있습니다.


### 사용예시
``` javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
```

## 이밖에...
많이 사용되는 express 미들웨어들을 아는대로 적어보았습니다.  
같은 용도로 사용되는 미들웨어들은 사용되는 스타일이나 결과물이 조금씩 다르니 살펴보시고 취향대로 선택해서 쓰시면 됩니다.  
더 많은 패키지들은 나중에 `package tour` 시리즈에서 다루도록 하겠습니다.

### multipart
multi part 바디를 다루기 위해서 다음 패키지들이 유용할 수 있습니다.  
대표적으로 파일을 업로드 받을때 유용하게 사용 될 수 있습니다.

* [npm: multer](https://www.npmjs.com/package/multer)
* [npm: busboy](https://www.npmjs.com/package/busboy)
* [npm: multiparty](https://www.npmjs.com/package/multiparty)
* [npm: formidable](https://www.npmjs.com/package/formidable)

### logging
나중에도 다루겠지만 다음과 같은 모듈들이 access log 를 생성하는데 도움이 됩니다.

* [npm: express-winston](https://www.npmjs.com/package/express-winston)
* [npm: morgan](https://www.npmjs.com/package/morgan)

### payload
트래픽을 압축해서 네트워크 비용을 줄여줄 수 있습니다.

* [npm: compression](https://www.npmjs.com/package/compression)

### error handling
에러를 유연하게 핸들링 해 주고 API 의 response 로 처리 할 수 있도록 도와줍니다.

* [npm: errorhandler](https://www.npmjs.com/package/errorhandler)
* [npm: express-api-error-handler](https://www.npmjs.com/package/express-api-error-handler)
* [npm: merror](https://www.npmjs.com/package/merror)

# Code
https://github.com/noizbuster/lecture-express-in-practice/tree/003-middlewares

# 다음순서
다음에는 configuration 파일을 만들고 실행 환경마다 다른 설정값을 읽을 수 있도록 해보도록 하겠습니다.
