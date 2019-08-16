---
title: "Install Java With Version Manager"
date: 2019-08-10 06:44:34
tags:
- java
categories:
- java
---

# 왜 Version Manager 가 필요한가?

Ruby 의 RVM, Node.js 의 NVM 을 사용했을때 의 경험이 매우 좋았습니다.  
다른 버전의 실행환경에서 미리 테스트도 할 수 있었고 새 버전으로 넘어갈때 훌륭한 백업 플랜을 제공해주기도 했으니까요.  
무엇보다도 개발환경을 큰 시간을 들여서 매번 갈아엎을 필요가 없다는것이 가장 큰 매력이었습니다.

# 왜 이제와서?

제가 JAVA 를 주로 쓸적에는 (주로 Android 프로젝트를 많이 했습니다.) Windows 나 Linux 에 Oracle JDK 를 깔아서 기본 설정된 PATH를 중심으로 사용했었습니다. 이제와서 JAVA 프로젝트를 다시 해볼까 싶어서 보니 OpenJDK 로 넘어가려고 하는 분위기를 풍기는 사람도 있고, 최신버전을 미리 써보니 좋더라 라는 분들도 보였습니다. 그러면 JAVA 도 버전관리 해주는 좋은 툴이 있을까 싶어 찾아보게 되었습니다.

# SDKMan

> The Software Development Kit Manager

제가 원하던것과 가장 비슷한 툴은 [SDKMan](https://sdkman.io/) 이었습니다.  
설치 가능한 버전을 설치하고 환경변수를 바꾸는 기능도 제공을 해 주고 있습니다.  
Java 뿐만 아니라 JVM 을 사용하는 `groovy, scala, grails, gradle, kotlin` 등의 다양한 언어들의 설치와 환경관리도 지원합니다.  

## Installation

``` bash
> curl -s "https://get.sdkman.io" | bash
> source "$HOME/.sdkman/bin/sdkman-init.sh" 
```
위의 설치 스크립트가 zsh 나 bash 정도는 *rc 파일이나 .profile 파일을 업데이트 해 줍니다. 별도의 작업이 없었습니다.

## JDK 설치

``` bash
> sdk list java # 설치 가능한 JAVA 리스트를 보여줍니다

============================================================================
Available Java Versions
============================================================================
 Vendor        | Use | Version      | Dist    | Status     | Identifier
----------------------------------------------------------------------------
 AdoptOpenJDK  |     | 12.0.1.j9    | adpt    |            | 12.0.1.j9-adpt 
               |     | 12.0.1.hs    | adpt    |            | 12.0.1.hs-adpt 
               |     | 11.0.4.j9    | adpt    |            | 11.0.4.j9-adpt 
 .
 .
 .
 Java.net      |     | 14.ea.6      | open    |            | 14.ea.6-open   
               |     | 13.ea.30     | open    |            | 13.ea.30-open  
               |     | 12.0.2       | open    |            | 12.0.2-open    
               |     | 11.0.2       | open    |            | 11.0.2-open    
               |     | 10.0.2       | open    |            | 10.0.2-open    
               |     | 9.0.4        | open    |            | 9.0.4-open     
 SAP           |     | 12.0.2       | sapmchn |            | 12.0.2-sapmchn 
               |     | 11.0.4       | sapmchn |            | 11.0.4-sapmchn 
============================================================================
Use the Identifier for installation:

    $ sdk install java 11.0.3.hs-adpt
============================================================================
```

위와같이 밴더별로 사용 가능한 Java 버전들이 보입니다.  
저는 OpenJDK 9버전을 사용하고 싶으니 아래 안내처럼 설치명령어를 실행했습니다.

``` bash
> sdk install java 9.0.4-open

Downloading: java 9.0.4-open
In progress...
################################################################ 100.0%
Repackaging Java 9.0.4-open...
Done repackaging...
Installing: java 9.0.4-open
Done installing!

Setting java 9.0.4-open as default.
```

설치가 잘 되었는지 확인해봅니다.

``` bash
> java --version
openjdk 9.0.4
OpenJDK Runtime Environment (build 9.0.4+11)
OpenJDK 64-Bit Server VM (build 9.0.4+11, mixed mode)
```

## 다른 버전도 설치하고 교체 해보기

그럼 다른 버전도 똑같이 설치하고 스위치 해서 사용해보도록 하죠
이전과 마찬가지로 `sdk install java 12.0.2-open` 을 통해 12버전을 설치하고나서 다시 java 리스트를 보면

``` bash
> sdk list java

============================================================================
Available Java Versions
============================================================================
 Vendor        | Use | Version      | Dist    | Status     | Identifier
----------------------------------------------------------------------------
 AdoptOpenJDK  |     | 12.0.1.j9    | adpt    |            | 12.0.1.j9-adpt 
               |     | 12.0.1.hs    | adpt    |            | 12.0.1.hs-adpt 
.
.
.
 Java.net      |     | 14.ea.6      | open    |            | 14.ea.6-open   
               |     | 13.ea.30     | open    |            | 13.ea.30-open  
               |     | 12.0.2       | open    | installed  | 12.0.2-open    
               |     | 11.0.2       | open    |            | 11.0.2-open    
               |     | 10.0.2       | open    |            | 10.0.2-open    
               | >>> | 9.0.4        | open    | installed  | 9.0.4-open     
 SAP           |     | 12.0.2       | sapmchn |            | 12.0.2-sapmchn 
               |     | 11.0.4       | sapmchn |            | 11.0.4-sapmchn 
============================================================================
```
이처럼 `9.0.4-open` 버전이 사용중이라고 표시가 되어있습니다. 그리고 새로 설치한 `12.0.2-open` 이 installed 라고 보여집니다.
그럼 이제 12 버전을 사용하도록 바꿔보도록 합니다.

``` bash
> sdk use java 12.0.2-open
Using java version 12.0.2-open in this shell.

> java --version
openjdk 12.0.2 2019-07-16
OpenJDK Runtime Environment (build 12.0.2+10)
OpenJDK 64-Bit Server VM (build 12.0.2+10, mixed mode, sharing)

> which java
/home/noizbuster/.sdkman/candidates/java/12.0.2-open/bin/java
```
명령어 한번에 Environment 까지 모두 설정이 되는 모습을 볼 수 있습니다.

이제 다른 언어나 버전도 이와같은 방법으로 설치하고 필요에 따라 그때그때 바꿔서 사용 할 수 있습니다.

# References
* [SDKMan](https://sdkman.io/)
