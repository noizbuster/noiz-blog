---
title: "Cannot Use Fcitx in Jetbrains IDE"
date: 2020-01-21 05:08:37
tags:
- webstorm
- intellij
- jetbrains
- idea
- fcitx
categories:
- development
---


# Ubuntu 에서 IDEA 에서 Fcitx 가 사용 불가능한 문제 해결

WebStorm, Intellij, PyCharm 등 IDEA Jetbrains 의 IDE 가 업데이트 되면서 Fcitx 를 사용 할 수 없는 문제가 있다.

아마도 IDEA가 자신을 실행하기위해 가지고 있는 jdk 가 11버전을 하는데 이것이 바뀌면서 input method 를 자동으로 disable 시키는것으로 보인다. 그래서 IDEA 클라이언트를 돌리는 JVM에 해당기능을 비활성화 해주는 옵션을 주는게 해결 하기위한 아이디어다.

## 문제 재현 환경

* Ubuntu 18.04
* Jetbrains IDEA 2019.3.1
    * WebStorm, Intellij, PyCharm 등 모두 문제 발생
* fcitx 4.2.9.6


## 해결방법

IDE 가 설치되어있는 디렉토리내에서 `*.vmoptions` 확장자의 파일을 찾는다.  
나의 경우 `~/Applications/JetBrains/apps/WebStorm/ch-0/193.5662.54.vmoptions` 이다.

파일을 열어 다음한줄을 마지막에 추가해서 저장한다.
`-Dauto.disable.input.methods=false`

그러면 아래와 같은 모습이 된다.

```
-Xms128m
-Xmx2048m
-XX:ReservedCodeCacheSize=240m

...

-Dsun.java2d.renderer=sun.java2d.marlin.MarlinRenderingEngine
-Dsun.tools.attach.tmp.only=true
-Dide.no.platform.update=true
-Dauto.disable.input.methods=false
```

설정 파일을 저장하고 닫은다음 IDEA 를 다시 시작하면 정상적으로 fcitx 로 입력이 가능한것을 확인 할 수 있었다.
