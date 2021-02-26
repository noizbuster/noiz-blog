---
title: "Github Package 에서 Docker 이미지 사용하기"
date: 2021-02-21 13:34:25
tags:
- docker
categories:
- development
- devops
---

# Github Package

깃허브는 사용자가 private 하게 사용 할 수 있는 아티펙트 스토어 서비스를 제공하고있다.

2021년 2월 현재 지원하는 패키지 종류는 다음과 같다

* Docker
* Apache Maven (java)
* NuGet (.NET)
* RubyGems (Ruby)
* npm (Node.js)
* Containers `beta` - 좀 더 향상된 엑세스 컨트롤 기능?

## 내 관심사는 Docker

당장은 Docker 이미지를 어딘가에 올려두고 쓰고 싶은데, 유로 서비스를 쓰기엔 돈 아깝고, 그렇다고 NAS 를 구축하자니 귀찮기도 하고 안정성 확보도 문제다.

그러던 와중에 Github 에서 이런 기능을 제공하고 있던게 기억나서 이참에 한번 써보려고 한다.

## Docker login
docker login https://ghcr.io/upsidedownio

