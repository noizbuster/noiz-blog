---
title:  cron-on-nodejs
author: noizbuster
date:   2018-03-30 18:01:44
categories: development
tags: []
---

# `cron` 이 무엇이고 어떻게 사용해야 하나?
https://en.wikipedia.org/wiki/Cron
https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm

# 유용한 WebTool들

호출이 되는시점을 확인 할때: http://cron.schlitt.info/
Cron 표현식의 유효성 검사 https://crontab.guru/

# NodeJS 프로젝트에서 내가 선택한 패키지

#### Cron 표현식 파싱, 다음 실행시점 계산
https://github.com/harrisiirak/cron-parser

#### 긴 기간동안 실행되어야 하는 timeout 을 위한 패키지
https://github.com/tellnes/long-timeout
