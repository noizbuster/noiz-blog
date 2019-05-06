---

title:  Python Flask 로 RestfulAPI 서버 만들기

author: noizbuster

date:   2016-05-09 00:00:00

categories: development

tags: [web, python flask]

---

## 목표
목표는 RestfulAPI 서버를 만드는것이다.  
요구조건은, WebSocket 을 구현해야 할 수도 있다는 점이고.  
단발성의 API콜이 비주기적으로 많이 들어올수 있다는것.  
되도록이면 Response Time 은 짧은것이 좋다는것.  
Redis 를 캐시로 써서 리턴한다는점이다.

## 시작
난 잘 만들어진 보일러플레이트로 시작을 하는것이 좋겠다.  
https://github.com/vovantics/flask-bluebone

문서화가 잘 되어있고 authentication 도 구현되어있다.  
메인테이너가 한명이고 이슈란에 아무것도 없다는게 마음에 좀 걸리는데 리드미에 이렇게 구현한 이유에 대해서 나름대로 설명을 달아놨기 때문에 공부하기에는 좋아보인다.  
이메일이라던지 스테틱파일 서브와 같은 이번 목적이랑 상관없는것들도 포함되어있는데 걷어내면 되니까 일단은 신경쓰지 않는다.

fabric 이라는걸로 deploy 하는것으로 보이는데

## Reference
* https://github.com/vovantics/flask-bluebone
* https://github.com/flask-restful/flask-restful/
