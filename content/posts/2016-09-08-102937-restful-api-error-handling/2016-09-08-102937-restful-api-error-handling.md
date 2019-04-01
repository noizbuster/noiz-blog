---

title: "Handling RESTful API Errors"

author: noizbuster

date:   2016-09-08 10:29:37

category: development

tags: [restful, api, rest]

---

# 서론
RESTful API를 설계하는데 몇가지 고민거리가 생겼다.  
Authentication, Clustering, 같은건 구현상의 문제와는 별도로 System 내에서 사용되는 공통 스키마가 있어야 될것 같다.  
지금 당장 필요하거나 상상되는것은

* Global Schema
    * Transaction ID
        * gtxid : Global Transaction ID
        * ltxid : Local Transaction ID
* Handling Errors
* Handling Deprecations


# Survey

* [http://apigee.com/about/blog/technology/restful-api-design-what-about-errors](http://apigee.com/about/blog/technology/restful-api-design-what-about-errors) 몇가지 비교 해놨음
* [https://developers.google.com/drive/v3/web/handle-errors](https://developers.google.com/drive/v3/web/handle-errors) 구글은 이렇게 함.
    * [http://blog.restcase.com/rest-api-error-codes-101/](http://blog.restcase.com/rest-api-error-codes-101/)
* [http://www.codingpedia.org/ama/error-handling-in-rest-api-with-jersey/](http://www.codingpedia.org/ama/error-handling-in-rest-api-with-jersey/)
* [http://stackoverflow.com/questions/942951/rest-api-error-return-good-practices](http://stackoverflow.com/questions/942951/rest-api-error-return-good-practices) 구체적인 로직 다이어그램

# Schema Design & Convention
## Common Schema

* (optional) error
    * msg
    * (optional) code
    * (optional) link
* (optional) deprecated
    * msg
    * (optional) details
* _metadata
    * gtxid
    * ltxid
    * (optional) msg
* (response data)

## Common Convention

### Do & Don't
* Avoid using plain text response (use JSON or XML)

# Action Plan
Request

* Automation adding gtxid, ltxid, operation msg
* Selective exposure of stack trace or error log by build option

Response

* Detecting error field
* Detecting deprecate field

Boilerplatize

* Authentication
    * JWT
* Clustering
    * Process management, Load balance
* Configuration
    * default.js, docker data volume
* Docker Deployment
    * Docker Scripts
* API versioning
    * provide both url, accept-header way
* Logging
    * using winston or etc. then
        * Filebeat
        * rsyslog
        * file
* Documentation
    * generate swagger yaml
    * JS doc
* change log generator
    * ?
