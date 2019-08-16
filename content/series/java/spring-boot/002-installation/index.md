---
title: "Spring Boot 002 - Installation"
weight: 2
date: 2019-08-10 10:12:30
tags:
- java
- spring
- spring boot
categories:
- java
- development
---

# 목표

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/) 가이드를 참고해서 Spring Boot 개발환경을 구축합니다.

# SDK 설치

가이드에 따르면 필요한 준비물은 다음과 같습니다

> * About 15 minutes
> * A favorite text editor or IDE
> * JDK 1.8 or later
> * Gradle 4+ or Maven 3.2+
> * You can also import the code straight into your IDE:
>   * Spring Tool Suite (STS)
>   * IntelliJ IDEA

## JDK, Gradle 설치

이전에 작성했던 포스트([Install Java with Version Manager](/ko/posts/2019-08-10-064434-install-java-with-version-manager/))에서 JDK 를 설치하는것을 해보았습니다.

SDKMan 이 Gradle 의 설치도 지원하니까 같은 방법으로 설치를 진행합니다.

1. SDKMan 설치: [Install Java with Version Manager](/ko/posts/2019-08-10-064434-install-java-with-version-manager/) 참고
2. JDK 설치: `sdk install java 9.0.4-open`
3. 설치 가능한 Gradle 버전 확인 `sdk list gradle`
   * 5.5.1 버전이 가장 최신의 stable빌드 인거 같네요 이것으로 설치해야겠습니다
4. gradle 설치 : `sdk install gradle 5.5.1`

설치된 SDK 들을 확인해봅니다.
```bash
> java --version
openjdk 9.0.4
OpenJDK Runtime Environment (build 9.0.4+11)
OpenJDK 64-Bit Server VM (build 9.0.4+11, mixed mode)

> gradle --version
------------------------------------------------------------
Gradle 5.5.1
------------------------------------------------------------
Build time:   2019-07-10 20:38:12 UTC
Revision:     3245f748c7061472da4dc184991919810f7935a5

Kotlin:       1.3.31
Groovy:       2.5.4
Ant:          Apache Ant(TM) version 1.9.14 compiled on March 12 2019
JVM:          9.0.4 (Oracle Corporation 9.0.4+11)
OS:           Linux 4.19.16-041916-lowlatency amd64
```

# References
* https://spring.io/guides/gs/rest-service/
