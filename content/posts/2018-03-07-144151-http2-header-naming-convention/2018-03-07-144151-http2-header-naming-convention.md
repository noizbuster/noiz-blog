
---

title:  http2-header-naming-convention

author: noizbuster

date:   2018-03-07 14:41:51

categories: development

tags: [http, web, protocol]

---

# HTTP/2 Header Naming Convention

server 코딩을 하는중에 header 를 다 lower case 로 자동변환 시켜주는짓을 API 게이트웨이 서버 미들웨어가 하는것을 발견했다.  
뭔가 이유가 있을것 같아 검색을 해보니 HTTP/2 스펙에서 header 이름을 lowerCase로 변환해줘야한다(MUST) 라고 표현하고 있다는걸 알게 되었다.  
HTTP/2 의 사용처가 점점 많아질것이니까 지금부터 미리미리 대비를 해야겠다.  
다른 서비스에서도 lowerCase로 변경해서 내부적으로 처리하도록 하던가 헬퍼 미들웨어를 만들던가 해야지

# References
* [발견한 stackoverflow 스레드](https://stackoverflow.com/questions/5258977/are-http-headers-case-sensitive)
* [Secrion 8.1.2 of rfc7540](https://tools.ietf.org/html/rfc7540)
