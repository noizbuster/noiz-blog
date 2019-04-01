---

title: Python WebServer Survey for API Server

author: noizbuster

date:   2016-05-09 00:00:00

categories: development

tags: [python, web]

---

Restful API 서버를 구현해야 할 문제가 있다.

요구조건은 다음과 같다.

* Restful API가 구현 가능해야한다.
* WebSocket 구현이 용이해야 한다.
* Scalability 가 좋으면 더욱좋다.
* Response time 이 짧으면 좋다.
* Python 이면 좋다.

## Flask
사용자가 많아서 커뮤니티 서포트가 좋지만 ~~달려있는게 많기 때문에 상대적으로 아주 무겁고 response time이 상당히 길다는 문제가 있다.~~  __플랫폼을 meinheld 로 바꾸고 나서 많이 빨라졌다. plain text serve 의 경우 아예 퍼포먼스가 좀 느리가 느리다 nodejs 에 비해 7배정도 차이가 있음. 하지만 API server 의 경우에는 single query를 빠르게 반복하는일이 오히려 많기 경우에 plain text 는 신경쓰지 않아도 된다. content-type 을 text/plain 으로 주는행위만 하지 않으면 된다.__  
webSocket 을 구현하기 제일 편하다.

## Falcon
미니멀한 구현이기 때문에 제일 빠르게 구현 할 수 있다.  
스케일링도 문제없고 RestfulAPI을 구현하는데 필요한것은 다 포함되어있다.  
대신 webSocket 을 구현하려면 상당히 지저분해진다.

## Bottle
Flask 와 Falcon의 중간정도 성능과 편의성을 보인다. 커뮤니티가 그렇게 큰 것 같지는 않아보인다.

## Pyramid
Falcon 에 기능들이 좀 더 추가된 형태이고 성능은 2배정도 느리다  
하지만 Flask 에 비해 3배 빠르며 response time 문제가 없다.  
자잘한 기능들이 더 많긴 하지만 Falcon 에 있는 기능만으로도 충분 하기 때문에  
이 문제에 한해서는 이점을 갖는다고 보기 힘들다.  
마찬가지로 webSocket 을 구현하려면 상당히 지저분해진다.

## 공통사항
[Bottle 로 Websocket을 구현하는 방법에 대한 안내](http://stackoverflow.com/questions/10316374/bottle-websocket)가 있는데  
이게 wsgi에 웹소켓 기능을 로드해서 쓰는것으로 보인다. get 을 가져오는 Request 는 bottle 에서 나오는것이다.

아마 wsgi를 사용하는 다른 플랫폼에서도 webSocket을 쓸 수 있겠지만 난이도가 어떨지는 좀 알아봐야겠다.

## 결론
오래되고 안정되기는 Django의 손을 들어 줄 수도 있지만. flask도 커뮤니티가 아주 활발하며 안정화를 많이 거쳤기 때문에 근래에 와선 규모나 지원에 대해서는 별로 차이가 없어보인다.  
벤치마크에 따르면 성능은 Django보다 flask가 더 잘 나오고 코드스니펫도 많이 정리되어있다.  

다만 flask-pypy 처럼 사용하면 퍼포먼스가 상당히 떨어지고  
content-type 이 plain/text 인 경우도 피해야 한다.

확실히 속도는 Falcon, Bottle 이 더 유리한면도 있긴 하지만 커뮤니티 서포트나 생산성면에서 감수할 정도로 큰 차이는 아닌것으로 판단한다.

## Reference
* https://www.techempower.com/benchmarks/#section=data-r12&hw=peak&test=db&p=1lc-e8s-0
* http://stackoverflow.com/questions/10316374/bottle-websocket
