
---

title:  redemption-monitor-design

author: noizbuster

date:   2016-11-27 17:48:31

categories: development

tags: [redemption]

---

# Introduction
게임 서버를 만들었지만 개발자 혹은 운영자가 게임 서버나 내부의 상황을 보기 위해서 매번 REST client 를 이용하는것은 비현실적으로 불편하다.  
때문에 서버 내부의 정보를 시각적으로 혹은, 미리짜여진 규격에 맞추어 관제 할 수 있는 방법이 필요했다.  
그 수단으로 여러가지가 있겠지만 웹앱으로 만드는것이 제일 범용적이고 편할것이라고 판단하였다.

# Design

## Features

* 기본적인 서버 상태 확인 (service discovery 와 연동)
* 게임서버내 맵 상황, 각종 통계 제공

## Conditions
개발을 위한 개발을 피하기 위해 몇가지 조건이 수반된다.

* 의존성은 최대한 없앤다.
* 크루즈 컨트롤을 제외한 API는 가능한 gateway 에서 가져다 쓴다.
* Simple, Simple and Simple
* 이 앱은 개발&운영 내부자가 사용하고 일반 End-User 에게는 제공되지 않을것이기 때문에 localhost 에서 동작함을 가정한다.

# Stacks & Components
* angular2
    * mdl
    * gulp
* express js
* node js
