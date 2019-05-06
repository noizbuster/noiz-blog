---

title: "python 프로젝트에 virtualenv 적용하고 사용하기"

author: noizbuster

date:   2016-05-24 00:00:00

category: development

tags: [python, virtualenv, package management]

---

## What is the virtualenv
프로젝트의 의존성 관리를 할 때 nodejs 의 경우 nasty dependency 라서 디렉토리 독립적으로 운용 가능하지만 파이선은 라이브러리가 시스템에 설치되기 때문에 디펜던시의 버전관리가 어려운 문제가 있으며 복수의 서로 다른 디펜던시를 가진 프로젝트를 운용하는데도 문제가 있다.
이를 해결하기 위한 방법으로 virtualenv 라는 파이선 패키지가 제공되고 있고 이를 사용하는 방법에 대해서 알아보겠다.

## Installation
sudo pip install virtualenv
sudo -H pip install virtualenv

## virtual environment 모드로 변경
`virtualenv dependency`: virtual enviroment 생성, dependency 디렉토리가 생김
`.dependency/activate`:



## Reference
* http://pythoninreal.blogspot.kr/2013/12/virtualenv.html
