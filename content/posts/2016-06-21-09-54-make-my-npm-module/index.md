---

title: "make my npm module"

author: noizbuster

date:   2016-06-21 09:54:00

category: development

tags: [npm, node, nodejs]

---

기존에 도커 data volume 의 default configuration을 file에 저장하는 용도로 사용했던 코드 조각이 있었는데 이게 여기저기서 사용이 되기 시작해서 유지보수 비용이 증가하게 되었고 때문에 모듈화를 해야겠다고 생각이 되었다.  
사실 configuration을 도와주는 라이브러리는 있지만 사용상 추구하는 바가 다소 다르기 때문에 커스터마이징을 안할수 없는 상황이어서 (조회가 안되면 디폴트값을 다시 조회하여 error tolerant 를 확보하는 등...) 그냥 새로운 모듈을 만들어서 관리하기 하였다.

어떻게 node module 을 만드는것이 가장 이쁜 방법인지 잘 모르기 때문에 유명한 라이브러리의 소스코드나 세팅 구조를 참고하기로 하였다.  

* https://darrenderidder.github.io/talks/ModulePatterns/#/
* https://www.npmjs.com/package/request

라이브러리를 만들고 나서
```
npm adduser
```
로 npmjs.com에서 가입한 계정으로 로그인을 하고
```
npm publish
```
하면 package.js 안에 있는 정보대로 퍼블리싱이 된다.
나의경우 완료됨과 거의 동시에 잘 올라가고 `npm install` 로 설치도 잘 되었다.
