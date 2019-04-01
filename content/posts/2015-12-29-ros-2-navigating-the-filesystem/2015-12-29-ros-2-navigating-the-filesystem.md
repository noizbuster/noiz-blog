---

title:  "ROS Study 002. Navigating The Filesystem"

author: noizbuster

date:   2015-12-29 00:06:00

categories: development

tags: [robot, ros]

---

**튜토리얼을 위해서 튜토리얼 패키지 설치**
```bash
sudo apt-get install ros-<distro>-ros-tutorials
```

**ROS의 파일 시스템 컨셉**

ROS의 파일 시스템 컨셉은 **Package**와 **Manifest**로 이루어져있다.

* **Package**는 로스코드의 소프트웨어 구성 단위이고 각각의 패키지는 라이브러리, 실행파일, 스크립트 혹은 다른 아티팩트들을 포함할 수 있다.
* **Manifest**는 패키지의 다른 패키지와의 의존성, 버전, 관리자, 라이선스 등을 포함하는 메타데이터를 제공하는 패키지에 대한 설명이다.

**실습**

ROS의 패키지를 관리하고 탐색하는데 사용되는 명령어들
* ros**pack** : ROS의 패키지관리 툴
* ros**cd** : ROS의 Package 경로로 이동
* ros**ls** : ROS의 Package 경로 내부의 파일을 확인
```cpp
#ROS 의 roscpp패키지의 위치를 찾는다.
rospack find roscpp
--> YOUR_INSTALL_PATH/share/roscpp
#해당 Package 가 설치된 경로로 Change Directory
#Tab Completion 을 지원한다.
roscd roscpp
pwd
--> YOUR_INSTALL_PATH/share/roscpp
#내부의 경로로 이동
roscd roscpp/cmake
pwd
--> YOUR_INSTALL_PATH/share/roscpp/cmake
#패키지 내부 파일들을 확인
rosls roscpp_tutorials
-->cmake launch package.xml  srv
```
