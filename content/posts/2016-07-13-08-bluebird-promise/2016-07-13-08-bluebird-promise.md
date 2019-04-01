---

title: "Javascript Promise"

author: noizbuster

date:   2016-07-13 08:00:00

category: development

tags: [javascript, promise]

---

## 문제
Statistics API를 구현하던 도중 여러개의 RESTful API request 들을 하나로 aggregation 해서 리턴을 할 일이 생겼다.

## 기술선택
깔끔하게 구현할 수 있는 방법이 없을까 고민하던중에 promise 가 제공하는 .all 기능이 적합하다고 생각했고, Javascript에서 promise 제공 라이브러리가 여러가지 있다고 정도로만 알고 있었기에 본격적으로 서베이를 시작했다.

관심사는 유명한 q, promise A+, bluebird 세가지였다.

빌트인 구현은 브라우저에서 uncaught error를 silent 처리 해버리기 때문에 디버깅이 어렵다고 하여 제외하기로 하였다. (라이브러리를 사용해도 스펙 자체는 표준에 가깝기 때문에 대부분의 구현들이 compatible 하다.)

여러 의견들을 찾아보았고,  
https://www.reddit.com/r/javascript/comments/35l3z4/best_promise_library_q_vs_bluebird_vs_jquerys/ 의 맥락으로 보았을때

bluebird 가 적합하다고 판단했다.

## 구현
하나하나의 promise는 이렇게 생겼고  
http://code.runnable.com/VZozd4IsKAt1U9ua/promises-with-bluebird-for-node-js-request-callback-and-dual-api

이것들의 배열을 promise all 로 구현한다.  
http://bluebirdjs.com/docs/api/promise.all.html

request.js 에서 사용하는 options 생성을
