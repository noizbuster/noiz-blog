---

title:  "react-vs-angular2"

author: noizbuster

date:   2016-01-18 00:00:00

category: development

tags: [web, angular2, react]

---

#MEAN VS MERN
###AngularJS 2.0 VS ReactJS

###Contents
- [AngularJS 2.0](#angular)
- [React](#react)
- [Conclusion](#conclusion)
- [Workload Estimate](#estimation)
- [Links](#links)

---

**AngularJS 1.3 는 논외로 하기로 함**  
http://netil.github.io/slides/angularjs/index3.html#/
- 앞으로 메인테넌스를 2년 미만만 지원됨.
- AngularJS 2.0으로의 마이그레이션 방법 없음
- React 보다 7배정도 느림 --> **2.0 에서 개선**
- 소스코드의 재활용이 react에 비해서 떨어진다. --> **2.0 에서 개선**
- watcher가 많아지면 퍼포먼스 하락  

|angular2.0|VS|react|
|:---:|:---:|:---:|
|two way|data binding|one way|
|ES6 완벽지원|JS|ES6일부지원|

---

###<a name="angular"></a>AngularJS 2.0
**장점**  
- 2way data binding 덕분에 서버사이드에서 수시로 바뀌는 값을 구현하기 편함  
- 2.0부터는 렌더링,리랜더링 도 react 보다 더 빠르다. [성능비교]  
- typeScript을 기본으로 지원 : JS가 타입이 없어서 생기는 디버깅 문제점 완화  

**단점**  
- watcher가 많아지면 퍼포먼스 하락(2.0 에서 대폭 개선)  
- 1.x 버전과 호환이 안됨.  
- 아직 베타 버전

---

###<a name="react"></a>ReactJS
**장점**  
- 렌더링이 빠름  
- virtual dom 을 사용하여 rerendering 이 효율적임 (even with angular 2.0)  
- JSX는 비엔지니어가 배우기에 직관적이다.

**단점**  
- Flux 아키텍쳐의 진입장벽이 비교적 높음(Flux, JSX)  
- 다른 프레임워크와 조합하지 않으면 사용 할 수 없다.  
- View에만 사용 할 수 있음. (단독으로 사용 불가)

---

###<a name="conclusion"></a>Conclusion
**Angular 2.0 Win**  
angular 1.x 버전대가 ReactJS 에 비해 불리하던면이 대부분 개선되어 비슷하거나 오히려 좋아짐.  
서버사이드에서 자주 바뀌는 값을 브라우저에 동기화 할때 코드작성이 훨씬 쉬움, DashBoard 와 같은 기능에 적합하다고 판단  
Flux 아키텍쳐나 JSX 에 대해 추가로 배울 필요가 없음. (JSX는 mandatory가 아니지만 코드를 읽을줄은 알아야함)  
Spring 덕인지 아직은 국내에 MVC패턴에 익숙한 개발자가 Flux에 익숙한 개발자보다 많음  

---

###<a name="estimation"></a>Workload Estimate
**업무**  
- MEAN Stack 구축 : 0.25MM  
- SPA(Single Page Application) 구현 : 0.25 ~ 0.5MM  

**투입인원**
- 양원우 : 0.75 ~ 1 MM

**예상소요기간**
- 최단 0.5 Month
- 최장 1.0 Month

---

###<a name="links"></a>Links
**Angular2.0**  

**React**  
- [React를 이해하다](http://blog.coderifleman.com/post/122232296024/reactjs%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8B%A41)  
- [Flux로의 카툰 안내서](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/)

**ES6**
- [ES6 Features](http://es6-features.org)
- [ES6시대의 JavaScript](https://gist.github.com/marocchino/841e2ff62f59f420f9d9)

<!--Reference-->
[성능비교]: http://info.meteor.com/blog/comparing-performance-of-blaze-react-angular-meteor-and-angular-2-with-meteor
[savioke(서비스로봇업체)]: http://www.savioke.com/
[Celery Python(job queue)]: http://www.celeryproject.org/

서비스 구축  
https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application  
https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
