---

title: "actionhero로 API Gateway 구축하기"

author: noizbuster

date:   2016-05-17 00:00:00

category: development

tags: [web, micro service architecture, msa, actionhero]

---

## 서론

라이선스 문제 때문에 LoopBack이 거슬려서 찾아보니 Action Hero 라는걸 찾았다.  
[http://www.actionherojs.com/](http://www.actionherojs.com/)

일단 기본적으로 나에게 필요한 기능은 다 있는것처럼 보인다.

* Reusability
* Scalability(Clustering)
* RestfulAPI

얘는 독특하게 Web, WebSocket 뿐만 아니라 Socket 도 지원을 한다.

```
npm install actionhero
./node_modules/.bin/actionhero generate
npm install
npm start
```
이렇게 설치하고 초기화하고 시작할 수 있다.  
