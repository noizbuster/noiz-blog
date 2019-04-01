
---

title:  another-webapp-in-angulario

author: noizbuster

date:   2018-03-07 14:49:06

categories: development

tags: []

---
# Goal

일을 하면서, 혹은 내 서브 프로젝트를 하면서 만들게 될 헤테로지니어스한 웹앱들을 한군데서 서비스(적어도네비게이팅) 을 하고 싶었다.  
지금 당장 제일 손에 익은 툴이 angular.io (angular2 > ) 이기 때문에 이것으로 Navbar 를 비롯탄 일종의 플랫폼? 을 만들고 개별적으로 떠있는 웹 서비스들을 이 안에서 보여주는것을 목표로 잡았다.

# ~~Using Angular Router?~~

원래 내가 하고 싶었던것은 angular route 가 제어하는 route-outlet 에다가 다른 웹앱을 뿌리는것이었다. 헌데 검색을 해보니 그리 만만치 않다는것을 알게 되었다. 적어도 이렇게 하려면 angular.io app 으로 만든다음 bootstrap 을 해서 써야 하는데 정상적으로 목표로 하는 방법이 아닌데다가 angular 로 만든앱이 아니거나 버전이 다른것으로 만든것이 돌아가지 않는다는 단점이 있다. 아무래도 범용성이 떨어지니 처음에 조건으로 달았던 `이종간 통합` 이 물건너 갔으니 이 방법은 패스.

__References__  

* [https://www.linkedin.com/pulse/inception-one-angularjs-application-inside-another-m%C3%A1rquez-soto/](https://www.linkedin.com/pulse/inception-one-angularjs-application-inside-another-m%C3%A1rquez-soto/)
* [https://stackoverflow.com/questions/18184617/angularjs-how-to-nest-applications-within-an-angular-app](https://stackoverflow.com/questions/18184617/angularjs-how-to-nest-applications-within-an-angular-app)
* [https://www.linkedin.com/pulse/inception-one-angularjs-application-inside-another-m%C3%A1rquez-soto/](https://www.linkedin.com/pulse/inception-one-angularjs-application-inside-another-m%C3%A1rquez-soto/)
* [https://stackoverflow.com/questions/18571301/angularjs-multiple-ng-app-within-a-page?lipi=urn%3Ali%3Apage%3Ad_flagship3_pulse_read%3BH9CfNWXKST%2BpQndZMjYiOA%3D%3D](https://stackoverflow.com/questions/18571301/angularjs-multiple-ng-app-within-a-page?lipi=urn%3Ali%3Apage%3Ad_flagship3_pulse_read%3BH9CfNWXKST%2BpQndZMjYiOA%3D%3D)

# ~~HttpClient + innerHtml?~~

다른 방법을 조사를 해보니 iframe 으로 구현하는 방법과 http client 에서 데이터를 얻은다음 이걸 innerHtml 로 뿌리는 방법이 있었다. 일단 innerHtml 을 사용하는 방법은 패스, 스타일을 못불러온다거나 리액티브한 기능들이 제대로 동작할리가 없다고 생각했고 대체적으로 잘 동작한다한들 일부 문제가 생기는걸 고칠 방법이 없다. 이것도 패스.

# Using iframe

결국 iframe 으로 구현하는 방법만 남았는데 처음부터 알고는 있었지만 의도적으로 피하려고 했던데에는 이유가 있다.

### Weak Security
일단 보안차원에서 취약해진다는 문제가 있다. CORS적용하고 별 고생을 해도 생각치 못한곳에서 XSS가 나를 반겨주겠지만, 이게 아니면 현재로선 별 도리가 없다.

### Hostname Issue
서비스를 할때 baseHref 같은건 의도적으로 세팅을 하는것이기 때문에 클라이언트가 태생부터 알 수 있다. 하지만 hostname 은 별개 문제이다. iframe 에 웹앱을 뿌리려면 url을 가지고 던져야 하는데 hostname은 환경마다 다를 수 있다. 플랫폼앱의 url 을 같이 쓰면 된다라고 생각하면 편할것 같지만 앞으로의 서비스 구성이 어떻게 될지 모르기에 그렇게 하고싶지는 않다. 더군다나 public domain 이 아니라 onpremise 로 설치된 경우에는 접속하는 위치에 따라서 hostname 이 달라지기 때문에 빌드타임에 박거나 하드코딩을 할 수 없다.

### Service Discovery
전술한 hostname issue 를 해결하기 위해서는 결국 서버의 도움이 필요하다.  
서비스를 추가하거나 상태에 따라 서비스 노출을 제어하고 싶으면 게이트웨이에 하드코딩 하는것보다 서비스 디스커버리를 구현해서 API로 정보를 클라이언트에게 던져주는게 좋을것이다.

__References__  
* [https://stackoverflow.com/questions/38862007/loading-external-url-in-angular2-router-outlet](https://stackoverflow.com/questions/38862007/loading-external-url-in-angular2-router-outlet)
