---

title:  "똑똑하게 서버사이드 폴링 하기"

author: noizbuster

date: 2016-04-04 10:54:00

category: development

tags: [web, polling, comet, logpolling]

---

## Comet과 LongPolling

웹에서 데이터를 폴링하기 위한 개념으로 comet 이라는 모델이 제시되어있다.  
이것을 구현하는 방법중 하나가 롱 폴링이다.  

> comet 에 대한 설명   https://en.wikipedia.org/wiki/Comet_(programming)  
한글로 된 간략한 설명  
http://egloos.zum.com/genes1s/v/2699984

요약하자면 단발성으로 http request 를 하는것이 아니라 connection을 물고 있다가  
이벤트가 발생하면 응답하여 반응성을 높이는것이다.  
__pro__ : 응답성이 빠르다  
__con__ : 커넥션을 쥐고 있어야 하기 때문에 자원이 많이 든다.  
폴링주기가 제법 길다 --> 그냥 주기적으로 http request  
폴링주기가 아주 짧다 --> comet, longpolling 사용

## RestHook
>http://resthooks.org/

폴링을 webhook 처럼 해라 라고 함.  
파이선 코드는 그렇다고 치는데 nodeJS 코드는 sails 베이스로 되어있어서 바로 가져다가 쓰기 어렵다  
심지어 npm 패키지가 있는것도 아니라서..
